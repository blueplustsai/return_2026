"use client";

import { HeroCanvas } from "@/components/HeroCanvas";
import { useI18n } from "@/components/Language";
import { container, eyebrow } from "@/lib/styles";

type PageKey = "solutions" | "useCases" | "pricing" | "about";

export function PageHero({ page }: { page: PageKey }) {
  const { t } = useI18n();
  const content = t.pages[page];

  return (
    <section className="hero-surface relative overflow-hidden py-24 pb-[72px]">
      <HeroCanvas />
      <div className={`${container} relative z-[1]`}>
        <p className={eyebrow}>{content.eyebrow}</p>
        <h1 className="mt-2 text-[clamp(28px,3.4vw,44px)] font-extrabold leading-[1.25]">
          {content.before}
          <span className="grad-text">{content.accent}</span>
        </h1>
        <p className="mb-[34px] mt-[22px] max-w-[36em] text-lg leading-[1.7] text-[#CBD5E1] max-[820px]:text-base">
          {content.sub}
        </p>
      </div>
    </section>
  );
}
