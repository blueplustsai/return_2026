"use client";

import { Building2, Factory, ShoppingCart } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useState, type KeyboardEvent } from "react";
import type { LucideIcon } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { useI18n } from "@/components/Language";
import { card, container, eyebrow, sectionY } from "@/lib/styles";
import { WrapText } from "@/components/WrapText";

const icons: Record<string, LucideIcon> = {
  ec: ShoppingCart,
  mf: Factory,
  ps: Building2,
};

export function UseCasesSection({ variant }: { variant: "home" | "page" }) {
  const { t } = useI18n();
  const [active, setActive] = useState(t.cases[0]?.id ?? "ec");
  const reduce = useReducedMotion();
  const current = t.cases.find((item) => item.id === active) ?? t.cases[0];

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const index = t.cases.findIndex((item) => item.id === active);
    if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") return;
    event.preventDefault();
    const next =
      event.key === "ArrowRight"
        ? t.cases[(index + 1) % t.cases.length]
        : t.cases[(index - 1 + t.cases.length) % t.cases.length];
    setActive(next.id);
  };

  return (
    <section className={`${sectionY} ${variant === "home" ? "bg-[#111A2E]" : ""}`}>
      <div className={container}>
        {variant === "home" ? (
          <Reveal>
            <p className={eyebrow}>{t.useHome.eyebrow}</p>
            <h2 className="mb-3.5 mt-2 text-[clamp(24px,2.8vw,36px)] font-bold leading-[1.3]">{t.useHome.title}</h2>
            <div className="h-[30px]" />
          </Reveal>
        ) : null}
        <div role="tablist" aria-label={t.useHome.title} className="mb-[26px] flex flex-wrap gap-2.5" onKeyDown={onKeyDown}>
          {t.cases.map((item) => {
            const Icon = icons[item.id] ?? ShoppingCart;
            const selected = item.id === active;
            return (
              <button
                key={item.id}
                type="button"
                role="tab"
                id={`tab-${item.id}`}
                aria-selected={selected}
                aria-controls={`panel-${item.id}`}
                tabIndex={selected ? 0 : -1}
                onClick={() => setActive(item.id)}
                className={`inline-flex cursor-pointer items-center gap-2 rounded-full border px-5 py-2.5 text-[15px] ${
                  selected
                    ? "border-transparent bg-gradient-to-r from-[#3B82F6] to-[#8B5CF6] text-white"
                    : "border-[#334155] bg-[#1E293B] text-[#CBD5E1]"
                }`}
              >
                <Icon size={16} aria-hidden="true" />
                {item.label}
              </button>
            );
          })}
        </div>
        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            role="tabpanel"
            id={`panel-${current.id}`}
            aria-labelledby={`tab-${current.id}`}
            initial={reduce ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? undefined : { opacity: 0, y: -6 }}
            transition={{ duration: 0.22 }}
            className="grid grid-cols-2 gap-[22px] max-[820px]:grid-cols-1"
          >
            <article className={card}>
              <h3 className="mb-2.5 text-[19px] font-bold text-[#CBD5E1]">{t.problemLabel}</h3>
              <p className="text-[#CBD5E1]">
                <WrapText text={current.problem} variant="copy" />
              </p>
            </article>
            <article className={`${card} border-[#6366F1]`}>
              <h3 className="mb-2.5 text-[19px] font-bold">
                <span className="grad-text">{t.solutionLabel}</span>
              </h3>
              <p className="text-[#CBD5E1]">
                <WrapText text={current.solution} variant="copy" />
              </p>
              <div className="mt-3">
                {current.tags.map((tag) => (
                  <span
                    key={tag}
                    className="mb-0 mr-1.5 mt-1 inline-block max-w-full rounded-full border border-[#334155] bg-[#0F172A] px-2.5 py-[3px] text-xs text-[#CBD5E1]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </article>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
