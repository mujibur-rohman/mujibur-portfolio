"use client";
import { SessionProvider } from "next-auth/react";
import React from "react";

type Props = {
  children: JSX.Element;
};

function NextauthProvider({ children }: Props) {
  return <SessionProvider>{children}</SessionProvider>;
}

export default NextauthProvider;
