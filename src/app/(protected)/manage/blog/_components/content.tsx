"use client";
import React, { useCallback, useEffect } from "react";
import dynamic from "next/dynamic";
import { useFormContext } from "react-hook-form";
import * as z from "zod";
import { postSchema } from "./add-layout";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
const Editor = dynamic(() => import("@/components/editor/editor"), { ssr: false });

function ContentArticle() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const form = useFormContext<z.infer<typeof postSchema>>();
  const handleChange = async (value: string) => {
    form.setValue("content", value);
  };

  const handleSearch = (term: string) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set("query", term);
    } else {
      params.delete("query");
    }

    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <React.Fragment>
      <textarea
        placeholder="Type title..."
        className="resize-none text-foreground bg-transparent outline-none text-xl md:text-3xl w-full font-bold placeholder:text-foreground/30"
        rows={2}
        onChange={(e) => handleSearch(e.target.value)}
      />
      <Editor onChange={handleChange} />
    </React.Fragment>
  );
}

export default ContentArticle;
