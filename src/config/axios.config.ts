import AuthService from "@/services/auth/auth.service";
import axios, { AxiosError, AxiosRequestConfig } from "axios";

const axiosInitialize = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
});

axiosInitialize.interceptors.request.use(
  function (config) {
    const accessToken = "s";
    if (accessToken) {
      config.headers.Authorization = "Bearer " + accessToken;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

axiosInitialize.interceptors.response.use(
  function (res) {
    return res;
  },
  async function (error: AxiosError) {
    const originalConfig: any = error.config;
    if (error.response) {
      if (error.response.status === 401 && !originalConfig._retry) {
        // * Unauthorized
        originalConfig._retry = true;
        const session = await AuthService.getSession();
        console.log(session, "SESSIon");

        try {
          const refreshTokenResponse = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/refresh-token`, {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              token: session?.refreshToken,
              userId: session?.uuid,
            }),
          }).then((res) => res.json());

          console.log(refreshTokenResponse);

          return axiosInitialize(error.config as AxiosRequestConfig);
        } catch (_error) {
          return Promise.reject(_error);
        }
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInitialize;
