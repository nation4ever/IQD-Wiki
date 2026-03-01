"use client";

export default function KeyboardShortcutsFooter() {
    return (
        <div className="flex gap-4 justify-center py-2.5 shrink-0 border-t border-border">
            <ShortcutHint keyName="tab" action="restart" />
            <ShortcutHint keyName="esc" action="new text" />
            <ShortcutHint keyName="bksp" action="fix errors" />
        </div>
    );
}

function ShortcutHint({ keyName, action }: { keyName: string; action: string }) {
    return (
        <span className="font-mono text-[11px] text-muted-foreground/25">
            <kbd className="bg-secondary border border-border px-1.5 py-0.5 rounded text-muted-foreground/50 text-[11px] mr-1">
                {keyName}
            </kbd>
            {action}
        </span>
    );
}
