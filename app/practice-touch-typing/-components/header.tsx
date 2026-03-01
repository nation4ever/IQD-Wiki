"use client";
import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { ModeToggle } from "@/components/mode-toggle";

interface HeaderProps {
    sampleTitle: string;
    bestWpm: number;
    sessions: number;
    soundEnabled: boolean;
    isActive: boolean;
    onToggleSound: () => void;
    onRestart: () => void;
    onReset: () => void;
}

export default function Header({
    sampleTitle,
    bestWpm,
    sessions,
    soundEnabled,
    isActive,
    onToggleSound,
    onRestart,
    onReset,
}: HeaderProps) {
    const [isFullscreen, setIsFullscreen] = useState(false);

    useEffect(() => {
        const onChange = () => setIsFullscreen(!!document.fullscreenElement);
        document.addEventListener("fullscreenchange", onChange);
        return () => document.removeEventListener("fullscreenchange", onChange);
    }, []);

    const toggleFullscreen = useCallback(() => {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen().catch(() => { });
        } else {
            document.exitFullscreen().catch(() => { });
        }
    }, []);

    return (
        <div className="px-8 py-4 flex items-center justify-between border-b border-border shrink-0">
            <div className="flex items-center gap-5">
                <Link
                    href="/"
                    className="flex items-center gap-2.5 select-none no-underline hover:opacity-80 transition-opacity"
                >
                    <Image src="/logo.webp" alt="IQD Wiki" width={32} height={32} className="rounded-md" />
                    <span className="font-mono text-lg font-bold tracking-tight text-primary">
                        IqdWiki<span className="text-muted-foreground/40">.com</span>
                    </span>
                </Link>
                {sampleTitle && (
                    <div className="text-sm text-muted-foreground bg-secondary px-3 py-1 rounded-full font-mono">
                        {sampleTitle}
                    </div>
                )}
                <div className="text-[10px] uppercase tracking-[1.5px] text-muted-foreground/30 bg-secondary/50 px-2 py-0.5 rounded font-mono font-medium border border-border/50">
                    English only
                </div>
                <div className="flex gap-4 font-mono text-xs text-muted-foreground/40">
                    <span>
                        best <span className="text-muted-foreground">{bestWpm}wpm</span>
                    </span>
                    <span>
                        sessions <span className="text-muted-foreground">{sessions}</span>
                    </span>
                </div>
            </div>
            <div className="flex gap-2.5 items-center">
                <div dir="rtl">
                    <ModeToggle />
                </div>
                <button
                    className="border border-border rounded-lg w-9 h-9 flex items-center justify-center text-base cursor-pointer transition-all duration-150 text-muted-foreground/60 hover:bg-accent hover:text-primary"
                    onClick={toggleFullscreen}
                    title={isFullscreen ? "Exit fullscreen" : "Fullscreen"}
                >
                    {isFullscreen ? (
                        /* Collapse/exit fullscreen icon */
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="4 14 10 14 10 20" />
                            <polyline points="20 10 14 10 14 4" />
                            <line x1="14" y1="10" x2="21" y2="3" />
                            <line x1="3" y1="21" x2="10" y2="14" />
                        </svg>
                    ) : (
                        /* Expand/fullscreen icon */
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="15 3 21 3 21 9" />
                            <polyline points="9 21 3 21 3 15" />
                            <line x1="21" y1="3" x2="14" y2="10" />
                            <line x1="3" y1="21" x2="10" y2="14" />
                        </svg>
                    )}
                </button>
                <button
                    className={`border rounded-lg w-9 h-9 flex items-center justify-center text-base cursor-pointer transition-all duration-150
            ${soundEnabled ? "text-primary border-primary/20" : "text-muted-foreground/40 border-border"} hover:bg-accent`}
                    onClick={onToggleSound}
                    title={soundEnabled ? "Mute" : "Unmute"}
                >
                    {soundEnabled ? "♪" : "✕"}
                </button>
                {isActive && (
                    <>
                        <button
                            className="bg-secondary border border-border text-muted-foreground px-3 py-1.5 rounded-lg text-sm font-mono cursor-pointer transition-all duration-150 hover:bg-accent hover:text-primary"
                            onClick={onRestart}
                        >
                            restart
                        </button>
                        <button
                            className="bg-secondary border border-border text-muted-foreground px-3 py-1.5 rounded-lg text-sm font-mono cursor-pointer transition-all duration-150 hover:bg-accent hover:text-primary"
                            onClick={onReset}
                        >
                            new text
                        </button>
                    </>
                )}
            </div>
        </div>
    );
}
