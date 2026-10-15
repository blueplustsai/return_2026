"use client";

import Link from "next/link";
import { useI18n } from "@/components/Language";
import { openDifyWidget } from "@/lib/dify";
import { btnPrimary, btnSecondary, container, ctaRow, sectionY } from "@/lib/styles";
import { WrapText } from "@/components/WrapText";

export function CtaBand({ variant, layout = "card" }: { variant: "ready" | "industry"; layout?: "card" | "band" }) {
  const { t } = useI18n();
  const title = variant === "ready" ? t.cta.readyTitle : t.cta.industryTitle;
  const body = variant === "ready" ? t.cta.readyBody : t.cta.industryBody;

  if (layout === "band") {
    return (
      <section className="bg-[linear-gradient(120deg,#2563EB,#7C3AED)] px-6 py-[90px] text-center max-[820px]:py-[68px]">
        <div className={container}>
          <h2 className="mb-4 text-[clamp(24px,2.8vw,38px)] font-bold leading-[1.3] text-white">
            <WrapText text={title} variant="title" />
          </h2>
          <p className="mx-auto mb-8 max-w-[640px] text-lg text-[#EEF2FF]">
            <WrapText text={body} variant="copy" />
          </p>
          <div className={`${ctaRow} justify-center`}>
            <Link
              href="/pricing#contact"
              className="inline-flex cursor-pointer items-center justify-center rounded-[10px] border-0 bg-white px-[26px] py-[14px] text-center text-base font-semibold text-[#4338CA] no-underline shadow-[0_10px_30px_rgba(0,0,0,0.2)] transition hover:brightness-110"
            >
              {t.cta.primary}
            </Link>
            <button
              type="button"
              className="inline-flex cursor-pointer items-center justify-center rounded-[10px] border border-white/60 bg-transparent px-[26px] py-[14px] text-center text-base font-semibold text-white no-underline transition hover:border-white"
              onClick={openDifyWidget}
            >
              {t.cta.secondary}
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={sectionY}>
      <div className={container}>
        <div className="rounded-3xl border border-[#334155] bg-[#1E293B] bg-[radial-gradient(ellipse_at_50%_0,rgba(139,92,246,0.35),transparent_70%)] px-[30px] py-[70px] text-center max-[560px]:px-5 max-[560px]:py-11">
          <h2 className="mb-3.5 text-[clamp(24px,2.8vw,36px)] font-bold leading-[1.3]">
            <WrapText text={title} variant="title" />
          </h2>
          <p className="mx-auto mb-7 max-w-[34em] text-[#CBD5E1]">
            <WrapText text={body} variant="copy" />
          </p>
          <div className={`${ctaRow} justify-center`}>
            <Link href="/pricing#contact" className={btnPrimary}>
              {t.cta.primary}
            </Link>
            <button type="button" className={btnSecondary} onClick={openDifyWidget}>
              {t.cta.secondary}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
