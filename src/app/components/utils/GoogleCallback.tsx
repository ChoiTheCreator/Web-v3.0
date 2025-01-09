"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

const GoogleCallback = () => {
  const router = useRouter();

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const jwtToken = queryParams.get("token");
    if (jwtToken) {
      localStorage.setItem("jwtToken", jwtToken);

      router.push("/home");
    } else {
      console.error("JWT 토큰이 없습니다.");

      router.push("/error");
    }
  }, [router]);

  return <div>로그인 처리 중...</div>;
};

export default GoogleCallback;
