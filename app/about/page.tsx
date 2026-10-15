import type { Metadata } from "next";
import { AboutAdvantages, AboutStats } from "@/components/AboutPanels";
import { CtaBand } from "@/components/CtaBand";
import { PageHero } from "@/components/PageHero";

export const metadata: Metadata = {
  title: "關於我們",
  description: "我們結合網頁系統開發、API 串接與 IoT 軟硬整合經驗，幫中小企業把 AI 真正接進日常營運。",
};

export default function AboutPage() {
  return (
    <>
      <PageHero page="about" />
      <AboutAdvantages />
      <AboutStats />
      <CtaBand variant="ready" />
    </>
  );
}
