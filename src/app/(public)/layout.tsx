import FloatingMenu from "@/app/(public)/components/floating-menu";
import Navbar from "@/app/(public)/components/navbar";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Management Portfolio",
  description: "Manage portfolio website",
};

export default function ManagementLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="relative min-h-screen flex flex-col" id="layout">
      <Navbar />
      <FloatingMenu />
      <div className="flex-grow">{children}</div>
    </main>
  );
}
