import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { KeyRoundIcon } from "lucide-react";
import React from "react";

function UpdatePassword() {
  return (
    <Dialog>
      <Button asChild className="w-full flex gap-2">
        <DialogTrigger>
          <KeyRoundIcon /> Change Password
        </DialogTrigger>
      </Button>
      <DialogContent>
        <Button>ss</Button>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>This action cannot be undone. This will permanently delete your account and remove your data from our servers.</DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

export default UpdatePassword;
