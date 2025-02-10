import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { signIn } from "@/app/api/auth/[...nextauth]/auth";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
      clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async jwt({ token, account, user }) {
      if (account && account.access_token) {
        token.accessToken = account.access_token as string;

        if (user?.email) {
          try {
            const response = await signIn(token.accessToken, {
              email: user.email,
              providerId: "google",
            });

            if (response.accessToken) {
              token.aiTutorToken = response.accessToken;
            }
          } catch (error) {
            console.error("백엔드 로그인 실패:", error);
          }
        }
      }
      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken as string;
      session.aiTutorToken = token.aiTutorToken || null;
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/home",
  },
});

export { handler as GET, handler as POST };
