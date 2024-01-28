"use client";
import React from "react";
import AppWrapper from "@/components/app-wrapper";
import { Button } from "@/components/ui/button";
import { ImageIcon } from "lucide-react";
import ContentArticle from "../_components/content";
import * as z from "zod";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

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
          <ContentArticle />
        </AppWrapper>
      </form>
    </FormProvider>
  );
}

export default BlogPage;
