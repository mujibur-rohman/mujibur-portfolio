"use client";

import React from "react";
import styles from "@/components/styles.module.scss";
import AppWrapper from "@/components/app-wrapper";
import { useTheme } from "next-themes";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { LogOutIcon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import AuthService from "@/services/auth/auth.service";
import { useRouter } from "next/navigation";

function NavbarBack() {
  const { theme, setTheme } = useTheme();
  const router = useRouter();

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
          <div className="flex gap-4 items-center">
            <Button asChild className="text-white" size="sm">
              <Link href="/" target="_blank">
                View Portfolio
              </Link>
            </Button>
            <input
              id="toggle"
              className={styles.toggle}
              type="checkbox"
              onChange={() => {
                toggleTheme();
              }}
            />
            <Button
              variant="ghost"
              size="icon"
              onClick={async () => {
                const auth = new AuthService();
                await auth.logout();
                router.replace("/gate");
              }}
            >
              <LogOutIcon />
            </Button>
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
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
