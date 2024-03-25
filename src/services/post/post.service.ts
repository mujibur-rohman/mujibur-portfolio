import axiosInitialize from "@/config/axios.config";
import { Paginate } from "@/interface/pagination";
import { Post } from "./post.type";

const PostService = {
  getAll: async ({ limit = 10, page = 1, token }: { limit?: number; page: number; token: string }) => {
    const res = await axiosInitialize.get<Paginate<Post>>("/posts", {
      params: {
        limit,
        page,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  },
  addPost: async (payload: any, token: string) => {
    const res = await axiosInitialize.post<{ message: string; data: Post }>("/posts", payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  },
  contentImage: async (image: FormData) => {
    const res = await axiosInitialize.post<{ data: { url: string } }>("/posts/content/image", image);
    return res.data;
  },
};

export default PostService;
