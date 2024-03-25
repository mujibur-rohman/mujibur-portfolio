import React from "react";
import AddLayout from "../_components/add-layout";
import PostService from "@/services/post/post.service";
import { getServerSession } from "next-auth";
import authConfig from "@/config/auth.config";

async function AddPostPage() {
  const session = await getServerSession(authConfig);
  // const dataPost = await PostService.addPost(
  //   {
  //     title: "New Project",
  //     content: "",
  //   },
  //   session!.accessToken
  // );

  return <AddLayout />;
}

export default AddPostPage;
