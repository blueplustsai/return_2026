import type { Metadata } from "next";
import { Golos_Text, Outfit } from "next/font/google";
import { BrickzPage } from "./BrickzPage";
import "./brickz.css";

const display = Outfit({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--bz-display",
});

const body = Golos_Text({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--bz-body",
});

export const metadata: Metadata = {
  title: { absolute: "Fieldstone — Urban Construction" },
  description:
    "One-page construction studio layout study with a yellow accent, service cards, project filters, and a contact band.",
};

export default function Page() {
  return (
    <div className={`${display.variable} ${body.variable} bz-root`}>
      <BrickzPage />
    </div>
  );
}
