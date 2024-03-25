import { UserRole } from "@prisma/client";
import NextAuth, { type DefaultSession } from "next-auth";
import { JWT } from "next-auth/jwt";

export type ExtendedUser = DefaultSession["user"] & {
  user: {
    id: number;
    uuid: string;
    name: string;
    email: string;
    password: string;
    role: string;
    token: string;
    createdAt: Date;
    updatedAt: Date;
    avatar: string | null;
  };
  accessToken: string;
  refreshToken: string;
};

declare module "next-auth" {
  interface Session extends User {
    user: {
      id: number;
      uuid: string;
      name: string;
      email: string;
      password: string;
      role: string;
      token: string;
      createdAt: Date;
      updatedAt: Date;
      avatar: string | null;
    };
    accessToken: string;
    refreshToken: string;
  }

  interface User extends ExtendedUser {}
}

declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT extends ExtendedUser {
    accessTokenExpires: number;
  }
}
