"use client";
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
                <ModeToggle />
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
