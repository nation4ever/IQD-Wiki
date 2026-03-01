"use client";

interface ProgressBarProps {
    percentage: number;
}

export default function ProgressBar({ percentage }: ProgressBarProps) {
    return (
        <div className="h-1 bg-border/50 shrink-0">
            <div
                className="h-full bg-primary transition-[width] duration-100 rounded-r-sm"
                style={{ width: `${percentage}%` }}
            />
        </div>
    );
}
