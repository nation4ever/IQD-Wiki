"use client";
import { PRESET_SAMPLES } from "./preset-samples";

interface PastePanelProps {
    sourceText: string;
    sampleError: string;
    onTextChange: (text: string) => void;
    onStartPractice: () => void;
}

export default function PastePanel({
    sourceText,
    sampleError,
    onTextChange,
    onStartPractice,
}: PastePanelProps) {
    const hasText = sourceText.trim().length > 0;

    return (
        <div className="w-[380px] shrink-0 flex flex-col border-l border-border bg-card/50">
            <div className="px-5 py-4 border-b border-border">
                <div className="text-xs uppercase tracking-[2.5px] text-muted-foreground/40 font-semibold">
                    Paste your text
                </div>
            </div>

            {/* Preset sample buttons */}
            <div className="px-5 pt-4 pb-2 flex flex-col gap-1.5 border-b border-border">
                <div className="text-[10px] uppercase tracking-[1.5px] text-muted-foreground/30 font-semibold mb-1">
                    Quick start
                </div>
                {PRESET_SAMPLES.map((sample) => (
                    <button
                        key={sample.title}
                        className="w-full text-left px-3 py-2 rounded-lg text-sm font-mono text-muted-foreground bg-secondary/50 border border-border/50 cursor-pointer transition-all duration-150 hover:bg-accent hover:text-primary hover:border-primary/20"
                        onClick={() => onTextChange(sample.content)}
                    >
                        {sample.title}
                    </button>
                ))}
            </div>

            <div className="flex-1 p-5 min-h-0">
                <textarea
                    className="w-full h-full bg-transparent border-none text-muted-foreground font-mono text-sm leading-[1.8] resize-none outline-none placeholder:text-muted-foreground/20"
                    style={{ scrollbarWidth: "none" }}
                    value={sourceText}
                    onChange={(e) => onTextChange(e.target.value)}
                    placeholder={
                        "Paste English text here...\n\narticle, paragraph, notes,\nor any text you want to\npractice typing.\n\nArabic text will be\nautomatically removed.\n\nProgress saves automatically."
                    }
                    spellCheck={false}
                />
            </div>
            <div className="p-5 border-t border-border">
                <button
                    className={`start-practice-btn w-full border-none py-3 rounded-xl font-[Outfit,sans-serif] text-base font-semibold transition-all duration-200
            ${hasText
                            ? "bg-primary text-primary-foreground cursor-pointer hover:opacity-90 hover:-translate-y-px hover:shadow-lg hover:shadow-primary/10"
                            : "bg-muted text-muted-foreground/40 cursor-not-allowed"
                        }`}
                    onClick={onStartPractice}
                    disabled={!hasText}
                >
                    start practice →
                </button>
            </div>
        </div>
    );
}
