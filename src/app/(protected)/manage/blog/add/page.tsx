"use client";
import React from "react";
import AppWrapper from "@/components/app-wrapper";
import { Button } from "@/components/ui/button";
import { ImageIcon } from "lucide-react";
import ContentArticle from "../_components/content";
import * as z from "zod";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import CoverImage from "../_components/cover-image";

export const postSchema = z.object({
  title: z.string(),
  content: z.string(),
  coverImage: z.instanceof(File).nullable(),
});

function BlogPage() {
  const form = useForm<z.infer<typeof postSchema>>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      title: "",
      content: "",
      coverImage: null,
    },
  });

  async function onSubmit(values: z.infer<typeof postSchema>) {
    console.log(values);
  }
  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="bg-primary/15">
          <AppWrapper className="flex justify-end py-2">
            <Button size="sm" type="submit">
              Publish
            </Button>
          </AppWrapper>
        </div>
        <CoverImage />
        <AppWrapper>
          <ContentArticle />
        </AppWrapper>
      </form>
    </FormProvider>
  );
}

export default BlogPage;
