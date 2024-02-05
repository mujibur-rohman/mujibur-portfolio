"use client";

import AppWrapper from "@/components/app-wrapper";
import { Button } from "@/components/ui/button";
import { ImageIcon } from "lucide-react";
import Image from "next/image";
import React from "react";

function CoverImage({ url }: { url?: string }) {
  return (
    <>
      {url ? (
        <Image priority className="h-[200px] md:h-[300px] 2xl:h-[400px] w-full object-cover object-center" alt="cover-image" width={500} height={300} src={url} />
      ) : (
        <AppWrapper>
          <div className="h-[50px] md:h-[60px] xl:h-[70px] flex items-center justify-end">
            <Button variant="secondary" size="sm" asChild>
              <label htmlFor="cover" className="flex gap-1 cursor-pointer">
                <ImageIcon className="w-4 h-4" /> <span>Upload Cover</span>
              </label>
            </Button>
            <input type="file" id="cover" className="hidden" />
          </div>
        </AppWrapper>
      )}
    </>
  );
}

export default CoverImage;
