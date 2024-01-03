"use client";
import AppWrapper from "@/components/app-wrapper";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import useAuth from "@/hooks/useAuth";
import UserService from "@/services/user/user.service";
import React, { useEffect } from "react";

function ProfilePage() {
  const user = useAuth();
  const fetchData = async () => {
    await UserService.getAll();
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <AppWrapper className="bg-blue-200 flex flex-col items-center py-5">
      <Avatar className="w-20 h-20 bg-red-200">
        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <div>a</div>
    </AppWrapper>
  );
}

export default ProfilePage;
