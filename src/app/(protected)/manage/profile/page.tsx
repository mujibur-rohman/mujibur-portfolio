"use client";
import AppWrapper from "@/components/app-wrapper";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import useAuth from "@/hooks/useAuth";
import UserService from "@/services/user/user.service";
import { Edit2Icon } from "lucide-react";
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
    <AppWrapper className="flex flex-col items-center py-5">
      <Avatar className="w-20 h-20 relative">
        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
        <AvatarFallback>CN</AvatarFallback>
        <div className="absolute left-0 right-0 bottom-0 h-6 bg-black/50 flex justify-center items-center">
          <Edit2Icon className="w-4 h-4" />
        </div>
        <label htmlFor="avatar" className="absolute z-10 inset-0 cursor-pointer"></label>
        <input id="avatar" type="file" className="hidden" />
      </Avatar>
      <div className="mt-3 space-y-1">
        <p className="text-center">Admin</p>
        <p className="text-foreground/50 text-center">Mujay</p>
      </div>
    </AppWrapper>
  );
}

export default ProfilePage;
