import { uid, makeBullet, makeLink, type CVData } from "./types";

/* ══════════════════════════════════════════════════════
   DEFAULT CV DATA
══════════════════════════════════════════════════════ */
export function mkInitial(): CVData {
    return {
        name: "OMAR CHATIN ABDULKAREEM",
        titleLine: "Front End Web Developer",
        phone: "+964 771 069 7645",
        location: "Kirkuk, Iraq",
        email: "omerchetin19@gmail.com",
        links: [
            makeLink("LinkedIn", "https://linkedin.com/in/omerchetin"),
            makeLink("GitHub", "https://github.com/omerchetin"),
            makeLink("Website", "https://omerchetin.com"),
        ],
        summary:
            "Frontend developer with 4+ years of experience building SaaS platforms and dashboards using React, Next.js, and TypeScript. Strong full-stack foundation with hands-on backend experience in Node/Bun, Express, Elysia, and PostgreSQL – enabling better collaboration with backend teams and rapid prototyping.",
        skillsTitle: "Skills & Technologies",
        skills: [
            { id: uid(), label: "Frontend", value: "React, Next.js, SvelteKit, Vite, TypeScript, TailwindCSS, shadcn/ui, Framer Motion" },
            { id: uid(), label: "Backend", value: "Node.js, Bun, Express, Elysia.js, Prisma, PostgreSQL, REST APIs" },
            { id: uid(), label: "Mobile", value: "React Native, Expo" },
            { id: uid(), label: "Tools", value: "Git & Github, Vim, Neovim, Figma, Trello, Notion" },
        ],
        expTitle: "Work Experience",
        jobs: [
            {
                id: uid(),
                title: "Founder & Lead Developer | Kitly (2024-2025)",
                bullets: [
                    makeBullet("Architected and launched a multi-tenant SaaS platform serving 5+ restaurants with custom domains, real-time dashboards, and 99%+ uptime"),
                    makeBullet("Built a comprehensive ecosystem: admin console for platform management, React Native mobile app, Next.js customer portal with SEO optimization"),
                    makeBullet("Implemented automated multi-tenant infrastructure with performance monitoring and analytics integration."),
                    makeBullet("Built an admin console for platform management to handle multi-tenant configurations and analytics."),
                    makeBullet("Tech stack: Next.js, React Native, TypeScript, Express, Prisma, PostgreSQL"),
                ],
            },
            {
                id: uid(),
                title: "Frontend Web Developer | Qasah (2021 - 2025)",
                bullets: [
                    makeBullet("Led frontend development of B2B SaaS platforms for business intelligence"),
                    makeBullet("Designed UI in Figma and built responsive dashboards with complex data visualization"),
                    makeBullet("Implemented GraphQL integrations and REST API connections"),
                    makeBullet("Collaborated with backend team optimizing app performance"),
                    makeBullet("Tech stack: Next.js, TypeScript, TailwindCSS, GraphQL, Figma"),
                ],
            },
        ],
        projTitle: "Featured Projects",
        projects: [
            {
                id: uid(),
                name: "Rasil - Multi-Tenant SaaS Platform",
                links: [makeLink("rasil.store", "https://rasil.store")],
                description: "A localized SaaS platform enabling social media sellers in Iraq to launch branded online stores instantly.",
                bullets: [
                    makeBullet("Architected multi-tenant backend (Bun/ElysiaJS) with automated subdomains and global auth."),
                    makeBullet("Integrated AI services for automated 4-language translation and smart theme generation with ai."),
                    makeBullet("Engineered flexible inventory system with JSON variants, RBAC, and subscription logic."),
                    makeBullet("Built workflows for WhatsApp integration, dynamic SEO, and Cash-on-Delivery logistics."),
                ],
            },
            {
                id: uid(),
                name: "Analytics Dashboard",
                links: [
                    makeLink("github", "https://github.com/omerchetin"),
                    makeLink("dashboard-om-1.netlify.app", "https://dashboard-om-1.netlify.app"),
                ],
                description: "Responsive React dashboard with charts, tables, and dynamic filtering for business analytics",
                bullets: [
                    makeBullet("Implemented complex data visualization with charts, tables, and filtering"),
                    makeBullet("Built reusable UI components and a consistent design system"),
                    makeBullet("Maintained a well-structured, scalable codebase following clean architecture principles"),
                ],
            },
        ],
        eduTitle: "Education",
        education: [
            { id: uid(), text: "Bachelor's degree in Dental Technology from Al-Kitab University, Kirkuk (2020 – 2024)" },
        ],
        langTitle: "Languages",
        languages: [
            { id: uid(), text: "Arabic (Native)" },
            { id: uid(), text: "English (Fluent)" },
            { id: uid(), text: "Turkish (Fluent)" },
        ],
    };
}
