import axiosInitialize from "@/config/axios.config";
import Cookies from "js-cookie";
import { LoginResponse } from "./auth.types";
import { decryptData, encryptData } from "@/lib/crypto-encrypt";

class AuthService {
  public pathname = "/auth";

  async login(email: string, password: string) {
    const response = await axiosInitialize.post<LoginResponse>(this.pathname, {
      email,
      password,
    });
    const userEncrypted = encryptData(JSON.stringify(response.data));

    // * store token to cookie
    Cookies.set("_user", userEncrypted, { expires: new Date(new Date().getTime() + 60 * 60 * 1000) }); // expired 1 hour
    Cookies.set("_accessToken", response.data.accessToken, { expires: new Date(new Date().getTime() + 60 * 60 * 1000) }); // expired 1 hour
    Cookies.set("_refreshToken", response.data.refreshToken, { expires: new Date(new Date().getTime() + 24 * 60 * 60 * 1000) }); // expired 1 day

    return response.data;
  }
  async logout() {
    const access = Cookies.get("_accessToken");
    const refresh = Cookies.get("_refreshToken");
    if (access || refresh) {
      Cookies.remove("_accessToken");
      Cookies.remove("_refreshToken");
    }
  }

  async currentUser() {
    const user = Cookies.get("_user") as string;
    if (!user) {
      this.logout();
      return;
    }
    console.log(user);
    const currentUser = decryptData(user);
    // console.log(currentUser);
    return JSON.parse(currentUser);
  }
}

export default AuthService;
