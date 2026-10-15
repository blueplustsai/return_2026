import type { Metadata } from "next";
import { ChatScene } from "@/components/ChatScene";
import { CtaBand } from "@/components/CtaBand";
import { FeatureGrid } from "@/components/FeatureGrid";
import { Hero } from "@/components/Hero";
import { PainPoints } from "@/components/PainPoints";
import { UseCasesSection } from "@/components/UseCasesSection";
import { WorkflowSteps } from "@/components/WorkflowSteps";

export const metadata: Metadata = {
  title: "首頁｜AI 轉型服務",
  description: "把沉睡的企業資料，變成 24 小時不休息的 AI 數位員工。",
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <PainPoints />
      <ChatScene />
      <FeatureGrid variant="home" />
      <WorkflowSteps variant="home" />
      <UseCasesSection variant="home" />
      <CtaBand variant="ready" layout="band" />
    </>
  );
}
