import axiosInitialize from "@/config/axios.config";
import { LoginResponse } from "./auth.types";
import { SignJWT, jwtVerify } from "jose";
import { setCookie, getCookie } from "cookies-next";
import errorResponse from "@/lib/error-response";
import { toast } from "sonner";

const secretKey = "chkiuadsehbncfiehuifchuwiaefc";
const key = new TextEncoder().encode(secretKey);

const pathname = "/auth";

export async function encrypt(payload: any) {
  return await new SignJWT(payload).setProtectedHeader({ alg: "HS256" }).setIssuedAt().sign(key);
}

export async function decrypt(input: string): Promise<any> {
  const { payload } = await jwtVerify(input, key, {
    algorithms: ["HS256"],
  });
  return payload;
}

const AuthService = {
  login: async (email: string, password: string) => {
    try {
      const response = await axiosInitialize.post<LoginResponse>(pathname, {
        email,
        password,
      });

      const session = await encrypt({
        accessToken: response.data.accessToken,
        refreshToken: response.data.refreshToken,
        uuid: response.data.user.uuid,
      });

      setCookie("session", session);
      toast.success("Login Success");
      return response.data;
    } catch (error: any) {
      errorResponse(error);
    }
  },

  getSession: async (): Promise<{ accessToken: string; refreshToken: string; uuid: string } | null> => {
    const session = getCookie("session");
    if (!session) return null;
    return await decrypt(session);
  },
  updateToken: async ({ accessToken, refreshToken, uuid }: { accessToken: string; refreshToken: string; uuid: string }) => {
    const session = await encrypt({
      accessToken,
      refreshToken,
      uuid,
    });

    setCookie("session", session);
  },
};

export default AuthService;
