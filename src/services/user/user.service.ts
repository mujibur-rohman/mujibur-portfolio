import axiosInitialize from "@/config/axios.config";
import { User } from "./user.types";

export const USER_PATHNAME = "/users";

const UserService = {
  getAll: async () => {
    const res = await axiosInitialize.get<User[]>("/users");
    return res.data;
  },
};

export default UserService;
