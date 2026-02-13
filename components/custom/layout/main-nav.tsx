"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu, Github, Globe } from "lucide-react";
import { ModeToggle } from "@/components/mode-toggle";
import { Separator } from "@/components/ui/separator";

export default function MainNav() {
  const [open, setOpen] = useState(false);
  return (
    <nav className="flex w-full sticky top-0 z-50 justify-between items-center p-4 bg-background md:bg-background/80 backdrop-blur-md border-b">
      <Link href="/">
        <Image
          src="/logo.webp"
          alt="IQD Wiki Logo"
          width={40}
          height={40}
          className="rounded-full"
        />
      </Link>

      <div className="flex items-center gap-2">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Open menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-full sm:w-[400px]">
            <SheetHeader className="text-right">
              <SheetTitle className="flex items-center gap-2 justify-end">
                <span className="font-bold text-lg">IQD Wiki</span>
                <Image
                  src="/logo.webp"
                  alt="IQD Wiki Logo"
                  width={30}
                  height={30}
                  className="rounded-full"
                />
              </SheetTitle>
            </SheetHeader>
            <div className="flex flex-col gap-6 py-6 px-4">
              <div className="flex flex-col gap-2">
                <h3 className="text-sm font-medium text-muted-foreground text-right px-2">
                  التصفح
                </h3>
                <div className="flex flex-col space-y-1">
                  <Link
                    href="/"
                    onClick={() => setOpen(false)}
                    className="flex items-center justify-end px-2 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground rounded-md"
                  >
                    الرئيسية
                  </Link>
                  <Link
                    href="/markdown"
                    onClick={() => setOpen(false)}
                    className="flex items-center justify-end px-2 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground rounded-md"
                  >
                    محرر Markdown
                  </Link>
                </div>
              </div>
              <Separator />
              <div className="flex flex-col gap-2">
                <h3 className="text-sm font-medium text-muted-foreground text-right px-2">
                  المجتمع
                </h3>
                <div className="flex flex-col space-y-1">
                  <a
                    href="https://www.reddit.com/r/iraq_developers/"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-end gap-2 px-2 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground rounded-md"
                  >
                    <span>r/iraq_developers</span>
                    <Globe className="h-4 w-4" />
                  </a>
                  <a
                    href="https://github.com/iraq-developers"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-end gap-2 px-2 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground rounded-md"
                  >
                    <span>GitHub</span>
                    <Github className="h-4 w-4" />
                  </a>
                </div>
              </div>

              <Separator />

              <div className="flex flex-col gap-3">
                <h3 className="text-sm font-medium text-muted-foreground text-right px-2">
                  الإعدادات
                </h3>
                <div className="flex items-center justify-between px-2 py-2 border rounded-md bg-card">
                  <ModeToggle />
                  <span className="text-sm font-medium">المظهر</span>
                </div>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
}
