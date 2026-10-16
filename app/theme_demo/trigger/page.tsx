import type { Metadata } from "next";
import { Roboto_Mono, Unbounded } from "next/font/google";
import { TriggerPage } from "./TriggerPage";
import "./trigger.css";

const display = Unbounded({
  subsets: ["latin"],
  weight: ["700", "800", "900"],
  variable: "--tg-display",
});

const mono = Roboto_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--tg-mono",
});

export const metadata: Metadata = {
  title: { absolute: "Adrian Kessler — Photographer" },
  description:
    "Dark photography portfolio layout study with a fullscreen masthead, project grid, services list, and inquiry form.",
};

export default function Page() {
  return (
    <div className={`${display.variable} ${mono.variable} tg-root`}>
      <TriggerPage />
    </div>
  );
}
