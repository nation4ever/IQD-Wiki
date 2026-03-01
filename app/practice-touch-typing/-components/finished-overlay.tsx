"use client";

interface FinishedOverlayProps {
    wpm: number;
    accuracy: number;
    errors: number;
    elapsed: number;
    fmt: (s: number) => string;
    onRestart: () => void;
    onReset: () => void;
}

export default function FinishedOverlay({
    wpm,
    accuracy,
    errors,
    elapsed,
    fmt,
    onRestart,
    onReset,
}: FinishedOverlayProps) {
    return (
        <div
            className="absolute inset-0 bg-background/95 backdrop-blur-md flex flex-col items-center justify-center gap-8 z-10"
            style={{ animation: "finish-in 0.3s ease" }}
        >
            <div className="text-xs uppercase tracking-[3px] text-primary font-bold bg-primary/5 px-4 py-2 rounded-2xl border border-primary/10">
                completed
            </div>
            <div className="flex gap-12">
                <ResultItem value={wpm} label="wpm" />
                <ResultItem value={`${accuracy}%`} label="accuracy" />
                <ResultItem value={errors} label="errors" />
                <ResultItem value={fmt(elapsed)} label="time" />
            </div>
            <div className="flex gap-3 mt-2">
                <button
                    className="px-6 py-3 rounded-lg font-[Outfit,sans-serif] text-sm font-medium cursor-pointer transition-all duration-150 bg-primary text-primary-foreground hover:opacity-90"
                    onClick={onRestart}
                >
                    try again
                </button>
                <button
                    className="px-6 py-3 rounded-lg font-[Outfit,sans-serif] text-sm font-medium cursor-pointer transition-all duration-150 bg-transparent text-muted-foreground border border-border hover:bg-accent hover:text-primary"
                    onClick={onReset}
                >
                    new text
                </button>
            </div>
        </div>
    );
}

function ResultItem({ value, label }: { value: string | number; label: string }) {
    return (
        <div className="text-center">
            <div className="font-mono text-5xl font-bold text-foreground">{value}</div>
            <div className="text-xs uppercase tracking-[1.5px] text-muted-foreground/40 font-semibold mt-1">
                {label}
            </div>
        </div>
    );
}
