"use client";

import { Reveal } from "@/components/Reveal";
import { useI18n } from "@/components/Language";
import { container, sectionY } from "@/lib/styles";
import { WrapText } from "@/components/WrapText";

export function PainPoints() {
  const { t } = useI18n();

  return (
    <section className={`${sectionY} bg-[#F8FAFC] text-[#334155]`}>
      <div className={container}>
        <Reveal>
          <div className="mx-auto mb-11 max-w-[720px] text-center">
            <p className="text-sm font-semibold tracking-[0.12em] text-[#4F46E5]">{t.pain.eyebrow}</p>
            <h2 className="mb-3.5 mt-2 text-[clamp(24px,2.8vw,36px)] font-bold leading-[1.3] text-[#0F172A]">{t.pain.title}</h2>
            <p>{t.pain.lead}</p>
          </div>
        </Reveal>
        <div className="grid grid-cols-2 items-start gap-6 text-left max-[820px]:grid-cols-1">
          <article className="rounded-2xl border border-[#E2E8F0] bg-[#F1F5F9] p-7">
            <h3 className="mb-[18px] flex items-center gap-2.5 text-xl font-bold text-[#475569]">{t.pain.oldTitle}</h3>
            <ul className="m-0 grid list-none p-0">
              {t.pain.old.map((item) => (
                <li key={item} className="flex items-start gap-3 border-t border-[#E2E8F0] py-3.5 text-[#475569] first:border-t-0">
                  <span className="mt-0.5 w-4 shrink-0 text-center text-[#94A3B8]" aria-hidden="true">
                    ✕
                  </span>
                  <span>
                    <WrapText text={item} variant="copy" />
                  </span>
                </li>
              ))}
            </ul>
          </article>
          <article className="rounded-2xl border-2 border-[#4F46E5] bg-white p-7 shadow-[0_4px_20px_rgba(15,23,42,0.06)]">
            <h3 className="mb-[18px] flex items-center gap-2.5 text-xl font-bold text-[#4F46E5]">{t.pain.newTitle}</h3>
            <ul className="m-0 grid list-none p-0">
              {t.pain.new.map((item) => (
                <li key={item} className="flex items-start gap-3 border-t border-[#E2E8F0] py-3.5 first:border-t-0">
                  <span className="mt-0.5 w-4 shrink-0 text-center font-bold text-[#4F46E5]" aria-hidden="true">
                    ✓
                  </span>
                  <span>
                    <WrapText text={item} variant="copy" />
                  </span>
                </li>
              ))}
            </ul>
          </article>
        </div>
      </div>
    </section>
  );
}
