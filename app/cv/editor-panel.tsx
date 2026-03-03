"use client";

import React, { useState } from "react";
import {
    User, Briefcase, FolderOpen, GraduationCap, Languages,
    Wrench, Link2, FileText, Plus, Trash2, ChevronRight
} from "lucide-react";
import { TreeView, type TreeDataItem } from "@/components/tree-view";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable";
import type { CVData, Bullet, Link, Job, Project, Simple, Skill } from "./types";
import { uid, makeBullet, makeLink } from "./types";
import { AIAssistantDialog } from "./ai-assistant";

/* ══════════════════════════════════════════════════════
   SUB-EDITORS
══════════════════════════════════════════════════════ */

/* ── Bullet list editor ── */
function BulletListEditor({
    bullets,
    onChange,
}: {
    bullets: Bullet[];
    onChange: (b: Bullet[]) => void;
}) {
    const update = (id: string, text: string) =>
        onChange(bullets.map(b => b.id === id ? { ...b, text } : b));
    const remove = (id: string) => onChange(bullets.filter(b => b.id !== id));
    const add = () => onChange([...bullets, makeBullet("")]);

    return (
        <div className="space-y-2">
            {bullets.map((b, i) => (
                <div key={b.id} className="flex gap-2 items-start">
                    <span className="text-muted-foreground text-xs mt-2.5 shrink-0 w-4">{i + 1}.</span>
                    <Textarea
                        value={b.text}
                        onChange={e => update(b.id, e.target.value)}
                        rows={2}
                        className="flex-1 text-sm resize-none"
                        placeholder="Bullet point…"
                    />
                    <Button
                        variant="ghost" size="icon"
                        className="shrink-0 text-destructive hover:text-destructive hover:bg-destructive/10 mt-0.5"
                        onClick={() => remove(b.id)}
                    >
                        <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                </div>
            ))}
            <Button variant="outline" size="sm" className="w-full border-dashed" onClick={add}>
                <Plus className="h-3.5 w-3.5 mr-1.5" /> Add bullet
            </Button>
        </div>
    );
}

/* ── Link list editor ── */
function LinkListEditor({
    links,
    onChange,
}: {
    links: Link[];
    onChange: (l: Link[]) => void;
}) {
    const update = (id: string, patch: Partial<Link>) =>
        onChange(links.map(l => l.id === id ? { ...l, ...patch } : l));
    const remove = (id: string) => onChange(links.filter(l => l.id !== id));
    const add = () => onChange([...links, makeLink("Label", "https://")]);

    return (
        <div className="space-y-3">
            {links.map(l => (
                <div key={l.id} className="flex gap-2 items-center">
                    <Input
                        value={l.label}
                        onChange={e => update(l.id, { label: e.target.value })}
                        className="w-28 shrink-0 text-sm"
                        placeholder="Label"
                    />
                    <Input
                        value={l.href}
                        onChange={e => update(l.id, { href: e.target.value })}
                        className="flex-1 text-sm"
                        placeholder="https://…"
                    />
                    <Button
                        variant="ghost" size="icon"
                        className="shrink-0 text-destructive hover:text-destructive hover:bg-destructive/10"
                        onClick={() => remove(l.id)}
                    >
                        <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                </div>
            ))}
            <Button variant="outline" size="sm" className="w-full border-dashed" onClick={add}>
                <Plus className="h-3.5 w-3.5 mr-1.5" /> Add link
            </Button>
        </div>
    );
}

/* ── Simple (text only) list editor ── */
function SimpleListEditor({
    items,
    onChange,
    placeholder,
}: {
    items: Simple[];
    onChange: (v: Simple[]) => void;
    placeholder?: string;
}) {
    const update = (id: string, text: string) =>
        onChange(items.map(i => i.id === id ? { ...i, text } : i));
    const remove = (id: string) => onChange(items.filter(i => i.id !== id));
    const add = () => onChange([...items, { id: uid(), text: "" }]);

    return (
        <div className="space-y-2">
            {items.map((item, i) => (
                <div key={item.id} className="flex gap-2 items-center">
                    <span className="text-muted-foreground text-xs shrink-0 w-4">{i + 1}.</span>
                    <Input
                        value={item.text}
                        onChange={e => update(item.id, e.target.value)}
                        className="flex-1 text-sm"
                        placeholder={placeholder ?? "Entry…"}
                    />
                    <Button
                        variant="ghost" size="icon"
                        className="shrink-0 text-destructive hover:text-destructive hover:bg-destructive/10"
                        onClick={() => remove(item.id)}
                    >
                        <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                </div>
            ))}
            <Button variant="outline" size="sm" className="w-full border-dashed" onClick={add}>
                <Plus className="h-3.5 w-3.5 mr-1.5" /> Add entry
            </Button>
        </div>
    );
}

