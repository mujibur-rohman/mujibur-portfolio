import { loginSchema } from "@/schemas/auth";
import AuthService from "@/services/auth/auth.service";
import { AuthOptions } from "next-auth";
import { JWT } from "next-auth/jwt";
import Credentials from "next-auth/providers/credentials";

async function refreshAccessToken(token: JWT) {
  try {
    const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/refresh-token?`;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: token.refreshToken,
        userId: token.user.uuid,
      }),
    });

    const refreshedTokens = await response.json();

    if (!response.ok) {
      throw refreshedTokens;
    }

    return {
      ...token,
      accessToken: refreshedTokens.accessToken,
      accessTokenExpires: Date.now() + 10 * 1000,
      refreshToken: refreshedTokens.refreshToken ?? token.refreshToken,
      error: null,
    };
  } catch (error) {
    return {
      ...token,
      error: "RefreshAccessTokenError",
    };
  }
}

export default {
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        const validatedFields = loginSchema.safeParse(credentials);
        try {
          if (validatedFields.success) {
            const { email, password } = validatedFields.data;

            const auth = new AuthService();
            const user = await auth.login(email, password);
            return { ...user } as any;
          }

          return null;
        } catch (error: any) {
          if (error?.response?.data) {
            throw new Error(error?.response?.data.message);
          }
          throw new Error(error.message);
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, account }) {
      if (account && user) {
        console.log(token, "LOGIN");
        return {
          ...user,
          accessTokenExpires: Date.now() + 10 * 1000,
        };
      }
      if (Date.now() < token.accessTokenExpires) {
        console.log(token.accessTokenExpires, Date.now());
        return token;
      }
      console.log(token, "REFRESH");
      return refreshAccessToken(token);
    },
    async session({ session, token }) {
      session = token as any;
      // console.log(session, "SESSION");
      return session;
    },
  },
  session: { strategy: "jwt", maxAge: 60 * 60 * 24 },
  pages: {
    signIn: "/gate",
    error: "/gate",
  },
  secret: process.env.NEXTAUTH_SECRET as string,
} satisfies AuthOptions;
