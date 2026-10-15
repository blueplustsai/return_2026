"use client";

import Link from "next/link";
import { useI18n } from "@/components/Language";
import { openDifyWidget } from "@/lib/dify";
import { btnPrimary, btnSecondary, container, ctaRow, sectionY } from "@/lib/styles";

export function CtaBand({ variant }: { variant: "ready" | "industry" }) {
  const { t } = useI18n();
  const title = variant === "ready" ? t.cta.readyTitle : t.cta.industryTitle;
  const body = variant === "ready" ? t.cta.readyBody : t.cta.industryBody;

  return (
    <section className={sectionY}>
      <div className={container}>
        <div className="rounded-3xl border border-[#334155] bg-[#1E293B] bg-[radial-gradient(ellipse_at_50%_0,rgba(139,92,246,0.35),transparent_70%)] px-[30px] py-[70px] text-center max-[560px]:px-5 max-[560px]:py-11">
          <h2 className="mb-3.5 text-[clamp(24px,2.8vw,36px)] font-bold leading-[1.3]">{title}</h2>
          <p className="mx-auto mb-7 max-w-[34em] text-[#CBD5E1]">{body}</p>
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