/* ══════════════════════════════════════════════════════
   SECTION DETAIL VIEWS
══════════════════════════════════════════════════════ */

function SectionHeader({ title, hint }: { title: string; hint?: string }) {
    return (
        <div className="mb-5">
            <h3 className="text-base font-semibold text-foreground">{title}</h3>
            {hint && <p className="text-xs text-muted-foreground mt-0.5">{hint}</p>}
            <Separator className="mt-3" />
        </div>
    );
}

function PersonalInfoEditor({ cv, upd }: { cv: CVData; upd: <K extends keyof CVData>(k: K, v: CVData[K]) => void }) {
    return (
        <div className="space-y-4">
            <SectionHeader title="Personal Info" hint="Your name, title, and contact details" />
            <div className="grid grid-cols-2 gap-3">
                <div className="col-span-2 space-y-1.5">
                    <Label htmlFor="cv-name" className="text-xs font-medium">Full Name</Label>
                    <Input id="cv-name" value={cv.name} onChange={e => upd("name", e.target.value)} className="text-sm" placeholder="JOHN DOE" />
                </div>
                <div className="col-span-2 space-y-1.5">
                    <Label htmlFor="cv-title" className="text-xs font-medium">Job Title</Label>
                    <Input id="cv-title" value={cv.titleLine} onChange={e => upd("titleLine", e.target.value)} className="text-sm" placeholder="Frontend Developer" />
                </div>
                <div className="space-y-1.5">
                    <Label htmlFor="cv-phone" className="text-xs font-medium">Phone</Label>
                    <Input id="cv-phone" value={cv.phone} onChange={e => upd("phone", e.target.value)} className="text-sm" placeholder="+1 234 567 890" />
                </div>
                <div className="space-y-1.5">
                    <Label htmlFor="cv-location" className="text-xs font-medium">Location</Label>
                    <Input id="cv-location" value={cv.location} onChange={e => upd("location", e.target.value)} className="text-sm" placeholder="City, Country" />
                </div>
                <div className="col-span-2 space-y-1.5">
                    <Label htmlFor="cv-email" className="text-xs font-medium">Email</Label>
                    <Input id="cv-email" value={cv.email} onChange={e => upd("email", e.target.value)} className="text-sm" placeholder="you@example.com" />
                </div>
            </div>
        </div>
    );
}

function LinksEditor({ cv, upd }: { cv: CVData; upd: <K extends keyof CVData>(k: K, v: CVData[K]) => void }) {
    return (
        <div className="space-y-4">
            <SectionHeader title="Links" hint="LinkedIn, GitHub, portfolio, etc." />
            <LinkListEditor
                links={cv.links}
                onChange={links => upd("links", links)}
            />
        </div>
    );
}

function SummaryEditor({ cv, upd }: { cv: CVData; upd: <K extends keyof CVData>(k: K, v: CVData[K]) => void }) {
    return (
        <div className="space-y-4">
            <SectionHeader title="Summary" hint="A short professional bio (2–4 sentences)" />
            <Textarea
                value={cv.summary}
                onChange={e => upd("summary", e.target.value)}
                rows={6}
                className="text-sm resize-none"
                placeholder="Frontend developer with X years of experience…"
            />
            <p className="text-xs text-muted-foreground">{cv.summary.length} characters</p>
        </div>
    );
}

