import React from "react";
import { Drawer, DrawerClose, DrawerContent, DrawerTrigger } from "./ui/drawer";

function FloatingMenu() {
  return (
    <div className="absolute bottom-5 right-4 md:hidden">
      <Drawer>
        <DrawerTrigger>Open</DrawerTrigger>
        <DrawerContent>
          <div className="flex flex-col gap-3 p-5">
            <div className="hover:bg-primary/35 w-full text-center">Main</div>
          </div>
          <DrawerClose>s</DrawerClose>
        </DrawerContent>
      </Drawer>
    </div>
  );
}

export default FloatingMenu;
