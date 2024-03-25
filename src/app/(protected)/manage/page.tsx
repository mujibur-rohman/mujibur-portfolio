"use client";
import { useSession } from "next-auth/react";
import React from "react";

function ManageHomePage() {
  const session = useSession();
  console.log(session);
  return <div>Home</div>;
}

export default ManageHomePage;
