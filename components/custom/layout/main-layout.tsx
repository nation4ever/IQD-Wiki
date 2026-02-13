import React from "react";
import MainNav from "./main-nav";
import { LeftSidebar } from "./left-sidebar";
import { RightSidebar } from "./right-sidebar";
import { MobileSubNav } from "./mobile-sub-nav";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-[1440px] mx-auto w-full">
        <MainNav />
        <MobileSubNav />
        <div className="flex gap-6 px-4 md:px-8">
          <RightSidebar />
          <main className="flex-1 min-w-0 ">{children}</main>
          <LeftSidebar />
        </div>
      </div>
    </div>
  );
}
