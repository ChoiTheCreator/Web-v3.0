import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import {
  aiTutorSignIn,
  refreshAuthToken,
} from "@/app/api/auth/[...nextauth]/auth";
import { cookies } from "next/headers";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
      clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async jwt({ token, account, user, trigger }) {
      const now = Math.floor(Date.now() / 1000);

      if (
        token.aiTutorToken &&
        token.refreshToken &&
        typeof token.exp === "number" &&
        now > token.exp
      ) {
        try {
          const newTokens = await refreshAuthToken(token.refreshToken);

          if (newTokens?.accessToken) {
            token.aiTutorToken = newTokens.accessToken;
            token.refreshToken = newTokens.refreshToken;
            token.exp = decodeJwtExp(newTokens.accessToken);
          }
        } catch {}
      }

      if (trigger === "signIn" && account && user) {
        const accessToken = account.access_token as string;
        const providerId = account.providerAccountId;

        token.accessToken = accessToken;

        const response = await aiTutorSignIn(accessToken, {
          email: user.email!,
          providerId,
        });

        if (response.accessToken) {
          token.aiTutorToken = response.accessToken;
          token.refreshToken = response.refreshToken;
          token.exp = decodeJwtExp(response.accessToken);
        }
      }

      return token;
    },

    async session({ session, token }) {
      session.user.aiTutorToken = token.aiTutorToken;
      session.user.refreshToken = token.refreshToken;

      if (token.aiTutorToken) {
        cookies().set("aiTutorToken", token.aiTutorToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "lax",
          path: "/",
          domain:
            process.env.NODE_ENV === "production"
              ? ".ai-tutor.co.kr"
              : undefined,
        });

        if (token.refreshToken) {
          cookies().set("refreshToken", token.refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            path: "/",
            domain:
              process.env.NODE_ENV === "production"
                ? ".ai-tutor.co.kr"
                : undefined,
          });
        }
      }

      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/home",
  },
});

export { handler as GET, handler as POST };

function decodeJwtExp(token: string): number | undefined {
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload.exp;
  } catch {
    return undefined;
  }
}
