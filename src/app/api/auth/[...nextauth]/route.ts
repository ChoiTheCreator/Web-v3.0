import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { aiTutorSignIn } from "@/app/api/auth/[...nextauth]/auth";
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
      console.log("🔹 [JWT 콜백 실행]");
      console.log("🔸 token:", token);
      console.log("🔸 account:", account);
      console.log("🔸 user:", user);
      console.log("🔸 trigger:", trigger);

      if (trigger === "signIn" && account && user) {
        const accessToken = account.access_token as string;
        const providerId = account.providerAccountId;

        token.accessToken = accessToken;

        console.log("🚀 aiTutorSignIn 호출:", {
          email: user.email,
          providerId,
        });

        try {
          const response = await aiTutorSignIn(accessToken, {
            email: user.email!,
            providerId,
          });

          console.log("✅ aiTutorSignIn 응답:", response);

          if (response.accessToken) {
            token.aiTutorToken = response.accessToken;
            token.refreshToken = response.refreshToken;
          } else {
            console.warn("⚠️ aiTutor 응답에 토큰이 없음");
          }
        } catch (e) {
          console.error("❌ aiTutorSignIn 실패:", e);
        }
      }

      return token;
    },

    async session({ session, token }) {
      console.log("🔹 [Session 콜백 실행] 토큰 정보:", token);

      session.user.aiTutorToken = token.aiTutorToken;
      session.user.refreshToken = token.refreshToken;

      if (token.aiTutorToken) {
        console.log("✅ [Session] AI Tutor 토큰을 쿠키에 저장");

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
      } else {
        console.warn("⚠️ [Session] AI Tutor 토큰이 없음");
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
