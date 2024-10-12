// app/(routes)/layout.tsx

import Sidebar from "@/app/components/utils/Sidebar";
import { PracticeProvider } from "@/app/context/PracticeContext";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/app/globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AI Tutor",
  description: "교수자를 위해 복습 문제 및 요약문을 생성해줍니다.",
};

export default function RoutesLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="flex">
          <Sidebar />
          <div className="flex-1 bg-bgDeepGray">
            <PracticeProvider>
              {children}
            </PracticeProvider>
          </div>
        </div>
      </body>
    </html>
  );
}
