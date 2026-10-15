import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";
import { PageHero } from "@/components/PageHero";
import { PricingTable } from "@/components/PricingTable";

export const metadata: Metadata = {
  title: "方案價格",
  description: "三種方案，依導入深度選擇。價格依專案範疇報價。",
};

export default function PricingPage() {
  return (
    <>
      <PageHero page="pricing" />
      <PricingTable />
      <ContactForm />
    </>
  );
}
