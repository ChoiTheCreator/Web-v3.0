// app/(routes)/layout.tsx

import Sidebar from "@/app/components/utils/Sidebar";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/app/globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AI Tutor",
  description: "교수자를 위해 복습 문제 및 요약문을 생성해줍니다.",
};

export default function RoutesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex">
          {/* 사이드바 */}
          <Sidebar />
          {/* 메인 콘텐츠 */}
          <div className="flex-1 bg-bgDeepGray">{children}</div>
        </div>
      </body>
    </html>
  );
}
