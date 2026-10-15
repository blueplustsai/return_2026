"use client";

import { Monitor, Radio, Sparkles } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { ExampleBadge } from "@/components/ExampleBadge";
import { IconTile } from "@/components/IconTile";
import { Reveal } from "@/components/Reveal";
import { useI18n } from "@/components/Language";
import { card, container, eyebrow, sectionY } from "@/lib/styles";
import { WrapText } from "@/components/WrapText";

const icons: LucideIcon[] = [Monitor, Radio, Sparkles];

export function AboutAdvantages() {
  const { t } = useI18n();

  return (
    <section className={sectionY}>
      <div className={container}>
        <Reveal>
          <p className={eyebrow}>{t.aboutWhy.eyebrow}</p>
          <h2 className="mb-3.5 mt-2 text-[clamp(24px,2.8vw,36px)] font-bold leading-[1.3]">{t.aboutWhy.title}</h2>
          <div className="h-[30px]" />
        </Reveal>
        <div className="grid grid-cols-3 gap-[22px] max-[1000px]:grid-cols-1">
          {t.advantages.map((item, index) => {
            const Icon = icons[index] ?? Sparkles;
            return (
              <Reveal key={item.title} delay={index * 0.05} className="h-full">
                <article className={`${card} h-full`}>
                  <IconTile>
                    <Icon size={22} aria-hidden="true" />
                  </IconTile>
                  <h3 className="mb-2.5 mt-3.5 text-[19px] font-bold">
                    <WrapText text={item.title} variant="title" />
                  </h3>
                  <p className="text-[#CBD5E1]">
                    <WrapText text={item.body} variant="copy" />
                  </p>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function AboutStats() {
  const { t } = useI18n();

  return (
    <section className={`${sectionY} bg-[#111A2E]`}>
      <div className={container}>
        <Reveal>
          <p className={eyebrow}>{t.aboutStats.eyebrow}</p>
          <h2 className="mb-3.5 mt-2 text-[clamp(24px,2.8vw,36px)] font-bold leading-[1.3]">{t.aboutStats.title}</h2>
          <p className="mb-11 max-w-[40em] text-[#CBD5E1]">{t.aboutStats.lead}</p>
        </Reveal>
        <div className="grid grid-cols-4 gap-[22px] max-[1000px]:grid-cols-2 max-[560px]:grid-cols-1">
          {t.stats.map((stat) => (
            <article key={stat.label} className={`${card} text-center`}>
              <div className="text-[36px] font-extrabold">
                <span className="grad-text">{stat.value}</span>
              </div>
              <p className="text-[#CBD5E1]">
                {stat.label}
                <ExampleBadge />
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
