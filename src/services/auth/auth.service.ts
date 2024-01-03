import axiosInitialize from "@/config/axios.config";
import Cookies from "js-cookie";
import { LoginResponse } from "./auth.types";
import { decryptData, encryptData } from "@/lib/crypto-encrypt";
import { User } from "../user/user.types";

class AuthService {
  public pathname = "/auth";

  async login(email: string, password: string) {
    const response = await axiosInitialize.post<LoginResponse>(this.pathname, {
      email,
      password,
    });
    const userEncrypted = encryptData(JSON.stringify(response.data.user));

    // * store token to cookie
    Cookies.set("_user", userEncrypted, { expires: new Date(new Date().getTime() + 24 * 60 * 60 * 1000) }); // expired 1 hour
    Cookies.set("_accessToken", response.data.accessToken, { expires: new Date(new Date().getTime() + 24 * 60 * 60 * 1000) }); // expired 1 hour
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

  refreshLogin(user: LoginResponse) {
    console.log(user);
    const userEncrypted = encryptData(JSON.stringify(user.user));

    // * store token to cookie
    Cookies.set("_user", userEncrypted, { expires: new Date(new Date().getTime() + 24 * 60 * 60 * 1000) }); // expired 1 hour
    Cookies.set("_accessToken", user.accessToken, { expires: new Date(new Date().getTime() + 24 * 60 * 60 * 1000) }); // expired 1 hour
    Cookies.set("_refreshToken", user.refreshToken, { expires: new Date(new Date().getTime() + 24 * 60 * 60 * 1000) }); // expired 1 day
  }

  currentUser() {
    const user = Cookies.get("_user") as string;
    if (!user) {
      this.logout();
      return;
    }
    const currentUser = decryptData(user);
    return JSON.parse(currentUser) as User;
  }

  getAccessToken() {
    const access = Cookies.get("_accessToken");
    return access;
  }

  getRefreshToken() {
    const refresh = Cookies.get("_refreshToken");
    return refresh;
  }
}

export default AuthService;
