"use client";

import { useState } from "react";
import Link from "next/link";
import { useScrollDirection } from "@/hooks/use-scroll-direction";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { sidebarNavItems } from "@/lib/config";

export function MobileSubNav() {
  const [open, setOpen] = useState(false);
  const scrollDirection = useScrollDirection();

  return (
    <div
      className={cn(
        "lg:hidden sticky top-[68px] z-40 transition-all duration-300 ease-in-out",
        scrollDirection === "down"
          ? "-translate-y-full "
          : "translate-y-0",
      )}
    >
      <div className="flex h-14 items-center px-4 pb-4">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button
              variant={"outline"}
              className="w-max mt-5 mx-auto bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 rounded-full px-4 font-normal hover:bg-transparent hover:underline shadow-sm border-muted-foreground/20"
            >
              <span>تصفح الأقسام</span>
              <ChevronDown className="h-4 w-4 opacity-50" />
            </Button>
          </SheetTrigger>
          <SheetContent side="bottom" className="h-[80vh] rounded-t-xl">
            <SheetHeader className="text-right mb-4">
              <SheetTitle>الأقسام</SheetTitle>
            </SheetHeader>
            <div className="flex flex-col gap-1 overflow-y-auto pb-6">
              {sidebarNavItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "flex items-center gap-2 px-2 py-3 text-right font-medium hover:bg-muted/50 rounded-md transition-colors",
                  )}
                >
                  <item.icon className="h-5 w-5 text-muted-foreground" />
                  <span>{item.title}</span>
                </Link>
              ))}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
}
