import AppWrapper from "@/components/app-wrapper";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import React from "react";

function ProfilePage() {
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
