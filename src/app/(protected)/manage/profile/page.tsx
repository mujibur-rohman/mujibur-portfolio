"use client";
import AppWrapper from "@/components/app-wrapper";
import useAuth from "@/hooks/useAuth";
import React, { useState } from "react";
import AvatarProfile from "./_component/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import ChangeNameProfile from "./_component/change-name";
import UpdatePassword from "./_component/update-password";

function ProfilePage() {
  const user = useAuth();
  const [modalName, setModalName] = useState(false);
  const [modalPassword, setModalPassword] = useState(false);

  if (!user?.user) {
    return (
      <div className="flex flex-col items-center py-5">
        <Skeleton className="h-20 w-20 rounded-full" />
        <div className="mt-3 space-y-1">
          <Skeleton className="h-4 w-[50px] mb-2" />
          <Skeleton className="h-4 w-[50px]" />
        </div>
      </div>
    );
  }

  return (
    <AppWrapper className="flex flex-col items-center py-5">
      <AvatarProfile />
      <div className="mt-3 space-y-1">
        <p className="text-center capitalize">{user?.user?.role}</p>
        <p className="text-foreground/50 text-center">{user?.user?.name}</p>
      </div>
      <div className="flex gap-3 mt-6">
        <ChangeNameProfile defaultName={user?.user?.name} setOpen={setModalName} isOpen={modalName} />
        <UpdatePassword isOpen={modalPassword} setOpen={setModalPassword} />
      </div>
    </AppWrapper>
  );
}

export default ProfilePage;
