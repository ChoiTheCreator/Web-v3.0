import axios from 'axios';
import apiClient, { setAuthToken } from '@/app/utils/api';
import toast from 'react-hot-toast';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
});

interface SignInParams {
  email: string;
  providerId: string;
}

interface SignInResponse {
  accessToken: string | null;
  refreshToken: string | null;
}

export const refreshAuthToken = async (refreshToken: string) => {
  try {
    const response = await apiClient.post('/auth/refresh', { refreshToken });

    const newAccessToken = response.data?.information?.accessToken;
    const newRefreshToken = response.data?.information?.refreshToken;

    if (newAccessToken && newRefreshToken) {
      setAuthToken(newAccessToken);

      return { accessToken: newAccessToken, refreshToken: newRefreshToken };
    }

    return null;
  } catch (error) {
    toast.error('토큰 갱신 실패, 다시 로그인 해주세요.');
    return null;
  }
};

export async function aiTutorSignIn(
  token: string | null,
  data: SignInParams
): Promise<SignInResponse> {
  try {
    const response = await api.post(`/auth/sign-in`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log('🎯 aiTutorSignIn 응답:', response.data);

    return {
      accessToken: response.data.information?.accessToken ?? null,
      refreshToken: response.data.information?.refreshToken ?? null,
    };
  } catch (error: any) {
    console.error('❌ aiTutorSignIn 요청 에러:', error);

    if (error.response?.status === 401 && token) {
      const refreshToken = getRefreshTokenFromSomewhere();
      if (refreshToken) {
        const newToken = await refreshAuthToken(refreshToken);
        if (newToken && newToken.accessToken) {
          return aiTutorSignIn(newToken.accessToken, data);
        }
      }
    }

    return { accessToken: null, refreshToken: null };
  }
}

function getRefreshTokenFromSomewhere(): string | null {
  const refreshToken = localStorage.getItem('refreshToken');
  return refreshToken;
}
