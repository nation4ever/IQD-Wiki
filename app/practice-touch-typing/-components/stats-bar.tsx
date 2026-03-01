"use client";

interface StatsBarProps {
    wpm: number;
    accuracy: number;
    errors: number;
    elapsed: number;
    typedLength: number;
    totalLength: number;
    fmt: (s: number) => string;
}

export default function StatsBar({
    wpm,
    accuracy,
    errors,
    elapsed,
    typedLength,
    totalLength,
    fmt,
}: StatsBarProps) {
    return (
        <div className="flex gap-0 px-8 shrink-0 border-b border-border">
            <StatItem value={wpm} label="wpm" />
            <StatItem value={`${accuracy}%`} label="acc" />
            <StatItem value={errors} label="err" />
            <StatItem value={fmt(elapsed)} label="time" />
            <div className="py-3.5 px-6 flex items-baseline gap-2">
                <div className="font-mono text-2xl font-bold text-primary leading-none">
                    {typedLength}
                    <span className="text-muted-foreground/40 font-normal">/{totalLength}</span>
                </div>
                <div className="text-[11px] uppercase tracking-[1.5px] text-muted-foreground/40 font-semibold">
                    chars
                </div>
            </div>
        </div>
    );
}

function StatItem({ value, label }: { value: string | number; label: string }) {
    return (
        <div className="py-3.5 px-6 flex items-baseline gap-2 border-r border-border">
            <div className="font-mono text-2xl font-bold text-primary leading-none">{value}</div>
            <div className="text-[11px] uppercase tracking-[1.5px] text-muted-foreground/40 font-semibold">
                {label}
            </div>
        </div>
    );
}
