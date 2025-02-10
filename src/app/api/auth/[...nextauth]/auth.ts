import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
});

interface SignInParams {
  email: string;
  providerId: string;
}

export async function signIn(token: string, data: SignInParams) {
  try {
    const response = await api.post(`/auth/sign-in`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Sign-in error:", error);
    throw error;
  }
}
