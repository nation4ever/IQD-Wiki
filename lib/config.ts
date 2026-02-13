import {
  Code,
  ShieldCheck,
  BookOpen,
  Smartphone,
  Terminal,
  Server,
  Database,
  Globe,
  LucideIcon,
} from "lucide-react";

export interface NavItem {
  title: string;
  href: string;
  icon: LucideIcon;
}

export const sidebarNavItems: NavItem[] = [
  {
    title: "برمجة المواقع",
    href: "/web-development",
    icon: Globe,
  },
  {
    title: "أمن المعلومات",
    href: "/cyber-security",
    icon: ShieldCheck,
  },
  {
    title: "أساسيات البرمجة",
    href: "/fund-programming",
    icon: Code,
  },
  {
    title: "تطوير تطبيقات الموبايل",
    href: "/mobile-development",
    icon: Smartphone,
  },
  {
    title: "قواعد البيانات",
    href: "/databases",
    icon: Database,
  },
  {
    title: "DevOps",
    href: "/devops",
    icon: Server,
  },
  {
    title: "سطر الأوامر",
    href: "/command-line",
    icon: Terminal,
  },
  {
    title: "مصادر تعلم",
    href: "/resources",
    icon: BookOpen,
  },
];
