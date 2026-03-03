import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "CV Builder | صانع السيرة الذاتية",
    description:
        "Free online CV builder. Click any text to edit, add or remove bullet points, and export as PDF or PNG. أداة مجانية لإنشاء السيرة الذاتية.",
    keywords: [
        "CV builder",
        "resume builder",
        "online CV",
        "free resume",
        "سيرة ذاتية",
        "IQD Wiki",
        "cv maker",
    ],
    openGraph: {
        title: "CV Builder — IQD Wiki",
        description:
            "Free online CV builder. Edit, customize, and export your resume as PDF or PNG.",
        url: "https://iqdwiki.com/cv",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "CV Builder — IQD Wiki",
        description:
            "Free online CV builder. Edit, customize, and export your resume as PDF or PNG.",
    },
    alternates: {
        canonical: "https://iqdwiki.com/cv",
    },
};

export default function CVLayout({ children }: { children: React.ReactNode }) {
    return <div dir="ltr">{children}</div>;
}
