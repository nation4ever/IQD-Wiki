"use client";
import { memo } from "react";

/**
 * Renders the full typing text with color-coded characters:
 * - Correct chars: muted
 * - Wrong chars: destructive
 * - Pending chars: faint
 * - Cursor: blinking left-border
 *
 * Newline characters are always shown as ↵ so the user knows
 * they need to press Enter before reaching that position.
 */
const TextDisplay = memo(function TextDisplay({
    activeText,
    typed,
}: {
    activeText: string;
    typed: string;
}) {
    const cursorPos = typed.length;
    const chunks: { text: string; className: string; hasCursor: boolean }[] = [];

    let currentClass = "";
    let currentText = "";
    let currentHasCursor = false;

    for (let i = 0; i < activeText.length; i++) {
        const ch = activeText[i];
        const isCursor = i === cursorPos;
        const isNewline = ch === "\n";
        let cls: string;

        if (i >= typed.length) {
            cls = "text-muted-foreground/20";
        } else if (typed[i] === activeText[i]) {
            cls = "text-muted-foreground";
        } else {
            if (ch === " " || isNewline) {
                cls = "bg-destructive/20 rounded-sm";
            } else {
                cls = "text-destructive bg-destructive/10 rounded-sm";
            }
        }

        // Always show ↵ for newlines, and give cursor its own span
        if (isCursor) {
            // Flush previous chunk
            if (currentText) {
                chunks.push({ text: currentText, className: currentClass, hasCursor: currentHasCursor });
            }
            const displayChar = isNewline ? "↵\n" : ch;
            chunks.push({
                text: displayChar,
                className: cls + " typing-cursor relative z-[1]",
                hasCursor: true,
            });
            currentText = "";
            currentClass = "";
            currentHasCursor = false;
            continue;
        }

        // Non-cursor newline: still show ↵ symbol
        if (isNewline) {
            if (currentText) {
                chunks.push({ text: currentText, className: currentClass, hasCursor: false });
            }
            chunks.push({
                text: "↵\n",
                className: cls + " opacity-30",
                hasCursor: false,
            });
            currentText = "";
            currentClass = "";
            currentHasCursor = false;
            continue;
        }

        if (cls !== currentClass || currentHasCursor) {
            if (currentText) {
                chunks.push({ text: currentText, className: currentClass, hasCursor: currentHasCursor });
            }
            currentText = ch;
            currentClass = cls;
            currentHasCursor = false;
        } else {
            currentText += ch;
        }
    }
    if (currentText) {
        chunks.push({ text: currentText, className: currentClass, hasCursor: currentHasCursor });
    }

    return (
        <>
            {chunks.map((chunk, i) => (
                <span
                    key={i}
                    className={`whitespace-pre-wrap ${chunk.className}`}
                    {...(chunk.hasCursor ? { "data-cursor": "true" } : {})}
                >
                    {chunk.text}
                </span>
            ))}
        </>
    );
});

export default TextDisplay;
