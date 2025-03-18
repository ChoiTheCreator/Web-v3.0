import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { Session } from "next-auth";

interface UpdateSessionBody {
  aiTutorToken: string;
  refreshToken: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const session: Session | null = await getSession({ req });

    if (session) {
      const { aiTutorToken, refreshToken } = req.body as UpdateSessionBody;

      session.user.aiTutorToken = aiTutorToken;
      session.user.refreshToken = refreshToken;

      return res.status(200).json({ message: "세션 업데이트 성공", session });
    } else {
      return res.status(401).json({ message: "세션이 존재하지 않습니다" });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
