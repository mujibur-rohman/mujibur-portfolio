import axiosInitialize from "@/config/axios.config";
import { Paginate } from "@/interface/pagination";
import { Post } from "./post.type";

const PostService = {
  getAll: async ({ limit = 10, page = 1 }: { limit?: number; page: number }) => {
    const res = await axiosInitialize.get<Paginate<Post>>("/posts", {
      params: {
        limit,
        page,
      },
    });
    return res.data;
  },
};

export default PostService;
