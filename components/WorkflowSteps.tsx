"use client";

import { Reveal } from "@/components/Reveal";
import { useI18n } from "@/components/Language";
import { card, container, eyebrow, sectionY } from "@/lib/styles";
import { WrapText } from "@/components/WrapText";

export function WorkflowSteps({ variant }: { variant: "home" | "cases" }) {
  const { t } = useI18n();
  const heading = variant === "home" ? t.processHome : t.processCases;

  const light = variant === "home";

  return (
    <section className={`${sectionY} ${light ? "bg-[#F8FAFC] text-[#334155]" : "bg-[#111A2E]"}`}>
      <div className={container}>
        <Reveal>
          <div className={light ? "mx-auto mb-11 max-w-[720px] text-center" : ""}>
            <p className={light ? "text-sm font-semibold tracking-[0.12em] text-[#4F46E5]" : eyebrow}>{heading.eyebrow}</p>
            <h2 className={`mb-3.5 mt-2 text-[clamp(24px,2.8vw,36px)] font-bold leading-[1.3] ${light ? "text-[#0F172A]" : ""}`}>
              {heading.title}
            </h2>
            {light ? <p>{t.processHome.lead}</p> : <div className="h-[30px]" />}
          </div>
        </Reveal>
        <div className="grid grid-cols-4 gap-[22px] max-[1000px]:grid-cols-2 max-[560px]:grid-cols-1">
          {t.steps.map((step, index) => (
            <Reveal key={step.n} delay={index * 0.05} className="relative h-full">
              <article
                className={
                  light
                    ? "h-full rounded-2xl border border-[#E2E8F0] bg-white p-7 shadow-[0_4px_20px_rgba(15,23,42,0.06)]"
                    : `${card} h-full`
                }
              >
                <div className={`text-[40px] font-extrabold leading-none ${light ? "text-[#4F46E5]" : ""}`}>
                  {light ? step.n : <span className="grad-text">{step.n}</span>}
                </div>
                <h3 className={`mb-2.5 mt-3.5 text-[19px] font-bold ${light ? "text-[#0F172A]" : ""}`}>
                  <WrapText text={step.title} variant="title" />
                </h3>
                <p className={light ? "" : "text-[#CBD5E1]"}>
                  <WrapText text={step.body} variant="copy" />
                </p>
              </article>
              {light && index < t.steps.length - 1 ? (
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute top-10 -right-[18px] z-[1] hidden text-lg leading-none text-[#A5B4FC] min-[1001px]:block"
                >
                  →
                </span>
              ) : null}
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
