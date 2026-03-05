"use client";

import React, { useState } from "react";
import { useCV } from "./use-cv";
import { CVPreview } from "./cv-preview";
import { EditorPanel } from "./editor-panel";
import { ColorFAB } from "./color-fab";
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable";

/* ══════════════════════════════════════════════════════
   CV PAGE — split panel layout
   Left  : A4 CV preview (live, read-only)
   Right : Structured editor panel (tree-view + shadcn inputs)
══════════════════════════════════════════════════════ */
export default function CVPage() {
    const [accentColor, setAccentColor] = useState("#4ecdc4");

    const {
        cv, cvRef, isExporting, setCV,
        upd,
        addSkill, removeSkill, updateSkill,
        addJob, removeJob, updateJob,
        addProject, removeProject, updateProject,
        addSimple, removeSimple, updateSimple,
        exportPDF, exportPNG,
    } = useCV();

    return (
        <>
            {/* ── Loading overlay ── */}
            {isExporting && (
                <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/40">
                    <div className="rounded-2xl bg-white px-12 py-8 text-center shadow-2xl">
                        <div
                            className="mx-auto mb-3 h-9 w-9 animate-spin rounded-full border-4 border-gray-200"
                            style={{ borderTopColor: accentColor }}
                        />
                        <p className="text-sm font-semibold text-gray-800">Exporting…</p>
                    </div>
                </div>
            )}

            {/* ── Main split layout ── */}
            <div className="h-screen w-screen overflow-hidden" style={{ fontFamily: "'Inter', sans-serif" }}>
                <ResizablePanelGroup orientation="horizontal" className="h-full">

                    {/* ─── LEFT: CV Preview ─── */}
                    <ResizablePanel defaultSize={60} minSize={40}>
                        <div
                            className="h-full overflow-auto bg-[#eef0f3] flex justify-center py-8 px-4"
                            style={{ fontFamily: "'Inter', sans-serif" }}
                        >
                            <div className="shadow-2xl rounded-sm">
                                <CVPreview
                                    cv={cv}
                                    cvRef={cvRef as React.RefObject<HTMLDivElement>}
                                    accentColor={accentColor}
                                />
                            </div>
                        </div>
                    </ResizablePanel>

                    <ResizableHandle withHandle />

                    {/* ─── RIGHT: Editor Panel ─── */}
                    <ResizablePanel defaultSize={40} minSize={28}>
                        <EditorPanel
                            cv={cv}
                            setCV={setCV}
                            upd={upd}
                            addSkill={addSkill}
                            removeSkill={removeSkill}
                            updateSkill={updateSkill}
                            addJob={addJob}
                            removeJob={removeJob}
                            updateJob={updateJob}
                            addProject={addProject}
                            removeProject={removeProject}
                            updateProject={updateProject}
                            addSimple={addSimple}
                            removeSimple={removeSimple}
                            updateSimple={updateSimple}
                            isExporting={isExporting}
                            onExportPDF={exportPDF}
                            onExportPNG={exportPNG}
                        />
                    </ResizablePanel>

                </ResizablePanelGroup>
            </div>

            {/* ── Floating color picker ── */}
            <ColorFAB accentColor={accentColor} onChange={setAccentColor} />
        </>
    );
}
