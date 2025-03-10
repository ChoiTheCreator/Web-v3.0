"use client";

import Sidebar from "@/app/components/utils/Sidebar";
import { PracticeProvider } from "@/app/context/PracticeContext";
import { usePathname } from "next/navigation";
import Header from "@/app/components/utils/Header";
import "@/app/globals.css";
import { useCookies } from "react-cookie";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isLoginPage = pathname.startsWith("/login");

  return (
    <div>
      <PracticeProvider>
        <div className="flex bg-black">
          {!isLoginPage && <Sidebar />}
          <div className="flex flex-col w-full">
            {!isLoginPage && <Header />}
            <div className="flex-1 bg-black-90">{children}</div>
          </div>
        </div>
      </PracticeProvider>
    </div>
  );
}
