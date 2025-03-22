// app/api/auth/[...nextauth]/auth.ts
import axios from "axios";
import apiClient, { setAuthToken } from "@/app/utils/api"; // 필요한 유틸리티 불러오기

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL, // 기본 API URL
});

interface SignInParams {
  email: string;
  providerId: string;
}

interface SignInResponse {
  accessToken: string | null;
  refreshToken: string | null;
}

// 토큰 갱신 함수
export const refreshAuthToken = async (refreshToken: string) => {
  console.log("🔄 [토큰 갱신 요청] refreshToken:", refreshToken);

  try {
    const response = await apiClient.post("/auth/refresh", { refreshToken });
    console.log("✅ [토큰 갱신 응답]:", response.data);

    const newAccessToken = response.data?.information?.accessToken;
    const newRefreshToken = response.data?.information?.refreshToken;

    if (newAccessToken && newRefreshToken) {
      setAuthToken(newAccessToken);
      console.log("🔑 [새로운 토큰 발급] accessToken:", newAccessToken);
      return { accessToken: newAccessToken, refreshToken: newRefreshToken };
    }

    console.warn("⚠️ [토큰 갱신 실패] 응답에 토큰이 없음");
    return null;
  } catch (error: any) {
    console.error(
      "❌ [토큰 갱신 오류]:",
      error.response?.data || error.message
    );
    return null;
  }
};

// 로그인 함수
export async function aiTutorSignIn(
  token: string | null,
  data: SignInParams
): Promise<SignInResponse> {
  console.log("🚀 [AI Tutor 로그인 요청]:", { token, data });

  try {
    const response = await api.post(`/auth/sign-in`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("✅ [AI Tutor 로그인 응답]:", response.data);

    const accessToken =
      typeof response.data?.information?.accessToken === "string"
        ? response.data.information.accessToken
        : null;

    const refreshToken =
      typeof response.data?.information?.refreshToken === "string"
        ? response.data.information.refreshToken
        : null;

    if (!accessToken || !refreshToken) {
      console.warn("⚠️ [AI Tutor 로그인 실패] 토큰이 응답에 없음");
    }

    return { accessToken, refreshToken };
  } catch (error: any) {
    console.error(
      "❌ [AI Tutor 로그인 오류]:",
      error.response?.data || error.message
    );
    return { accessToken: null, refreshToken: null };
  }
}
