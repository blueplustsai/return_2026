"use client";

import { IconTile } from "@/components/IconTile";
import { Reveal } from "@/components/Reveal";
import { useI18n } from "@/components/Language";
import { card, container, eyebrow, sectionY } from "@/lib/styles";

export function SolutionModules() {
  const { t } = useI18n();

  return (
    <section className={`${sectionY} bg-[#111A2E]`}>
      <div className={container}>
        <Reveal>
          <p className={eyebrow}>{t.modulesHeading.eyebrow}</p>
          <h2 className="mb-3.5 mt-2 text-[clamp(24px,2.8vw,36px)] font-bold leading-[1.3]">
            {t.modulesHeading.title}
          </h2>
          <div className="h-[30px]" />
        </Reveal>
        <div className="space-y-[22px]">
          {t.modules.map((module, index) => (
            <Reveal key={module.id} delay={index * 0.04}>
              <article className={`${card} grid grid-cols-[auto_minmax(0,1fr)_minmax(0,1fr)] gap-7 max-[820px]:grid-cols-1 max-[820px]:gap-4`}>
                <IconTile className="size-[58px] text-2xl font-extrabold">{module.id}</IconTile>
                <div>
                  <p className={eyebrow}>{module.kicker}</p>
                  <h3 className="mb-3 mt-1.5 text-[22px] font-bold">{module.title}</h3>
                  <ul>
                    {module.points.map((point) => (
                      <li key={point} className="py-1 text-[#CBD5E1]">
                        ✓ {point}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="mb-1 text-[15px] font-bold text-[#CBD5E1]">{t.scenarioLabel}</h3>
                  {module.tags.map((tag) => (
                    <span
                      key={tag}
                      className="mb-0 mr-1.5 mt-1 inline-block max-w-full rounded-full border border-[#334155] bg-[#0F172A] px-2.5 py-[3px] text-xs text-[#CBD5E1]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
