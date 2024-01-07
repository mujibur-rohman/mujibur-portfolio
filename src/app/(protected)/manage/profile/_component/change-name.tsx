import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { EditIcon } from "lucide-react";
import React from "react";

function ChangeNameProfile() {
  return (
    <Dialog>
      <Button asChild className="w-full flex gap-2">
        <DialogTrigger>
          <EditIcon /> Change Name
        </DialogTrigger>
      </Button>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>This action cannot be undone. This will permanently delete your account and remove your data from our servers.</DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

export default ChangeNameProfile;
