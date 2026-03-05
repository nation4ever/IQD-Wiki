"use client";

import React, { useState, useRef, useEffect } from "react";

/* ══════════════════════════════════════════════════════
   COLOR PICKER FAB
   Floating action button at bottom-right with preset
   accent colour swatches.
══════════════════════════════════════════════════════ */

export const ACCENT_PRESETS = [
    { name: "Classic Navy", hex: "#1e40af" },
    { name: "Charcoal", hex: "#334155" },
    { name: "Forest", hex: "#115e59" },
    { name: "Burgundy", hex: "#7f1d1d" },
    { name: "Plum", hex: "#581c87" },
    { name: "Bronze", hex: "#9a3412" },
    { name: "Deep Teal", hex: "#0f766e" },
    { name: "Jet Black", hex: "#0f172a" },
] as const;

interface ColorFABProps {
    accentColor: string;
    onChange: (color: string) => void;
}

export function ColorFAB({ accentColor, onChange }: ColorFABProps) {
    const [open, setOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    /* close on outside click */
    useEffect(() => {
        function handler(e: MouseEvent) {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                setOpen(false);
            }
        }
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, []);

    return (
        <div
            ref={ref}
            style={{
                position: "fixed",
                bottom: 28,
                right: 28,
                zIndex: 9999,
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-end",
                gap: 10,
                fontFamily: "'Inter', sans-serif",
            }}
        >
            {/* ── Pop-up panel ── */}
            <div
                style={{
                    opacity: open ? 1 : 0,
                    transform: open ? "translateY(0) scale(1)" : "translateY(8px) scale(0.96)",
                    pointerEvents: open ? "auto" : "none",
                    transition: "opacity 0.18s ease, transform 0.18s ease",
                    background: "rgba(17,24,39,0.92)",
                    backdropFilter: "blur(12px)",
                    borderRadius: 16,
                    padding: "14px 16px",
                    boxShadow: "0 8px 32px rgba(0,0,0,0.35)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    minWidth: 220,
                }}
            >
                <p style={{ margin: "0 0 10px", fontSize: 11, fontWeight: 600, color: "rgba(255,255,255,0.45)", textTransform: "uppercase", letterSpacing: "0.07em" }}>
                    Theme Color
                </p>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                    {ACCENT_PRESETS.map(({ name, hex }) => {
                        const active = accentColor === hex;
                        return (
                            <button
                                key={hex}
                                title={name}
                                onClick={() => { onChange(hex); setOpen(false); }}
                                style={{
                                    width: 32,
                                    height: 32,
                                    borderRadius: "50%",
                                    background: hex,
                                    border: active ? "3px solid #fff" : "3px solid transparent",
                                    outline: active ? `2px solid ${hex}` : "2px solid transparent",
                                    outlineOffset: 1,
                                    cursor: "pointer",
                                    transition: "transform 0.12s ease, border 0.12s ease",
                                    transform: active ? "scale(1.18)" : "scale(1)",
                                    boxShadow: active ? `0 0 0 3px ${hex}44` : "none",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    padding: 0,
                                }}
                                onMouseEnter={e => { if (!active) (e.currentTarget as HTMLButtonElement).style.transform = "scale(1.1)"; }}
                                onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.transform = active ? "scale(1.18)" : "scale(1)"; }}
                            >
                                {active && (
                                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                                        <path d="M2.5 7L6 10.5L11.5 4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                )}
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* ── FAB button ── */}
            <button
                onClick={() => setOpen(o => !o)}
                title="Customize theme color"
                style={{
                    width: 52,
                    height: 52,
                    borderRadius: "50%",
                    background: accentColor,
                    border: "none",
                    cursor: "pointer",
                    boxShadow: `0 4px 20px ${accentColor}66, 0 2px 8px rgba(0,0,0,0.2)`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    transition: "transform 0.18s ease, box-shadow 0.18s ease",
                    transform: open ? "scale(1.08) rotate(30deg)" : "scale(1)",
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.transform = open ? "scale(1.12) rotate(30deg)" : "scale(1.08)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.transform = open ? "scale(1.08) rotate(30deg)" : "scale(1)"; }}
            >
                {/* Palette icon */}
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="13.5" cy="6.5" r="0.5" fill="white" />
                    <circle cx="17.5" cy="10.5" r="0.5" fill="white" />
                    <circle cx="8.5" cy="7.5" r="0.5" fill="white" />
                    <circle cx="6.5" cy="12.5" r="0.5" fill="white" />
                    <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z" />
                </svg>
            </button>
        </div>
    );
}
