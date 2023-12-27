"use client";

import React from "react";
import styles from "@/components/styles.module.scss";
import AppWrapper from "@/components/app-wrapper";
import { useTheme } from "next-themes";
import Link from "next/link";
import { Button } from "@/components/ui/button";

function NavbarBack() {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };
  return (
    <nav className="sticky top-0 z-30 w-full border-b border-border backdrop-blur-sm">
      <AppWrapper className="flex flex-col">
        <div className="flex justify-between items-center h-14">
          <Link href="/manage" className="text-primary font-bold text-4xl">
            &apos;M&apos;
          </Link>
          <div className="flex gap-10 items-center">
            <Button asChild className="text-white" size="sm">
              Go To Portfolio
            </Button>
            <input
              id="toggle"
              className={styles.toggle}
              type="checkbox"
              onChange={() => {
                toggleTheme();
              }}
            />
          </div>
        </div>
        <div className="mt-3 flex">
          <Link href="/manage/dashboard" className="py-2 px-5 border-b border-primary">
            Dashboard
          </Link>
          <Link href="/manage/dashboard" className="py-2 px-5 hover:border-b border-primary">
            Information
          </Link>
        </div>
      </AppWrapper>
    </nav>
  );
}

export default NavbarBack;