function SkillsEditor({
    cv, upd, addSkill, removeSkill, updateSkill
}: {
    cv: CVData;
    upd: <K extends keyof CVData>(k: K, v: CVData[K]) => void;
    addSkill: () => void;
    removeSkill: (id: string) => void;
    updateSkill: (id: string, patch: Partial<Skill>) => void;
}) {
    return (
        <div className="space-y-4">
            <SectionHeader title="Skills & Technologies" hint="Group by category" />
            <div className="space-y-1.5">
                <Label className="text-xs font-medium">Section Title</Label>
                <Input value={cv.skillsTitle} onChange={e => upd("skillsTitle", e.target.value)} className="text-sm" />
            </div>
            <Separator />
            <div className="space-y-4">
                {cv.skills.map(skill => (
                    <div key={skill.id} className="rounded-lg border p-3 space-y-2 bg-muted/20">
                        <div className="flex gap-2 items-center">
                            <Input
                                value={skill.label}
                                onChange={e => updateSkill(skill.id, { label: e.target.value })}
                                className="w-28 shrink-0 text-sm font-medium"
                                placeholder="Category"
                            />
                            <Input
                                value={skill.value}
                                onChange={e => updateSkill(skill.id, { value: e.target.value })}
                                className="flex-1 text-sm"
                                placeholder="React, Next.js, TypeScript…"
                            />
                            <Button
                                variant="ghost" size="icon"
                                className="shrink-0 text-destructive hover:text-destructive hover:bg-destructive/10"
                                onClick={() => removeSkill(skill.id)}
                            >
                                <Trash2 className="h-3.5 w-3.5" />
                            </Button>
                        </div>
                    </div>
                ))}
                <Button variant="outline" size="sm" className="w-full border-dashed" onClick={addSkill}>
                    <Plus className="h-3.5 w-3.5 mr-1.5" /> Add skill category
                </Button>
            </div>
        </div>
    );
}

function JobEditor({
    job,
    onUpdate,
    onRemove,
}: {
    job: Job;
    onUpdate: (patch: Partial<Job>) => void;
    onRemove: () => void;
}) {
    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <SectionHeader title="Work Experience Entry" hint="Edit this job entry" />
                <Button
                    variant="ghost" size="sm"
                    className="text-destructive hover:bg-destructive/10 -mt-2 shrink-0"
                    onClick={onRemove}
                >
                    <Trash2 className="h-3.5 w-3.5 mr-1.5" /> Remove
                </Button>
            </div>
            <div className="space-y-1.5">
                <Label className="text-xs font-medium">Job Title & Company</Label>
                <Input
                    value={job.title}
                    onChange={e => onUpdate({ title: e.target.value })}
                    className="text-sm"
                    placeholder="Role | Company (Year - Year)"
                />
            </div>
            <div className="space-y-1.5">
                <Label className="text-xs font-medium">Bullet Points</Label>
                <BulletListEditor
                    bullets={job.bullets}
                    onChange={bullets => onUpdate({ bullets })}
                />
            </div>
        </div>
    );
}

