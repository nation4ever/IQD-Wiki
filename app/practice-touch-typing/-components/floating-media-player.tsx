"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { Play, Pause, Volume2, VolumeX, SkipBack, SkipForward } from "lucide-react";
import { TRACKS } from "./media-tracks";

function formatTime(s: number): string {
    if (!isFinite(s) || s < 0) return "0:00";
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return `${m}:${sec.toString().padStart(2, "0")}`;
}

/* ── Main Component ───────────────────────────────────────────── */

export default function FloatingMediaPlayer() {
    const audioRef = useRef<HTMLAudioElement>(null);

    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [volume, setVolume] = useState(0.5);
    const [isMuted, setIsMuted] = useState(false);
    const [mounted, setMounted] = useState(false);

    const [currentTrackIndex, setCurrentTrackIndex] = useState(0);

    const currentTrack = TRACKS[currentTrackIndex];

    /* Slide-up entrance animation */
    useEffect(() => {
        const t = setTimeout(() => setMounted(true), 50);
        return () => clearTimeout(t);
    }, []);

    /* Audio event listeners */
    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        const onTimeUpdate = () => setCurrentTime(audio.currentTime);
        const onLoaded = () => setDuration(audio.duration);
        const onEnded = () => setIsPlaying(false);

        audio.addEventListener("timeupdate", onTimeUpdate);
        audio.addEventListener("loadedmetadata", onLoaded);
        audio.addEventListener("durationchange", onLoaded);
        audio.addEventListener("ended", onEnded);

        return () => {
            audio.removeEventListener("timeupdate", onTimeUpdate);
            audio.removeEventListener("loadedmetadata", onLoaded);
            audio.removeEventListener("durationchange", onLoaded);
            audio.removeEventListener("ended", onEnded);
        };
    }, []);

    /* Sync volume */
    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = isMuted ? 0 : volume;
        }
    }, [volume, isMuted]);

    const togglePlay = useCallback(() => {
        const audio = audioRef.current;
        if (!audio) return;
        if (isPlaying) {
            audio.pause();
            setIsPlaying(false);
        } else {
            audio.play().then(() => setIsPlaying(true)).catch(() => { });
        }
    }, [isPlaying]);

    const onSeek = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const v = parseFloat(e.target.value);
        if (audioRef.current) {
            audioRef.current.currentTime = v;
            setCurrentTime(v);
        }
    }, []);

    const onVolumeChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const v = parseFloat(e.target.value);
        setVolume(v);
        if (v > 0 && isMuted) setIsMuted(false);
    }, [isMuted]);

    const toggleMute = useCallback(() => {
        setIsMuted((m) => !m);
    }, []);

    const playNextTrack = useCallback(() => {
        setCurrentTrackIndex((prev) => (prev + 1) % TRACKS.length);
        setIsPlaying(true);
    }, []);

    const playPrevTrack = useCallback(() => {
        setCurrentTrackIndex((prev) => (prev - 1 + TRACKS.length) % TRACKS.length);
        setIsPlaying(true);
    }, []);

    // Auto-play when track changes via next/prev buttons
    useEffect(() => {
        if (mounted && isPlaying && audioRef.current) {
            audioRef.current.play().catch(() => setIsPlaying(false));
        }
    }, [currentTrackIndex, mounted, isPlaying]);

    const progressPct = duration > 0 ? (currentTime / duration) * 100 : 0;
    const volumePct = isMuted ? 0 : volume * 100;

    return (
        <>
            <audio ref={audioRef} src={currentTrack.src} preload="metadata" />

            <div
                className="fixed bottom-6 left-1/2 z-50"
                style={{
                    transform: mounted
                        ? "translateX(-50%) translateY(0)"
                        : "translateX(-50%) translateY(calc(100% + 40px))",
                    transition: "transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)",
                }}
            >
                {/* Main island */}
                <div
                    className="relative shadow-2xl bg-background flex flex-col rounded-2xl border overflow-hidden"
                >
                    {/* ─── Top row: media controls ─── */}
                    <div className="flex items-center gap-3 px-5 py-3 border-b">
                        {/* ─── Transport controls ─── */}
                        <div className="flex flex-row-reverse items-center gap-1">
                            <button
                                onClick={playPrevTrack}
                                className="w-8 h-8 flex items-center justify-center rounded-full text-muted-foreground/70 hover:text-foreground hover:bg-muted/50 transition-colors duration-150 cursor-pointer"
                                title="Previous track"
                            >
                                <SkipBack className="w-4 h-4 fill-current" />
                            </button>

                            <button
                                onClick={togglePlay}
                                className="w-10 h-10 flex items-center justify-center rounded-full bg-primary text-primary-foreground transition-all duration-200 hover:scale-105 hover:shadow-lg cursor-pointer active:scale-95"
                                style={{
                                    boxShadow: isPlaying
                                        ? "0 0 16px color-mix(in oklch, var(--primary) 40%, transparent)"
                                        : "none",
                                }}
                                title={isPlaying ? "Pause" : "Play"}
                            >
                                {isPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current" />}
                            </button>

                            <button
                                onClick={playNextTrack}
                                className="w-8 h-8 flex items-center justify-center rounded-full text-muted-foreground/70 hover:text-foreground hover:bg-muted/50 transition-colors duration-150 cursor-pointer"
                                title="Next track"
                            >
                                <SkipForward className="w-4 h-4 fill-current" />
                            </button>
                        </div>

                        {/* ─── Divider ─── */}
                        <div className="w-px h-6 bg-border/40" />

                        {/* ─── Time + seek bar ─── */}
                        <div className="flex items-center gap-2.5 min-w-[220px]">
                            <span className="text-[11px] font-mono text-muted-foreground/60 w-[36px] text-right tabular-nums select-none">
                                {formatTime(currentTime)}
                            </span>

                            <div className="relative flex-1 h-5 flex items-center group">
                                {/* track bg */}
                                <div className="absolute left-0 right-0 h-[3px] rounded-full bg-muted-foreground/15" />
                                {/* filled */}
                                <div
                                    className="absolute left-0 h-[3px] rounded-full transition-[width] duration-75"
                                    style={{
                                        width: `${progressPct}%`,
                                        background: "var(--primary)",
                                    }}
                                />
                                {/* thumb dot */}
                                <div
                                    className="absolute w-3 h-3 rounded-full bg-primary shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none"
                                    style={{
                                        left: `calc(${progressPct}% - 6px)`,
                                    }}
                                />
                                <input
                                    type="range"
                                    min={0}
                                    max={duration || 0}
                                    step={0.1}
                                    value={currentTime}
                                    onChange={onSeek}
                                    className="media-player-range absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                    style={{ margin: 0 }}
                                    dir="ltr"
                                />
                            </div>

                            <span className="text-[11px] font-mono text-muted-foreground/40 w-[36px] tabular-nums select-none">
                                {formatTime(duration)}
                            </span>
                        </div>

                        {/* ─── Divider ─── */}
                        <div className="w-px h-6 bg-border/40" />

                        {/* ─── Volume ─── */}
                        <div className="flex items-center gap-1.5">
                            <button
                                onClick={toggleMute}
                                className="w-7 h-7 flex items-center justify-center rounded-full text-muted-foreground/70 hover:text-foreground transition-colors duration-150 cursor-pointer"
                                title={isMuted ? "Unmute" : "Mute"}
                            >
                                {isMuted || volume === 0 ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                            </button>

                            <div className="relative w-[72px] h-5 flex items-center group">
                                {/* track bg */}
                                <div className="absolute left-0 right-0 h-[3px] rounded-full bg-muted-foreground/15" />
                                {/* filled */}
                                <div
                                    className="absolute left-0 h-[3px] rounded-full transition-[width] duration-75"
                                    style={{
                                        width: `${volumePct}%`,
                                        background: "var(--primary)",
                                    }}
                                />
                                {/* thumb dot */}
                                <div
                                    className="absolute w-2.5 h-2.5 rounded-full bg-primary shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none"
                                    style={{
                                        left: `calc(${volumePct}% - 5px)`,
                                    }}
                                />
                                <input
                                    type="range"
                                    min={0}
                                    max={1}
                                    step={0.01}
                                    value={isMuted ? 0 : volume}
                                    onChange={onVolumeChange}
                                    className="media-player-range absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                    style={{ margin: 0 }}
                                    dir="ltr"
                                />

                            </div>
                        </div>
                    </div>

                    {/* ─── Bottom row: keyboard shortcuts ─── */}
                    <div className="flex items-center justify-center gap-4 px-5 py-1.5 border-t border-border/30">
                        <ShortcutHint keyName="tab" action="restart" />
                        <ShortcutHint keyName="esc" action="new text" />
                        <ShortcutHint keyName="bksp" action="fix errors" />
                        <ShortcutHint keyName="ctrl+enter" action="skip paragraph" />
                    </div>
                </div>
            </div>
        </>
    );
}

function ShortcutHint({ keyName, action }: { keyName: string; action: string }) {
    return (
        <span className="font-mono text-[10px] text-muted-foreground/25">
            <kbd className="bg-secondary/60 border border-border/40 px-1.5 py-0.5 rounded text-muted-foreground/50 text-[10px] mr-1">
                {keyName}
            </kbd>
            {action}
        </span>
    );
}
