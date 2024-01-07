import axiosInitialize from "@/config/axios.config";
import { User } from "./user.types";

export const USER_PATHNAME = "/users";

const UserService = {
  getAll: async () => {
    const res = await axiosInitialize.get<User[]>("/users");
    return res.data;
  },
  changeAvatar: async (formData: FormData) => {
    const res = await axiosInitialize.post<{
      message: string;
      data: {
        url: string;
        path: string;
      };
    }>("/users/avatar", formData);
    return res.data;
  },
};

export default UserService;
