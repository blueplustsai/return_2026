"use client";

import { MessageCircle, Plug, Tags, Workflow, ArrowRight } from "lucide-react";
import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { IconTile } from "@/components/IconTile";
import { Reveal } from "@/components/Reveal";
import { useI18n } from "@/components/Language";
import { container, eyebrow, sectionY } from "@/lib/styles";

const icons: LucideIcon[] = [MessageCircle, Workflow, Tags, Plug];

export function FeatureGrid({ variant }: { variant: "home" | "solutions" }) {
  const { t } = useI18n();
  const heading = variant === "home" ? t.featureHome : t.featureSolutions;

  return (
    <section className={`${sectionY} ${variant === "home" ? "bg-[#111A2E]" : ""}`}>
      <div className={container}>
        <Reveal>
          <p className={eyebrow}>{heading.eyebrow}</p>
          <h2 className="mb-3.5 mt-2 text-[clamp(24px,2.8vw,36px)] font-bold leading-[1.3]">{heading.title}</h2>
          {variant === "home" ? (
            <p className="mb-11 max-w-[40em] text-[#CBD5E1]">{t.featureHome.lead}</p>
          ) : (
            <div className="h-[30px]" />
          )}
        </Reveal>
        <div className="grid grid-cols-4 gap-[22px] max-[1000px]:grid-cols-2 max-[560px]:grid-cols-1">
          {t.features.map((feature, index) => {
            const Icon = icons[index] ?? MessageCircle;
            return (
              <Reveal key={feature.title} delay={index * 0.05} className="h-full">
                <article className="glass-card h-full rounded-[18px] border border-[rgba(148,163,184,0.22)] bg-[linear-gradient(160deg,rgba(59,130,246,0.10),rgba(139,92,246,0.08))] p-[30px] backdrop-blur-[10px]">
                  <IconTile>
                    <Icon size={22} aria-hidden="true" />
                  </IconTile>
                  <h3 className="mb-2 mt-3.5 text-[19px] font-bold">{feature.title}</h3>
                  <p className="text-[#CBD5E1]">{feature.body}</p>
                </article>
              </Reveal>
            );
          })}
        </div>
        {variant === "home" ? (
          <p className="mt-[26px]">
            <Link href="/solutions" className="inline-flex items-center gap-1 text-[#93C5FD] hover:text-white">
              {t.featureHome.more}
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </p>
        ) : null}
      </div>
    </section>
  );
}
