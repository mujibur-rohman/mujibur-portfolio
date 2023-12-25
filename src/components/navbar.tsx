import React from "react";
import AppWrapper from "./app-wrapper";
import Link from "next/link";

function Navbar() {
  return (
    <nav className="sticky top-0 z-30 w-full transition-all border-b border-gray-200 h-14 backdrop-blur-lg">
      <AppWrapper className="flex justify-between items-center h-full">
        <Link href="/" className="text-primary font-bold text-4xl">
          &apos;M&apos;
        </Link>
        <div></div>
      </AppWrapper>
    </nav>
  );
}

export default Navbar;
