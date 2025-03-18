import { Inter } from "next/font/google";
import { Metadata } from "next";
import ReactQueryProvider from "@/app/providers/ReactQueryProvider";
import ClientSessionProvider from "./ClientSessionProvider";
import Head from "next/head";

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AI-Tutor",
  description: "교수님을 위한 복습 문제 생성 서비스",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <Head>
        <meta name="referrer" content="strict-origin-when-cross-origin" />
      </Head>
      <body className={inter.className}>
        <ReactQueryProvider>
          <ClientSessionProvider>{children}</ClientSessionProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
