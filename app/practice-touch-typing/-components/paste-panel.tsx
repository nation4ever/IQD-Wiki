"use client";

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
    return (
        <div className="w-[380px] shrink-0 flex flex-col border-l border-border bg-card/50">
            <div className="px-5 py-4 border-b border-border">
                <div className="text-xs uppercase tracking-[2.5px] text-muted-foreground/40 font-semibold">
                    Paste your text
                </div>
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
                    className="w-full bg-primary text-primary-foreground border-none py-3 rounded-xl font-[Outfit,sans-serif] text-base font-semibold cursor-pointer transition-all duration-200 hover:opacity-90 hover:-translate-y-px hover:shadow-lg hover:shadow-primary/10"
                    onClick={onStartPractice}
                >
                    {sourceText.trim() ? "start practice →" : "use sample text →"}
                </button>
            </div>
        </div>
    );
}
