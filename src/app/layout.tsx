import { Inter } from "next/font/google";
import { Metadata } from "next";
import ReactQueryProvider from "@/app/providers/ReactQueryProvider";
import ClientSessionProvider from "./ClientSessionProvider";

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AI-Tutor",
  description: "교수님을 위한 복습 문제 생성 서비스",
  robots: {
    index: true,
    follow: true,
  },
  metadataBase: new URL("https://ai-tutor.co.kr/"),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ReactQueryProvider>
          <ClientSessionProvider>{children}</ClientSessionProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
