"use client";
import React from "react";
import AppWrapper from "@/components/app-wrapper";
import Link from "next/link";
import styles from "@/components/styles.module.scss";
import { useTheme } from "next-themes";

function Navbar() {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };
  return (
    <nav className="sticky top-0 z-30 w-full border-b border-border h-14 backdrop-blur-sm">
      <AppWrapper className="flex justify-between items-center h-full">
        <Link href="/" className="text-primary font-bold text-4xl">
          &apos;M&apos;
        </Link>
        <div className="flex gap-10 items-center">
          <div className="hidden md:flex md:items-center gap-10">
            <Link href="/" className="hover:text-primary transition-colors">
              Main
            </Link>
            <Link href="/" className="hover:text-primary transition-colors">
              Blog
            </Link>
            <Link href="/" className="hover:text-primary transition-colors">
              Works
            </Link>
            <Link href="/" className="hover:text-primary transition-colors">
              Experience
            </Link>
            <Link href="/" className="hover:text-primary transition-colors">
              Contact
            </Link>
          </div>
          <input
            id="toggle"
            className={styles.toggle}
            type="checkbox"
            onChange={() => {
              toggleTheme();
            }}
          />
        </div>
      </AppWrapper>
    </nav>
  );
}

export default Navbar;
