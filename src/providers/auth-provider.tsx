"use client";
import { User } from "@/services/user/user.types";
import React, { createContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import AuthService from "@/services/auth/auth.service";
import { useRouter } from "next/navigation";
import { decryptData } from "@/lib/crypto-encrypt";

export const AuthContext = createContext<User | null>(null);

function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    const auth = new AuthService();
    // * get user from cookie
    const user = Cookies.get("_user") as string;
    if (!user) {
      auth.logout();
      router.replace("/gate");
      return;
    }
    const currentUser = decryptData(user);
    setCurrentUser(JSON.parse(currentUser) as User);
  }, []);

  return <AuthContext.Provider value={currentUser}>{children}</AuthContext.Provider>;
}

export default AuthProvider;
