"use client";
import React from "react";
import dynamic from "next/dynamic";
import { useFormContext } from "react-hook-form";
import { postSchema } from "../add/page";
import * as z from "zod";
const Editor = dynamic(() => import("@/components/editor/editor"), { ssr: false });

function ContentArticle() {
  const form = useFormContext<z.infer<typeof postSchema>>();
  const handleChange = async (value: string) => {
    form.setValue("content", value);
  };
  return (
    <React.Fragment>
      <textarea
        placeholder="Type title..."
        className="resize-none text-foreground bg-transparent outline-none text-xl md:text-3xl w-full font-bold placeholder:text-foreground/30"
        rows={2}
      />
      <Editor onChange={handleChange} />
    </React.Fragment>
  );
}

export default ContentArticle;