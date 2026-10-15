import type { Metadata } from "next";
import { CtaBand } from "@/components/CtaBand";
import { FeatureGrid } from "@/components/FeatureGrid";
import { PageHero } from "@/components/PageHero";
import { SolutionModules } from "@/components/SolutionModules";

export const metadata: Metadata = {
  title: "解決方案｜AI 轉型服務",
  description: "從 AI 客服到 IoT 升級，每個模組都能單獨導入，也能串成完整工作流。",
};

export default function SolutionsPage() {
  return (
    <>
      <PageHero page="solutions" />
      <FeatureGrid variant="solutions" />
      <SolutionModules />
      <CtaBand variant="ready" />
    </>
  );
}
