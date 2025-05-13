import { useSession, signOut } from "next-auth/react";
import { useEffect } from "react";
import apiClient, { setAuthToken } from "@/app/utils/api";
import toast from "react-hot-toast";
import { refreshAuthToken } from "@/app/api/auth/[...nextauth]/auth";

const useAuthInterceptor = () => {
  const { data: session, update } = useSession();

  const REFRESH_TIMEOUT = 1000 * 60 * 60;

  const REDIRECT_TIMEOUT = 1000 * 60 * 60;

  useEffect(() => {
    if (!session?.user?.aiTutorToken) {
      setAuthToken(null);
      return;
    }
    setAuthToken(session.user.aiTutorToken);

    const refreshTimer = setTimeout(async () => {
      if (!session.user.refreshToken) {
        return;
      }
      try {
        const newTokens = await refreshAuthToken(session.user.refreshToken);
        if (newTokens && newTokens.accessToken && newTokens.refreshToken) {
          await apiClient.post(
            `${process.env.NEXT_PUBLIC_API_URL}/api/auth/refresh`,
            {
              aiTutorToken: newTokens.accessToken,
              refreshToken: newTokens.refreshToken,
            }
          );
          const updatedSession = await update({
            user: {
              ...session.user,
              aiTutorToken: newTokens.accessToken,
              refreshToken: newTokens.refreshToken,
            },
          });
          if (updatedSession?.user?.aiTutorToken) {
            setAuthToken(updatedSession.user.aiTutorToken);
          } else {
            toast.error("세션 업데이트 실패, 다시 로그인 해주세요.");
          }
        } else {
          toast.error("토큰 갱신 실패, 다시 로그인 해주세요.");
        }
      } catch (error: any) {
        toast.error(`세션 업데이트 실패: ${error.message}`);
      }
    }, REFRESH_TIMEOUT);

    // 1시간 후에 로그인으로 리다이렉트
    const redirectTimer = setTimeout(() => {
      signOut({ callbackUrl: "/login" });
    }, REDIRECT_TIMEOUT);

    return () => {
      clearTimeout(refreshTimer);
      clearTimeout(redirectTimer);
    };
  }, [session, update]);

  return null;
};

export default useAuthInterceptor;
