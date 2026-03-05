"use client";

import { useState, useRef, useCallback } from "react";
import { mkInitial } from "./data";
import { uid, makeBullet, makeLink, type CVData, type Link, type Job, type Project, type Skill, type Bullet, type Simple } from "./types";

/* ══════════════════════════════════════════════════════
   useCV HOOK
══════════════════════════════════════════════════════ */
export function useCV() {
    const [cv, setCV] = useState<CVData>(mkInitial);
    const cvRef = useRef<HTMLDivElement>(null);
    const [isExporting, setIsExporting] = useState(false);

    const upd = useCallback(<K extends keyof CVData>(k: K, v: CVData[K]) =>
        setCV(p => ({ ...p, [k]: v })), []);

    /* ── Link helpers ── */
    const updateLinkInList = (links: Link[], id: string, patch: Partial<Link>) =>
        links.map(l => l.id === id ? { ...l, ...patch } : l);
    const removeLinkFromList = (links: Link[], id: string) =>
        links.filter(l => l.id !== id);
    const addContactLink = () => upd("links", [...cv.links, makeLink("Label", "https://")]);

    /* ── Skill helpers ── */
    const addSkill = () =>
        setCV(p => ({ ...p, skills: [...p.skills, { id: uid(), label: "Category", value: "Skills…" }] }));
    const removeSkill = (id: string) =>
        setCV(p => ({ ...p, skills: p.skills.filter(s => s.id !== id) }));
    const updateSkill = (id: string, patch: Partial<Skill>) =>
        setCV(p => ({ ...p, skills: p.skills.map(s => s.id === id ? { ...s, ...patch } : s) }));

    /* ── Job helpers ── */
    const addJob = () =>
        setCV(p => ({ ...p, jobs: [...p.jobs, { id: uid(), title: "Company | Role (Year - Year)", bullets: [makeBullet("Add your bullet point here")] }] }));
    const removeJob = (id: string) =>
        setCV(p => ({ ...p, jobs: p.jobs.filter(j => j.id !== id) }));
    const updateJob = (id: string, patch: Partial<Job>) =>
        setCV(p => ({ ...p, jobs: p.jobs.map(j => j.id === id ? { ...j, ...patch } : j) }));
    const updateJobBullets = (jobId: string, bullets: Bullet[]) =>
        updateJob(jobId, { bullets });

    /* ── Project helpers ── */
    const addProject = () =>
        setCV(p => ({ ...p, projects: [...p.projects, { id: uid(), name: "Project Name", links: [], description: "Short description.", bullets: [makeBullet("Key point")] }] }));
    const removeProject = (id: string) =>
        setCV(p => ({ ...p, projects: p.projects.filter(x => x.id !== id) }));
    const updateProject = (id: string, patch: Partial<Project>) =>
        setCV(p => ({ ...p, projects: p.projects.map(x => x.id === id ? { ...x, ...patch } : x) }));
    const updateProjectBullets = (projId: string, bullets: Bullet[]) =>
        updateProject(projId, { bullets });
    const updateProjectLinks = (projId: string, links: Link[]) =>
        updateProject(projId, { links });

    /* ── Simple list helpers ── */
    const updateSimple = (field: "education" | "languages", id: string, text: string) =>
        setCV(p => ({ ...p, [field]: (p[field] as Simple[]).map(x => x.id === id ? { ...x, text } : x) }));
    const addSimple = (field: "education" | "languages") =>
        setCV(p => ({ ...p, [field]: [...(p[field] as Simple[]), { id: uid(), text: "" }] }));
    const removeSimple = (field: "education" | "languages", id: string) =>
        setCV(p => ({ ...p, [field]: (p[field] as Simple[]).filter(x => x.id !== id) }));

    /* ── Export PDF using html-to-image + jsPDF with clickable link annotations ── */
    async function exportPDF() {
        if (!cvRef.current) return;
        setIsExporting(true);
        (document.activeElement as HTMLElement)?.blur();
        // brief pause to let React flush any pending renders
        await new Promise(r => setTimeout(r, 200));
        try {
            const { toPng } = await import("html-to-image");
            const { jsPDF } = await import("jspdf");

            // Snapshot the link positions BEFORE capturing the image
            // (DOM layout must still be intact)
            const container = cvRef.current;
            const containerRect = container.getBoundingClientRect();
            // CV is always rendered at exactly 794×1123 CSS px
            // A4 in mm: 210×297
            const scaleX = 210 / 794;
            const scaleY = 297 / 1123;

            const linkAnnotations: { x: number; y: number; w: number; h: number; url: string }[] = [];
            const anchors = container.querySelectorAll<HTMLAnchorElement>("a[href]");
            anchors.forEach(anchor => {
                const href = anchor.getAttribute("href") || "";
                if (!href || href === "#" || href.startsWith("javascript")) return;
                const rect = anchor.getBoundingClientRect();
                // position relative to the cv container
                const relX = rect.left - containerRect.left;
                const relY = rect.top - containerRect.top;
                linkAnnotations.push({
                    x: relX * scaleX,
                    y: relY * scaleY,
                    w: Math.max(rect.width * scaleX, 4),
                    h: Math.max(rect.height * scaleY, 4),
                    url: href,
                });
            });

            const dataUrl = await toPng(container, {
                quality: 1,
                pixelRatio: 2,
                width: 794,
                height: 1123,
                style: {
                    transform: "none",
                    transformOrigin: "top left",
                },
                skipFonts: false,
                cacheBust: true,
            });

            const pdf = new jsPDF({
                orientation: "portrait",
                unit: "mm",
                format: "a4",
                compress: true,
            });

            // A4 = 210×297 mm — add the rasterized CV image
            pdf.addImage(dataUrl, "PNG", 0, 0, 210, 297);

            // Overlay clickable URI link annotations on top of the image
            linkAnnotations.forEach(({ x, y, w, h, url }) => {
                pdf.link(x, y, w, h, { url });
            });

            pdf.save("cv.pdf");
        } catch (e) {
            console.error("PDF export error:", e);
            alert("PDF export failed: " + (e as Error).message);
        }
        setIsExporting(false);
    }

    /* ── Export PNG using html-to-image ── */
    async function exportPNG() {
        if (!cvRef.current) return;
        setIsExporting(true);
        (document.activeElement as HTMLElement)?.blur();
        await new Promise(r => setTimeout(r, 200));
        try {
            const { toPng } = await import("html-to-image");

            const dataUrl = await toPng(cvRef.current, {
                quality: 1,
                pixelRatio: 3,
                width: 794,
                height: 1123,
                style: {
                    transform: "none",
                    transformOrigin: "top left",
                },
                skipFonts: false,
                cacheBust: true,
            });

            const link = document.createElement("a");
            link.download = "cv.png";
            link.href = dataUrl;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } catch (e: unknown) {
            console.error("PNG export error:", e);
            alert("PNG export failed: " + (e as Error).message);
        }
        setIsExporting(false);
    }

    return {
        cv, setCV, cvRef, isExporting,
        upd,
        // links
        updateLinkInList, removeLinkFromList, addContactLink,
        // skills
        addSkill, removeSkill, updateSkill,
        // jobs
        addJob, removeJob, updateJob, updateJobBullets,
        // projects
        addProject, removeProject, updateProject, updateProjectBullets, updateProjectLinks,
        // simple
        updateSimple, addSimple, removeSimple,
        // export
        exportPDF, exportPNG,
    };
}
