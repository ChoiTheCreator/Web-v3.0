// middleware.ts
import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  // 쿼리 파라미터에서 accessToken과 refreshToken 가져오기
  const accessToken = req.nextUrl.searchParams.get("accessToken");
  const refreshToken = req.nextUrl.searchParams.get("refreshToken");

  if (accessToken) {
    const response = NextResponse.next();

    // 쿠키 설정 (accessToken)
    response.cookies.set("aiTutorToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // production 환경에서만 secure 적용
      sameSite: "lax",
      path: "/",
    });

    // 쿠키 설정 (refreshToken)
    if (refreshToken) {
      response.cookies.set("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
      });
    }

    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/api/:path*",
};
