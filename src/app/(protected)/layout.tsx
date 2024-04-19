import type { Metadata } from "next";
import NavbarBack from "./components/navbar-back";

export const metadata: Metadata = {
  title: "Management Portfolio",
  description: "Manage portfolio website",
};

export default function ManagementLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="relative min-h-screen flex flex-col">
      <NavbarBack />
      <div className="flex-grow flex flex-col">{children}</div>
    </main>
  );
}
