import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { sidebarNavItems } from "@/lib/config";

export function LeftSidebar() {
  return (
    <aside className="hidden lg:block w-64 shrink-0 sticky top-20 h-[calc(100vh-5rem)] overflow-y-auto py-6 pr-6 pl-2 border-r">
      <div className="flex flex-col gap-4">
        <h3 className="font-semibold text-lg px-2">تصفح الأقسام</h3>
        <nav className="flex flex-col gap-1">
          {sidebarNavItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                buttonVariants({ variant: "ghost", size: "sm" }),
                "justify-start gap-2 px-2 text-right font-normal hover:bg-muted/50",
              )}
            >
              <item.icon className="h-4 w-4" />
              <span>{item.title}</span>
            </Link>
          ))}
        </nav>
      </div>
    </aside>
  );
}
