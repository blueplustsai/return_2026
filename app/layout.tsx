import type { Metadata } from "next";
import { DifyChatWidget } from "@/components/DifyChatWidget";
import { Footer } from "@/components/Footer";
import { LanguageProvider } from "@/components/Language";
import { Navbar } from "@/components/Navbar";
import { SkipLink } from "@/components/SkipLink";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "芮騰數位科技",
    template: "%s | 芮騰數位科技",
  },
  description:
    "專為中小企業打造的一站式 AI 轉型解決方案：自動化工作流、企業私有知識庫（RAG）、既有系統 API 升級。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-Hant">
      <body className="antialiased">
        <LanguageProvider>
          <SkipLink />
          <Navbar />
          <main id="content">{children}</main>
          <Footer />
        </LanguageProvider>
        <DifyChatWidget />
      </body>
    </html>
  );
}