function AllJobsEditor({
    cv, upd, addJob, removeJob, updateJob,
    onSelectJob,
}: {
    cv: CVData;
    upd: <K extends keyof CVData>(k: K, v: CVData[K]) => void;
    addJob: () => void;
    removeJob: (id: string) => void;
    updateJob: (id: string, patch: Partial<Job>) => void;
    onSelectJob: (id: string) => void;
}) {
    return (
        <div className="space-y-4">
            <SectionHeader title="Work Experience" hint="Manage your jobs — click an entry to edit" />
            <div className="space-y-1.5">
                <Label className="text-xs font-medium">Section Title</Label>
                <Input value={cv.expTitle} onChange={e => upd("expTitle", e.target.value)} className="text-sm" />
            </div>
            <Separator />
            <div className="space-y-2">
                {cv.jobs.map(job => (
                    <div
                        key={job.id}
                        className="flex items-center gap-2 rounded-md border px-3 py-2.5 cursor-pointer hover:bg-accent/50 transition-colors group"
                        onClick={() => onSelectJob(job.id)}
                    >
                        <Briefcase className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                        <span className="flex-1 text-sm truncate">{job.title || "Untitled job"}</span>
                        <ChevronRight className="h-3.5 w-3.5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                ))}
                <Button variant="outline" size="sm" className="w-full border-dashed" onClick={addJob}>
                    <Plus className="h-3.5 w-3.5 mr-1.5" /> Add job
                </Button>
            </div>
        </div>
    );
}

function ProjectEditor({
    project,
    onUpdate,
    onRemove,
}: {
    project: Project;
    onUpdate: (patch: Partial<Project>) => void;
    onRemove: () => void;
}) {
    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <SectionHeader title="Project Entry" hint="Edit this project" />
                <Button
                    variant="ghost" size="sm"
                    className="text-destructive hover:bg-destructive/10 -mt-2 shrink-0"
                    onClick={onRemove}
                >
                    <Trash2 className="h-3.5 w-3.5 mr-1.5" /> Remove
                </Button>
            </div>
            <div className="space-y-1.5">
                <Label className="text-xs font-medium">Project Name</Label>
                <Input
                    value={project.name}
                    onChange={e => onUpdate({ name: e.target.value })}
                    className="text-sm"
                    placeholder="My Project"
                />
            </div>
            <div className="space-y-1.5">
                <Label className="text-xs font-medium">Description</Label>
                <Textarea
                    value={project.description}
                    onChange={e => onUpdate({ description: e.target.value })}
                    rows={2}
                    className="text-sm resize-none"
                    placeholder="What does it do…"
                />
            </div>
            <div className="space-y-1.5">
                <Label className="text-xs font-medium">Links</Label>
                <LinkListEditor
                    links={project.links}
                    onChange={links => onUpdate({ links })}
                />
            </div>
            <div className="space-y-1.5">
                <Label className="text-xs font-medium">Bullet Points</Label>
                <BulletListEditor
                    bullets={project.bullets}
                    onChange={bullets => onUpdate({ bullets })}
                />
            </div>
        </div>
    );
}

function AllProjectsEditor({
    cv, upd, addProject, removeProject, updateProject, onSelectProject
}: {
    cv: CVData;
    upd: <K extends keyof CVData>(k: K, v: CVData[K]) => void;
    addProject: () => void;
    removeProject: (id: string) => void;
    updateProject: (id: string, patch: Partial<Project>) => void;
    onSelectProject: (id: string) => void;
}) {
    return (
        <div className="space-y-4">
            <SectionHeader title="Projects" hint="Manage your projects — click an entry to edit" />
            <div className="space-y-1.5">
                <Label className="text-xs font-medium">Section Title</Label>
                <Input value={cv.projTitle} onChange={e => upd("projTitle", e.target.value)} className="text-sm" />
            </div>
            <Separator />
            <div className="space-y-2">
                {cv.projects.map(proj => (
                    <div
                        key={proj.id}
                        className="flex items-center gap-2 rounded-md border px-3 py-2.5 cursor-pointer hover:bg-accent/50 transition-colors group"
                        onClick={() => onSelectProject(proj.id)}
                    >
                        <FolderOpen className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                        <span className="flex-1 text-sm truncate">{proj.name || "Untitled project"}</span>
                        <ChevronRight className="h-3.5 w-3.5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                ))}
                <Button variant="outline" size="sm" className="w-full border-dashed" onClick={addProject}>
                    <Plus className="h-3.5 w-3.5 mr-1.5" /> Add project
                </Button>
            </div>
        </div>
    );
}

function EducationEditor({
    cv, upd, addSimple, removeSimple, updateSimple
}: {
    cv: CVData;
    upd: <K extends keyof CVData>(k: K, v: CVData[K]) => void;
    addSimple: (f: "education" | "languages") => void;
    removeSimple: (f: "education" | "languages", id: string) => void;
    updateSimple: (f: "education" | "languages", id: string, text: string) => void;
}) {
    return (
        <div className="space-y-4">
            <SectionHeader title="Education" />
            <div className="space-y-1.5">
                <Label className="text-xs font-medium">Section Title</Label>
                <Input value={cv.eduTitle} onChange={e => upd("eduTitle", e.target.value)} className="text-sm" />
            </div>
            <Separator />
            <SimpleListEditor
                items={cv.education}
                onChange={items => {
                    items.forEach(item => {
                        const original = cv.education.find(e => e.id === item.id);
                        if (original && original.text !== item.text) updateSimple("education", item.id, item.text);
                    });
                    // Handle adds/removes by passing whole list
                    upd("education", items);
                }}
                placeholder="Degree from University, City (Year – Year)"
            />
        </div>
    );
}

function LanguagesEditor({
    cv, upd
}: {
    cv: CVData;
    upd: <K extends keyof CVData>(k: K, v: CVData[K]) => void;
}) {
    return (
        <div className="space-y-4">
            <SectionHeader title="Languages" />
            <div className="space-y-1.5">
                <Label className="text-xs font-medium">Section Title</Label>
                <Input value={cv.langTitle} onChange={e => upd("langTitle", e.target.value)} className="text-sm" />
            </div>
            <Separator />
            <SimpleListEditor
                items={cv.languages}
                onChange={items => upd("languages", items)}
                placeholder="Language (Proficiency)"
            />
        </div>
    );
}

/* ══════════════════════════════════════════════════════
   TREE DATA BUILDER
══════════════════════════════════════════════════════ */

function buildTreeData(cv: CVData): TreeDataItem[] {
    return [
        { id: "personal", name: "Personal Info", icon: User },
        { id: "links", name: "Links", icon: Link2 },
        { id: "summary", name: "Summary", icon: FileText },
        {
            id: "skills", name: "Skills", icon: Wrench,
        },
        {
            id: "experience", name: "Work Experience", icon: Briefcase,
            children: cv.jobs.map(job => ({
                id: `job-${job.id}`,
                name: job.title || "Untitled",
                icon: Briefcase,
            })),
        },
        {
            id: "projects", name: "Projects", icon: FolderOpen,
            children: cv.projects.map(proj => ({
                id: `proj-${proj.id}`,
                name: proj.name || "Untitled",
                icon: FolderOpen,
            })),
        },
        { id: "education", name: "Education", icon: GraduationCap },
        { id: "languages", name: "Languages", icon: Languages },
    ];
}

/* ══════════════════════════════════════════════════════
   EDITOR PANEL (main export)
══════════════════════════════════════════════════════ */

interface EditorPanelProps {
    cv: CVData;
    setCV: React.Dispatch<React.SetStateAction<CVData>>;
    upd: <K extends keyof CVData>(k: K, v: CVData[K]) => void;
    addSkill: () => void;
    removeSkill: (id: string) => void;
    updateSkill: (id: string, patch: Partial<Skill>) => void;
    addJob: () => void;
    removeJob: (id: string) => void;
    updateJob: (id: string, patch: Partial<Job>) => void;
    addProject: () => void;
    removeProject: (id: string) => void;
    updateProject: (id: string, patch: Partial<Project>) => void;
    addSimple: (f: "education" | "languages") => void;
    removeSimple: (f: "education" | "languages", id: string) => void;
    updateSimple: (f: "education" | "languages", id: string, text: string) => void;
    isExporting: boolean;
    onExportPDF: () => void;
    onExportPNG: () => void;
}

export function EditorPanel({
    cv, setCV, upd,
    addSkill, removeSkill, updateSkill,
    addJob, removeJob, updateJob,
    addProject, removeProject, updateProject,
    addSimple, removeSimple, updateSimple,
    isExporting, onExportPDF, onExportPNG,
}: EditorPanelProps) {
    const [selectedId, setSelectedId] = useState<string>("personal");

    const treeData = buildTreeData(cv);

    const handleSelect = (item: TreeDataItem | undefined) => {
        if (item) setSelectedId(item.id);
    };

    /* ── Resolve the selected context ── */
    const isJob = selectedId.startsWith("job-");
    const isProj = selectedId.startsWith("proj-");
    const jobId = isJob ? selectedId.replace("job-", "") : null;
    const projId = isProj ? selectedId.replace("proj-", "") : null;
    const selectedJob = jobId ? cv.jobs.find(j => j.id === jobId) : null;
    const selectedProj = projId ? cv.projects.find(p => p.id === projId) : null;

    /* ── Navigate to a specific item from list views ── */
    const onSelectJob = (id: string) => setSelectedId(`job-${id}`);
    const onSelectProject = (id: string) => setSelectedId(`proj-${id}`);

    const renderDetail = () => {
        if (isJob && selectedJob) {
            return (
                <JobEditor
                    job={selectedJob}
                    onUpdate={patch => updateJob(selectedJob.id, patch)}
                    onRemove={() => { removeJob(selectedJob.id); setSelectedId("experience"); }}
                />
            );
        }
        if (isProj && selectedProj) {
            return (
                <ProjectEditor
                    project={selectedProj}
                    onUpdate={patch => updateProject(selectedProj.id, patch)}
                    onRemove={() => { removeProject(selectedProj.id); setSelectedId("projects"); }}
                />
            );
        }
        switch (selectedId) {
            case "personal":
                return <PersonalInfoEditor cv={cv} upd={upd} />;
            case "links":
                return <LinksEditor cv={cv} upd={upd} />;
            case "summary":
                return <SummaryEditor cv={cv} upd={upd} />;
            case "skills":
                return (
                    <SkillsEditor
                        cv={cv} upd={upd}
                        addSkill={addSkill}
                        removeSkill={removeSkill}
                        updateSkill={updateSkill}
                    />
                );
            case "experience":
                return (
                    <AllJobsEditor
                        cv={cv} upd={upd}
                        addJob={() => { addJob(); }}
                        removeJob={removeJob}
                        updateJob={updateJob}
                        onSelectJob={onSelectJob}
                    />
                );
            case "projects":
                return (
                    <AllProjectsEditor
                        cv={cv} upd={upd}
                        addProject={addProject}
                        removeProject={removeProject}
                        updateProject={updateProject}
                        onSelectProject={onSelectProject}
                    />
                );
            case "education":
                return (
                    <EducationEditor
                        cv={cv} upd={upd}
                        addSimple={addSimple}
                        removeSimple={removeSimple}
                        updateSimple={updateSimple}
                    />
                );
            case "languages":
                return <LanguagesEditor cv={cv} upd={upd} />;
            default:
                return null;
        }
    };

    return (
        <div className="flex flex-col h-full bg-background border-l">
            {/* ── Header ── */}
            <div className="px-4 py-3 border-b flex items-center justify-between shrink-0">
                <div>
                    <p className="text-sm font-semibold">CV Editor</p>
                    <p className="text-xs text-muted-foreground">Select a section to edit</p>
                </div>
                <div className="flex gap-2">
                    <AIAssistantDialog cv={cv} setCV={setCV} />
                    <Button
                        size="sm"
                        onClick={onExportPDF}
                        disabled={isExporting}
                        className="bg-[#4ecdc4] hover:bg-[#3ab8b0] text-white text-xs h-8"
                    >
                        {isExporting ? "Exporting…" : "↓ PDF"}
                    </Button>
                    <Button
                        size="sm" variant="secondary"
                        onClick={onExportPNG}
                        disabled={isExporting}
                        className="text-xs h-8"
                    >
                        {isExporting ? "…" : "↓ PNG"}
                    </Button>
                </div>
            </div>

            {/* ── Body: resizable tree + detail ── */}
            <div className="flex-1 overflow-hidden">
                <ResizablePanelGroup orientation="horizontal" className="h-full">

                    {/* Tree navigation */}
                    <ResizablePanel defaultSize="32%" minSize="20%" maxSize="50%">
                        <div className="flex flex-col h-full border-r bg-muted/20">
                            <p className="px-3 pt-3 pb-1 text-[10px] uppercase tracking-widest font-semibold text-muted-foreground shrink-0">
                                Sections
                            </p>
                            <ScrollArea className="flex-1">
                                <TreeView
                                    data={treeData}
                                    initialSelectedItemId={selectedId}
                                    onSelectChange={handleSelect}
                                    expandAll
                                    className="text-sm"
                                />
                            </ScrollArea>
                        </div>
                    </ResizablePanel>

                    <ResizableHandle withHandle />

                    {/* Detail editor */}
                    <ResizablePanel defaultSize="68%" minSize="50%">
                        <ScrollArea className="h-full">
                            <div className="p-5">
                                {renderDetail()}
                            </div>
                        </ScrollArea>
                    </ResizablePanel>

                </ResizablePanelGroup>
            </div>
        </div>
    );
}
