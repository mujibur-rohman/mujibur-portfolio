import React from "react";
import AppWrapper from "@/components/app-wrapper";
import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { ImageIcon } from "lucide-react";
const Editor = dynamic(() => import("@/components/editor/editor"), { ssr: false });

function BlogPage() {
  return (
    <div>
      <div className="bg-primary/15">
        <AppWrapper className="flex justify-end py-2">
          <Button size="sm">Publish</Button>
        </AppWrapper>
      </div>
      {/* <Image
        priority
        className="h-[200px] md:h-[300px] 2xl:h-[400px] w-full object-cover object-center"
        alt="cover-image"
        width={500}
        height={300}
        src="https://cdn.pixabay.com/photo/2024/01/03/13/01/trees-8485455_1280.jpg"
      /> */}
      <AppWrapper>
        <div className="h-[50px] md:h-[60px] xl:h-[70px] flex items-center justify-end">
          <Button variant="secondary" size="sm" className="flex gap-1">
            <ImageIcon className="w-4 h-4" />
            Upload Cover
          </Button>
        </div>
      </AppWrapper>
      <AppWrapper>
        <input type="text" placeholder="Title" className="text-foreground bg-transparent outline-none text-2xl w-full" />
        <Editor />
      </AppWrapper>
    </div>
  );
}

export default BlogPage;
