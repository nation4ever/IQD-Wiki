"use client";
import { useState, useRef, useEffect, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import {
    saveProgress,
    loadProgress,
    clearProgress,
    saveStats,
    loadStats,
    type ProgressData,
} from "./storage";
import { playErrorSound } from "./audio";
import { cleanText, SAMPLE_TEXT } from "./clean-text";
import { useDebouncedCallback } from "./use-debounced-callback";

export interface TypingEngineState {
    // Text
    sourceText: string;
    activeText: string;
    typed: string;
    // Session flags
    isActive: boolean;
    isFinished: boolean;
    loaded: boolean;
    showPaste: boolean;
    // Stats
    elapsed: number;
    wpm: number;
    accuracy: number;
    errors: number;
    totalKeystrokes: number;
    // Persisted stats
    bestWpm: number;
    sessions: number;
    soundEnabled: boolean;
    // Sample loading
    sampleLoading: boolean;
    sampleError: string;
    sampleTitle: string;
    sampleFrom: string | null;
    // Whether the user has begun typing (first keystroke)
    hasStarted: boolean;
}

export interface TypingEngineActions {
    setSourceText: (v: string) => void;
    setSoundEnabled: (v: boolean | ((p: boolean) => boolean)) => void;
    onKey: (e: React.KeyboardEvent) => void;
    skipParagraph: () => void;
    reset: () => void;
    restart: () => void;
    handleStartPractice: () => void;
    typingRef: React.RefObject<HTMLInputElement | null>;
    displayRef: React.RefObject<HTMLDivElement | null>;
    fmt: (s: number) => string;
    pct: number;
}

export type TypingEngine = TypingEngineState & TypingEngineActions;

export function useTypingEngine(): TypingEngine {
    const searchParams = useSearchParams();
    const sampleFrom = searchParams.get("sample-from");

    const [sourceText, setSourceText] = useState("");
    const [activeText, setActiveText] = useState("");
    const [typed, setTyped] = useState("");
    const [isActive, setIsActive] = useState(false);
    const [elapsed, setElapsed] = useState(0);
    const [wpm, setWpm] = useState(0);
    const [accuracy, setAccuracy] = useState(100);
    const [errors, setErrors] = useState(0);
    const [totalKeystrokes, setTotalKeystrokes] = useState(0);
    const [isFinished, setIsFinished] = useState(false);
    const [showPaste, setShowPaste] = useState(true);
    const [soundEnabled, setSoundEnabled] = useState(true);
    const [bestWpm, setBestWpm] = useState(0);
    const [sessions, setSessions] = useState(0);
    const [loaded, setLoaded] = useState(false);
    const [sampleLoading, setSampleLoading] = useState(false);
    const [sampleError, setSampleError] = useState("");
    const [sampleTitle, setSampleTitle] = useState("");
    const [hasStarted, setHasStarted] = useState(false);

    const typingRef = useRef<HTMLInputElement | null>(null);
    const displayRef = useRef<HTMLDivElement | null>(null);
    const startRef = useRef<number | null>(null);
    const correctCharsRef = useRef(0);

    // --- Load on mount ---
    useEffect(() => {
        (async () => {
            const stats = await loadStats();
            if (stats) {
                setBestWpm(stats.bestWpm || 0);
                setSessions(stats.sessions || 0);
                if (stats.soundEnabled !== undefined) setSoundEnabled(stats.soundEnabled);
            }
            const prog = await loadProgress();
            if (prog && prog.activeText && prog.typed !== undefined && !prog.isFinished) {
                setActiveText(prog.activeText);
                setSourceText(prog.sourceText || prog.activeText);
                setTyped(prog.typed);
                setErrors(prog.errors || 0);
                setTotalKeystrokes(prog.totalKeystrokes || 0);
                let cc = 0;
                for (let i = 0; i < prog.typed.length; i++) {
                    if (prog.typed[i] === prog.activeText[i]) cc++;
                }
                correctCharsRef.current = cc;
                const t = prog.totalKeystrokes || 0;
                const e = prog.errors || 0;
                setAccuracy(t > 0 ? Math.round(((t - e) / t) * 100) : 100);
                setIsActive(true);
                setShowPaste(false);
                setTimeout(() => typingRef.current?.focus(), 100);
            }
            setLoaded(true);
        })();
    }, []);

    // --- Load sample from slug ---
    useEffect(() => {
        if (!sampleFrom || !loaded) return;
        (async () => {
            setSampleLoading(true);
            setSampleError("");
            try {
                const res = await fetch(`/api/raw/${encodeURIComponent(sampleFrom)}`);
                if (!res.ok) {
                    setSampleError(`Could not find content "${sampleFrom}"`);
                    setSampleLoading(false);
                    return;
                }
                const raw = await res.text();
                const plain = cleanText(raw);
                if (!plain) {
                    setSampleError("Content is empty after processing");
                    setSampleLoading(false);
                    return;
                }
                setSampleTitle(sampleFrom.replace(/-/g, " "));
                setSourceText(plain);
                setActiveText(plain);
                setTyped("");
                setIsActive(true);
                startRef.current = null;
                setHasStarted(false);
                correctCharsRef.current = 0;
                setElapsed(0);
                setWpm(0);
                setAccuracy(100);
                setErrors(0);
                setTotalKeystrokes(0);
                setIsFinished(false);
                setShowPaste(false);
                setTimeout(() => typingRef.current?.focus(), 100);
            } catch (_) {
                setSampleError("Failed to load content");
            }
            setSampleLoading(false);
        })();
    }, [sampleFrom, loaded]);

    // --- Debounced persistence ---
    const debouncedSaveProgress = useDebouncedCallback((data: ProgressData) => {
        saveProgress(data);
    }, 1000);

    useEffect(() => {
        if (!loaded) return;
        if (isActive && activeText) {
            debouncedSaveProgress({
                activeText,
                sourceText,
                typed,
                errors,
                totalKeystrokes,
                isFinished,
            });
        }
    }, [typed, errors, totalKeystrokes, isFinished, loaded]);

    const debouncedSaveStats = useDebouncedCallback(
        (data: { bestWpm: number; sessions: number; soundEnabled: boolean }) => {
            saveStats(data);
        },
        500,
    );

    useEffect(() => {
        if (!loaded) return;
        debouncedSaveStats({ bestWpm, sessions, soundEnabled });
    }, [bestWpm, sessions, soundEnabled, loaded]);

    // --- Timer (WPM calculation) ---
    // Refs to avoid stale closures in the interval
    const isFinishedRef = useRef(isFinished);
    isFinishedRef.current = isFinished;

    useEffect(() => {
        // Only start the timer once the user has typed the first character
        if (!hasStarted || isFinished) return;

        const iv = setInterval(() => {
            if (!startRef.current || isFinishedRef.current) return;
            const now = Date.now();
            const mins = (now - startRef.current) / 60000;
            setElapsed(Math.floor((now - startRef.current) / 1000));
            if (mins > 0) {
                setWpm(Math.round(correctCharsRef.current / 5 / mins));
            }
        }, 1000);

        return () => clearInterval(iv);
    }, [hasStarted, isFinished]);

    // --- Auto-scroll: keep cursor centered ---
    useEffect(() => {
        if (!displayRef.current) return;
        const el = displayRef.current.querySelector("[data-cursor]");
        if (!el) return;
        const container = displayRef.current;
        const containerRect = container.getBoundingClientRect();
        const cursorRect = (el as HTMLElement).getBoundingClientRect();
        const targetY = containerRect.height * 0.5;
        const cursorRelativeTop = cursorRect.top - containerRect.top;
        const scrollDelta = cursorRelativeTop - targetY;

        container.scrollTo({
            top: container.scrollTop + scrollDelta,
            behavior: "smooth",
        });
    }, [typed]);

    // --- Actions ---
    const reset = useCallback(() => {
        setTyped("");
        setIsActive(false);
        startRef.current = null;
        setHasStarted(false);
        correctCharsRef.current = 0;
        setElapsed(0);
        setWpm(0);
        setAccuracy(100);
        setErrors(0);
        setTotalKeystrokes(0);
        setIsFinished(false);
        setShowPaste(true);
        setActiveText("");
        setSampleTitle("");
        clearProgress();
    }, []);

    const restart = useCallback(() => {
        setTyped("");
        startRef.current = null;
        setHasStarted(false);
        correctCharsRef.current = 0;
        setElapsed(0);
        setWpm(0);
        setAccuracy(100);
        setErrors(0);
        setTotalKeystrokes(0);
        setIsFinished(false);
        setTimeout(() => typingRef.current?.focus(), 50);
    }, []);

    // --- Skip paragraph: advance past current line without affecting WPM ---
    const skipParagraph = useCallback(() => {
        if (isFinished || !activeText) return;
        if (!startRef.current) {
            startRef.current = Date.now();
            setHasStarted(true);
        }

        setTyped((prev) => {
            // Find the end of the current line/paragraph (next \n or end of text)
            let end = activeText.indexOf("\n", prev.length);
            if (end === -1) {
                end = activeText.length;
            } else {
                // Move past the newline so cursor lands at start of next paragraph
                end += 1;
            }

            // Advance typed position but do NOT count skipped chars toward WPM
            const skippedSlice = activeText.slice(prev.length, end);
            const newTyped = prev + skippedSlice;

            if (newTyped.length >= activeText.length) {
                setIsFinished(true);
                if (startRef.current) {
                    const mins = (Date.now() - startRef.current) / 60000;
                    const fw = mins > 0 ? Math.round(correctCharsRef.current / 5 / mins) : 0;
                    setWpm(fw);
                    setSessions((p) => p + 1);
                    setBestWpm((b) => (fw > b ? fw : b));
                }
            }
            return newTyped;
        });
    }, [isFinished, activeText]);

    const onKey = useCallback(
        (e: React.KeyboardEvent) => {
            if (isFinished) return;

            // Ctrl+Enter = skip paragraph
            if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
                e.preventDefault();
                skipParagraph();
                return;
            }

            if (e.key === "Tab") {
                e.preventDefault();
                restart();
                return;
            }
            if (e.key === "Escape") {
                e.preventDefault();
                reset();
                return;
            }
            if (e.key === "Backspace") {
                e.preventDefault();
                setTyped((p) => {
                    if (p.length === 0) return p;
                    if (p[p.length - 1] === activeText[p.length - 1]) {
                        correctCharsRef.current--;
                    }
                    return p.slice(0, -1);
                });
                return;
            }

            let typedChar: string;
            if (e.key === "Enter") {
                e.preventDefault();
                typedChar = "\n";
            } else if (e.key.length !== 1) {
                return;
            } else {
                e.preventDefault();
                typedChar = e.key;
            }

            // Start the timer on first real keystroke
            if (!startRef.current) {
                startRef.current = Date.now();
                setHasStarted(true);
            }

            setTyped((prev) => {
                const expected = activeText[prev.length];
                const ok = typedChar === expected;

                if (ok) correctCharsRef.current++;

                const nt = totalKeystrokes + 1;
                setTotalKeystrokes(nt);
                const ne = ok ? errors : errors + 1;
                if (!ok) {
                    setErrors(ne);
                    if (soundEnabled) playErrorSound();
                }
                setAccuracy(Math.round(((nt - ne) / nt) * 100));

                const newTyped = prev + typedChar;
                if (newTyped.length >= activeText.length) {
                    setIsFinished(true);
                    const mins = (Date.now() - startRef.current!) / 60000;
                    const fw = Math.round(correctCharsRef.current / 5 / mins);
                    setWpm(fw);
                    setSessions((p) => p + 1);
                    setBestWpm((b) => (fw > b ? fw : b));
                }
                return newTyped;
            });
        },
        [isFinished, activeText, errors, totalKeystrokes, soundEnabled, restart, reset, skipParagraph],
    );

    const handleStartPractice = useCallback(() => {
        const t = cleanText(sourceText.trim() || SAMPLE_TEXT);
        setSourceText(t);
        setActiveText(t);
        setTyped("");
        setIsActive(true);
        startRef.current = null;
        setHasStarted(false);
        correctCharsRef.current = 0;
        setElapsed(0);
        setWpm(0);
        setAccuracy(100);
        setErrors(0);
        setTotalKeystrokes(0);
        setIsFinished(false);
        setShowPaste(false);
        setSampleTitle("");
        setTimeout(() => typingRef.current?.focus(), 50);
    }, [sourceText]);

    const fmt = useCallback(
        (s: number) => `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, "0")}`,
        [],
    );

    const pct = activeText.length > 0 ? (typed.length / activeText.length) * 100 : 0;

    return {
        sourceText,
        activeText,
        typed,
        isActive,
        isFinished,
        loaded,
        showPaste,
        elapsed,
        wpm,
        accuracy,
        errors,
        totalKeystrokes,
        bestWpm,
        sessions,
        soundEnabled,
        sampleLoading,
        sampleError,
        sampleTitle,
        sampleFrom,
        hasStarted,
        setSourceText,
        setSoundEnabled,
        onKey,
        skipParagraph,
        reset,
        restart,
        handleStartPractice,
        typingRef,
        displayRef,
        fmt,
        pct,
    };
}
