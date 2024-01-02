"use client";

import useAuth from "@/hooks/useAuth";
import React from "react";

function ManageHomePage() {
  const { user } = useAuth();

  console.log(user);

  return <div>{user?.name}</div>;
}

export default ManageHomePage;
