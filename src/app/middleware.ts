import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const aiTutorToken = req.cookies.get("aiTutorToken")?.value || null;
  const refreshToken = req.cookies.get("refreshToken")?.value || null;

  const protectedRoutes = ["/home", "/notes"];
  const isProtectedRoute = protectedRoutes.some((route) =>
    req.nextUrl.pathname.startsWith(route)
  );

  if (isProtectedRoute && !aiTutorToken) {
    if (!refreshToken) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/auth/refresh`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ refreshToken }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        const newAccessToken = data?.information?.accessToken;
        const newRefreshToken = data?.information?.refreshToken;

        if (newAccessToken && newRefreshToken) {
          const res = NextResponse.next();
          res.cookies.set("aiTutorToken", newAccessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            path: "/",
            domain:
              process.env.NODE_ENV === "production"
                ? ".ai-tutor.co.kr"
                : undefined,
          });

          res.cookies.set("refreshToken", newRefreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            path: "/",
            domain:
              process.env.NODE_ENV === "production"
                ? ".ai-tutor.co.kr"
                : undefined,
          });

          return res;
        }
      }
    } catch (error) {
      console.error("토큰 갱신 실패:", error);
    }

    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/home/:path*", "/notes/:path*"],
};
