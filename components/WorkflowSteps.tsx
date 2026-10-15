"use client";

import { Reveal } from "@/components/Reveal";
import { useI18n } from "@/components/Language";
import { card, container, eyebrow, sectionY } from "@/lib/styles";

export function WorkflowSteps({ variant }: { variant: "home" | "cases" }) {
  const { t } = useI18n();
  const heading = variant === "home" ? t.processHome : t.processCases;

  return (
    <section className={`${sectionY} ${variant === "cases" ? "bg-[#111A2E]" : ""}`}>
      <div className={container}>
        <Reveal>
          <p className={eyebrow}>{heading.eyebrow}</p>
          <h2 className="mb-3.5 mt-2 text-[clamp(24px,2.8vw,36px)] font-bold leading-[1.3]">{heading.title}</h2>
          {variant === "home" ? (
            <p className="mb-11 max-w-[40em] text-[#CBD5E1]">{t.processHome.lead}</p>
          ) : (
            <div className="h-[30px]" />
          )}
        </Reveal>
        <div className="grid grid-cols-4 gap-[22px] max-[1000px]:grid-cols-2 max-[560px]:grid-cols-1">
          {t.steps.map((step, index) => (
            <Reveal key={step.n} delay={index * 0.05} className="h-full">
              <article className={`${card} h-full`}>
                <div className="text-[40px] font-extrabold leading-none">
                  <span className="grad-text">{step.n}</span>
                </div>
                <h3 className="mb-2.5 mt-3.5 text-[19px] font-bold">{step.title}</h3>
                <p className="text-[#CBD5E1]">{step.body}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
