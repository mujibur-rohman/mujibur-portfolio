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
import { usePathname, useRouter } from "next/navigation";
import useAuth from "@/hooks/useAuth";
import { cn } from "@/lib/utils";

const MENU = [
  {
    id: "dashboard",
    name: "Dashboard",
  },
  {
    id: "blog",
    name: "My Write",
  },
];

function NavbarBack() {
  const { theme, setTheme } = useTheme();
  const router = useRouter();
  const session = useAuth();
  const pathname = usePathname();

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
            <Button asChild variant="ghost" size="sm">
              <Link href="/manage/profile" className="text-foreground">
                See My Profile
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
              <LogOutIcon className="text-foreground" />
            </Button>
            <Avatar>
              <AvatarImage src={session?.user?.avatar?.url} alt="@shadcn" />
              <AvatarFallback>{session?.user?.name}</AvatarFallback>
            </Avatar>
          </div>
        </div>
        <div className="mt-3 flex overflow-auto">
          {MENU.map((menu) => (
            <Link
              key={menu.id}
              href={`/manage/${menu.id}`}
              className={cn("py-2 px-5 border-primary text-foreground whitespace-nowrap", {
                "border-b": pathname.includes(menu.id),
              })}
            >
              {menu.name}
            </Link>
          ))}
        </div>
      </AppWrapper>
    </nav>
  );
}

export default NavbarBack;
