"use client";
import AppWrapper from "@/components/app-wrapper";
import { Button } from "@/components/ui/button";
import * as z from "zod";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import CoverImage from "./cover-image";
import ContentArticle from "./content";
import { useSearchParams } from "next/navigation";
import PostService from "@/services/post/post.service";

export const postSchema = z.object({
  title: z.string(),
  content: z.string(),
  coverImage: z.instanceof(File).nullable(),
});

function AddLayout() {
  const searchParams = useSearchParams();

  const form = useForm<z.infer<typeof postSchema>>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      title: "",
      content: "",
      coverImage: null,
    },
  });

  async function onSubmit(values: z.infer<typeof postSchema>) {
    const dataPost = await PostService.addPost(
      {
        title: "New Project",
        content: "",
      },
      "dd"
    );
  }

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col flex-grow">
        <div className="bg-primary/15">
          <AppWrapper className="flex justify-end py-2">
            <Button size="sm" type="submit">
              Publish
            </Button>
          </AppWrapper>
        </div>
        <CoverImage />
        <AppWrapper className="flex-grow flex flex-col">
          <ContentArticle />
        </AppWrapper>
      </form>
    </FormProvider>
  );
}

export default AddLayout;
