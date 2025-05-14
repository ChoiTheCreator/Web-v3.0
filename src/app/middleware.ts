import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const accessToken = req.nextUrl.searchParams.get("accessToken");
  const refreshToken = req.nextUrl.searchParams.get("refreshToken");

  if (accessToken) {
    const response = NextResponse.next();

    response.cookies.set("aiTutorToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
    });

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
