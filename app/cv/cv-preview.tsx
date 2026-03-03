"use client";

import React from "react";
import type { CVData, Link } from "./types";

/* ── Teal accent colour used throughout ── */
const TEAL = "#4ecdc4";

/* ══════════════════════════════════════════════════════
   CV PREVIEW – pixel-perfect A4 sheet (read-only)
   Matches the reference PNG exactly.
══════════════════════════════════════════════════════ */

interface CVPreviewProps {
    cv: CVData;
    cvRef: React.RefObject<HTMLDivElement>;
}

function PreviewLink({ link, separator }: { link: Link; separator?: boolean }) {
    return (
        <span style={{ display: "inline-flex", alignItems: "center" }}>
            {separator && <span style={{ color: "#9ca3af", margin: "0 3px" }}>|</span>}
            <a href={link.href} style={{ color: TEAL, textDecoration: "underline", fontSize: 12 }}>
                {link.label}
            </a>
        </span>
    );
}

export function CVPreview({ cv, cvRef }: CVPreviewProps) {
    return (
        <>
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
        .cv-sheet-preview *, .cv-sheet-preview *::before, .cv-sheet-preview *::after { box-sizing: border-box; }
        .cv-sheet-preview {
          font-family: 'Inter', sans-serif;
          width: 794px;
          height: 1123px;
          overflow: hidden;
          background: #fff;
          padding: 40px 52px 52px;
          color: #374151;
          position: relative;
        }
        /* Header */
        .cp-header { padding-bottom: 16px; border-bottom: 2.5px solid ${TEAL}; margin-bottom: 20px; }
        .cp-header-top { display: flex; justify-content: space-between; align-items: flex-start; gap: 20px; }
        .cp-name { font-size: 26px; font-weight: 800; color: #111; margin: 0; line-height: 1.15; letter-spacing: -.3px; }
        .cp-title { font-size: 15px; font-weight: 600; color: ${TEAL}; margin: 4px 0 0; }
        .cp-contact { text-align: right; font-size: 12px; color: #555; line-height: 1.9; flex-shrink: 0; }
        .cp-contact-links { margin-top: 3px; display: flex; align-items: center; justify-content: flex-end; flex-wrap: wrap; gap: 2px; }
        .cp-summary { margin-top: 14px; font-size: 12.5px; line-height: 1.7; color: #374151; }
        /* Section */
        .cp-section { margin-bottom: 18px; }
        .cp-section-h2 { font-size: 11.5px; font-weight: 700; text-transform: uppercase; letter-spacing: .7px; color: ${TEAL}; margin: 0 0 5px; }
        .cp-divider { height: 1px; background: #e5e7eb; margin-bottom: 9px; }
        /* Skills */
        .cp-skills-row { font-size: 12.5px; line-height: 1.85; color: #374151; margin: 0; }
        .cp-skill-label { font-weight: 700; color: #111; }
        /* Block */
        .cp-block { margin-bottom: 14px; }
        .cp-block:last-child { margin-bottom: 0; }
        .cp-block-title { font-size: 13px; font-weight: 700; color: #111; margin: 0 0 5px; line-height: 1.3; display: flex; flex-wrap: wrap; align-items: center; gap: 4px; }
        .cp-block-desc { font-size: 12px; line-height: 1.65; color: #374151; margin: 3px 0 5px; }
        /* Lists */
        .cp-ul { margin: 3px 0 0; padding-left: 18px; list-style: disc; }
        .cp-li { font-size: 12px; line-height: 1.7; color: #374151; }
        .cp-plain { font-size: 12px; line-height: 1.7; color: #374151; margin: 0; }
        /* Print / export cleanup */
        @media print { .cv-sheet-preview { box-shadow: none !important; } }
        .cv-exporting .cv-sheet-preview { box-shadow: none !important; }
      `}</style>

            <div ref={cvRef} className="cv-sheet-preview">

                {/* ── HEADER ── */}
                <header className="cp-header">
                    <div className="cp-header-top">
                        <div>
                            <h1 className="cp-name">{cv.name}</h1>
                            <p className="cp-title">{cv.titleLine}</p>
                        </div>
                        <div className="cp-contact">
                            <div>{cv.phone}</div>
                            <div>{cv.location}</div>
                            <div>{cv.email}</div>
                            <div className="cp-contact-links">
                                {cv.links.map((lnk, i) => (
                                    <PreviewLink key={lnk.id} link={lnk} separator={i > 0} />
                                ))}
                            </div>
                        </div>
                    </div>
                    <p className="cp-summary">{cv.summary}</p>
                </header>

                {/* ── SKILLS ── */}
                <section className="cp-section">
                    <h2 className="cp-section-h2">{cv.skillsTitle}</h2>
                    <div className="cp-divider" />
                    {cv.skills.map(skill => (
                        <p key={skill.id} className="cp-skills-row">
                            <span className="cp-skill-label">{skill.label}:</span>{" "}
                            {skill.value}
                        </p>
                    ))}
                </section>

                {/* ── WORK EXPERIENCE ── */}
                <section className="cp-section">
                    <h2 className="cp-section-h2">{cv.expTitle}</h2>
                    <div className="cp-divider" />
                    {cv.jobs.map(job => (
                        <div key={job.id} className="cp-block">
                            <h3 className="cp-block-title">{job.title}</h3>
                            <ul className="cp-ul">
                                {job.bullets.map(b => (
                                    <li key={b.id} className="cp-li">{b.text}</li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </section>

                {/* ── FEATURED PROJECTS ── */}
                <section className="cp-section">
                    <h2 className="cp-section-h2">{cv.projTitle}</h2>
                    <div className="cp-divider" />
                    {cv.projects.map(proj => (
                        <div key={proj.id} className="cp-block">
                            <h3 className="cp-block-title">
                                <span>{proj.name}</span>
                                {proj.links.map((lnk, i) => (
                                    <span key={lnk.id} style={{ display: "inline-flex", alignItems: "center" }}>
                                        <span style={{ color: "#9ca3af", margin: "0 3px" }}>{i === 0 ? "-" : "|"}</span>
                                        <a href={lnk.href} style={{ color: TEAL, textDecoration: "underline", fontSize: 13 }}>
                                            {lnk.label}
                                        </a>
                                    </span>
                                ))}
                            </h3>
                            <p className="cp-block-desc">{proj.description}</p>
                            <ul className="cp-ul">
                                {proj.bullets.map(b => (
                                    <li key={b.id} className="cp-li">{b.text}</li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </section>

                {/* ── EDUCATION ── */}
                {cv.education.length > 0 && (
                    <section className="cp-section">
                        <h2 className="cp-section-h2">{cv.eduTitle}</h2>
                        <div className="cp-divider" />
                        {cv.education.map(e => (
                            <p key={e.id} className="cp-plain">{e.text}</p>
                        ))}
                    </section>
                )}

                {/* ── LANGUAGES ── */}
                {cv.languages.length > 0 && (
                    <section className="cp-section">
                        <h2 className="cp-section-h2">{cv.langTitle}</h2>
                        <div className="cp-divider" />
                        <ul className="cp-ul">
                            {cv.languages.map(l => (
                                <li key={l.id} className="cp-li">{l.text}</li>
                            ))}
                        </ul>
                    </section>
                )}

            </div>
        </>
    );
}
