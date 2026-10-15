"use client";

import { CircleCheck, FileText, Sparkles } from "lucide-react";
import Link from "next/link";
import { ExampleBadge } from "@/components/ExampleBadge";
import { HeroCanvas } from "@/components/HeroCanvas";
import { useI18n } from "@/components/Language";
import { openDifyWidget } from "@/lib/dify";
import { btnPrimary, btnSecondary, container, ctaRow } from "@/lib/styles";

const flowIcons = [FileText, Sparkles, CircleCheck];

export function Hero() {
  const { t } = useI18n();

  return (
    <section className="hero-surface relative flex min-h-[calc(80vh-48px)] items-center overflow-hidden max-[820px]:min-h-0">
      <HeroCanvas />
      <div className={`${container} pointer-events-none relative z-[1] grid grid-cols-[1.1fr_0.9fr] items-center gap-12 py-10 max-[820px]:grid-cols-1 max-[820px]:py-14`}>
        <div className="pointer-events-auto">
          <h1 className="text-[clamp(30px,4.2vw,56px)] font-extrabold leading-[1.25]">
            {t.home.before}
            <br />
            {t.home.mid}
            <span className="grad-text">{t.home.accent}</span>
          </h1>
          <p className="mb-[34px] mt-[22px] max-w-[36em] text-lg leading-[1.7] text-[#CBD5E1] max-[820px]:text-base">
            {t.home.sub[0]}
            <br />
            {t.home.sub[1]}
          </p>
          <div className={ctaRow}>
            <Link href="/pricing#contact" className={btnPrimary}>
              {t.cta.primary}
            </Link>
            <button type="button" className={btnSecondary} onClick={openDifyWidget}>
              {t.cta.secondary}
            </button>
          </div>
        </div>
        <div className="pointer-events-auto rounded-[18px] border border-[rgba(148,163,184,0.2)] bg-[rgba(30,41,59,0.55)] p-7 backdrop-blur-[10px] max-[560px]:p-[18px]">
          {t.home.flow.map((node, index) => {
            const Icon = flowIcons[index] ?? Sparkles;
            return (
              <div key={node.title}>
                {index > 0 ? <div className="ml-[33px] h-[22px] border-l-2 border-dashed border-[#6366F1]" /> : null}
                <div
                  className={`flex items-center gap-3.5 rounded-xl border bg-[#1E293B] px-4 py-3.5 text-[15px] ${
                    index === 1
                      ? "border-[#8B5CF6] shadow-[0_0_24px_rgba(139,92,246,0.35)]"
                      : "border-[#334155]"
                  }`}
                >
                  <span className="grid size-9 shrink-0 place-items-center rounded-[9px] bg-[#0F172A] text-[#E2E8F0]">
                    <Icon size={18} aria-hidden="true" />
                  </span>
                  <span>
                    {node.title}
                    <small className="block text-[13px] text-[#CBD5E1]">
                      {node.detail}
                      {node.sample ? <ExampleBadge>{node.sample}</ExampleBadge> : null}
                    </small>
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
