/* ══════════════════════════════════════════════════════
   CV TYPES & UID HELPER
══════════════════════════════════════════════════════ */

export interface Link {
    id: string;
    label: string;
    href: string;
}

export interface Bullet {
    id: string;
    text: string;
}

export interface Skill {
    id: string;
    label: string;
    value: string;
}

export interface Job {
    id: string;
    title: string;
    bullets: Bullet[];
}

export interface Project {
    id: string;
    name: string;
    links: Link[];
    description: string;
    bullets: Bullet[];
}

export interface Simple {
    id: string;
    text: string;
}

export interface CVData {
    name: string;
    titleLine: string;
    phone: string;
    location: string;
    email: string;
    links: Link[];
    summary: string;
    skillsTitle: string;
    skills: Skill[];
    expTitle: string;
    jobs: Job[];
    projTitle: string;
    projects: Project[];
    eduTitle: string;
    education: Simple[];
    langTitle: string;
    languages: Simple[];
}

let _n = 0;
export const uid = () => `${++_n}`;
export const makeBullet = (text: string): Bullet => ({ id: uid(), text });
export const makeLink = (label: string, href: string): Link => ({ id: uid(), label, href });
