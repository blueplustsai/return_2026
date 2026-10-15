import type { Metadata } from "next";
import { CtaBand } from "@/components/CtaBand";
import { PageHero } from "@/components/PageHero";
import { UseCasesSection } from "@/components/UseCasesSection";
import { WorkflowSteps } from "@/components/WorkflowSteps";

export const metadata: Metadata = {
  title: "應用場景",
  description: "選擇你的產業，看看 AI 能解決什麼問題。",
};

export default function UseCasesPage() {
  return (
    <>
      <PageHero page="useCases" />
      <UseCasesSection variant="page" />
      <WorkflowSteps variant="cases" />
      <CtaBand variant="industry" />
    </>
  );
}
