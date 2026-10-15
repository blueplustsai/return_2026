"use client";

import { Check, X } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { useI18n } from "@/components/Language";
import { container, eyebrow, sectionY } from "@/lib/styles";
import { WrapText } from "@/components/WrapText";

export function PainPoints() {
  const { t } = useI18n();

  return (
    <section className={sectionY}>
      <div className={container}>
        <Reveal>
          <p className={eyebrow}>{t.pain.eyebrow}</p>
          <h2 className="mb-3.5 mt-2 text-[clamp(24px,2.8vw,36px)] font-bold leading-[1.3]">{t.pain.title}</h2>
          <p className="mb-11 max-w-[40em] text-[#CBD5E1]">{t.pain.lead}</p>
        </Reveal>
        <div className="grid grid-cols-2 overflow-hidden rounded-[18px] border border-[#334155] max-[820px]:grid-cols-1">
          <div className="bg-[#172033] p-[30px]">
            <h3 className="mb-[18px] text-[15px] font-semibold tracking-[0.1em] text-[#CBD5E1]">{t.pain.oldTitle}</h3>
            {t.pain.old.map((item) => (
              <div key={item} className="flex min-h-[84px] items-start gap-3 border-t border-[#334155] py-4 text-[#CBD5E1]">
                <X className="mt-1 size-[18px] shrink-0" aria-hidden="true" strokeWidth={2.4} />
                <span>
                  <WrapText text={item} variant="copy" />
                </span>
              </div>
            ))}
          </div>
          <div className="bg-[linear-gradient(160deg,#1E293B,#24204a)] p-[30px]">
            <h3 className="mb-[18px] text-[15px] font-semibold tracking-[0.1em] text-[#A78BFA]">{t.pain.newTitle}</h3>
            {t.pain.new.map((item) => (
              <div key={item} className="flex min-h-[84px] items-start gap-3 border-t border-[#334155] py-4 text-[#F1F5F9]">
                <Check className="mt-1 size-[18px] shrink-0 text-[#60A5FA]" aria-hidden="true" strokeWidth={2.4} />
                <span>
                  <WrapText text={item} variant="copy" />
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
