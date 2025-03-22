// app/api/auth/[...nextauth].ts
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { aiTutorSignIn } from "@/app/api/auth/[...nextauth]/auth"; // aiTutorSignIn 함수 가져오기

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
      clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async jwt({ token, account, user }) {
      console.log("🔹 [JWT 콜백 실행] 현재 토큰:", token);

      if (account && account.access_token) {
        token.accessToken = account.access_token as string;
        console.log("✅ [JWT] Google Access Token:", token.accessToken);

        if (user?.email) {
          console.log("🚀 [aiTutorSignIn 호출]:", {
            email: user.email,
            providerId: user.id,
          });

          try {
            const response = await aiTutorSignIn(
              token.accessToken as string | null,
              {
                email: user.email,
                providerId: user.id,
              }
            );

            console.log("✅ [aiTutorSignIn 응답]:", response);

            if (response.accessToken) {
              console.log(
                "🔑 [JWT] AI Tutor Access Token:",
                response.accessToken
              );
              return {
                ...token,
                aiTutorToken: response.accessToken,
                refreshToken: response.refreshToken,
              };
            } else {
              console.warn("⚠️ [JWT] AI Tutor Access Token이 응답에 없음");
            }
          } catch (error) {
            console.error("❌ [aiTutorSignIn 호출 중 오류]:", error);
          }
        }
      }
      return token;
    },

    async session({ session, token }) {
      console.log("🔹 [Session 콜백 실행] 토큰 정보:", token);

      session.user.aiTutorToken = token.aiTutorToken;
      session.user.refreshToken = token.refreshToken;

      if (token.aiTutorToken) {
        console.log("✅ [Session] AI Tutor 토큰을 응답 데이터로 반환");
      } else {
        console.warn("⚠️ [Session] AI Tutor 토큰이 없음");
      }

      return session; // 쿠키 설정하지 않고 session으로 반환
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/home", // 로그인 페이지
  },
});

export { handler as GET, handler as POST };
