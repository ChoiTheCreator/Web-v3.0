"use client";

import React from "react";
import { signIn } from "next-auth/react";
import axios from "axios";

const GoogleLoginCTA = () => {
  const handleGoogleLogin = async () => {
    try {
      // 1. NextAuth를 통해 Google 로그인 시작
      const response = await signIn("google", {
        redirect: false, // 리디렉션 없이 JWT 처리
        callbackUrl: "/home",
      });

      if (!response || !response.ok) {
        throw new Error("Google 로그인 실패");
      }

      // 2. NextAuth에서 발급한 토큰이 없으면 백엔드 API 호출
      const apiResponse = await axios.get(
        "https://api.ai-tutor.co.kr/oauth2/authorize/google",
        { withCredentials: true }
      );

      if (apiResponse.data && apiResponse.data.token) {
        const jwtToken = apiResponse.data.token;
        console.log("백엔드에서 JWT 토큰:", jwtToken);

        // 토큰을 로컬 스토리지에 저장
        localStorage.setItem("jwtToken", jwtToken);

        alert("로그인 성공!");
      } else {
        throw new Error("JWT 토큰이 없습니다.");
      }
    } catch (error) {
      console.error("Google 로그인 중 오류:", error);
      alert("로그인 실패. 다시 시도해주세요.");
    }
  };

  return (
    <button
      onClick={handleGoogleLogin}
      className="h-[50px] w-[200px] bg-blue-500 text-white rounded-lg"
    >
      Google 로그인
    </button>
  );
};

export default GoogleLoginCTA;
