"use client";

import { Reveal } from "@/components/Reveal";
import { useI18n } from "@/components/Language";
import { btnPrimary, btnSecondary, card, container, sectionY } from "@/lib/styles";

export function PricingTable() {
  const { t } = useI18n();

  return (
    <section className={sectionY}>
      <div className={container}>
        <div className="grid grid-cols-3 items-stretch gap-[22px] max-[1000px]:grid-cols-1">
          {t.plans.map((plan, index) => {
            const recommended = plan.id === "standard";
            return (
              <Reveal key={plan.id} delay={index * 0.05} className="h-full">
                <article
                  className={`${card} flex h-full flex-col ${
                    recommended
                      ? "relative z-10 border-2 border-[#8B5CF6] bg-[#222c45] shadow-[0_0_40px_rgba(139,92,246,0.3)] min-[1001px]:scale-[1.04]"
                      : ""
                  }`}
                >
                  {recommended ? (
                    <span className="mb-2.5 self-start rounded-full bg-gradient-to-r from-[#3B82F6] to-[#8B5CF6] px-3 py-[3px] text-xs text-white">
                      {t.pricing.recommend}
                    </span>
                  ) : null}
                  <h3 className="mb-2.5 text-[19px] font-bold">{plan.name}</h3>
                  <p className="text-sm text-[#CBD5E1]">{plan.positioning}</p>
                  <ul className="mb-[22px] mt-[18px] flex-1">
                    {plan.items.map((item) => (
                      <li key={item} className="border-t border-[#334155] py-2 text-[#CBD5E1]">
                        <span className="text-[#60A5FA]">✓ </span>
                        {item}
                      </li>
                    ))}
                  </ul>
                  <p className="text-sm text-[#CBD5E1]">{t.pricing.timelineLabel}</p>
                  <p className="mt-1.5 text-[22px] font-bold">{plan.timeline}</p>
                  <p className="mb-[18px] mt-2 text-sm text-[#CBD5E1]">{t.pricing.price}</p>
                  <a href="#contact" className={`${recommended ? btnPrimary : btnSecondary} self-start`}>
                    {plan.cta}
                  </a>
                </article>
              </Reveal>
            );
          })}
        </div>
        <div className="mt-[50px] overflow-x-auto max-[820px]:hidden">
          <table className="compare-table w-full border-collapse text-[15px]">
            <thead>
              <tr>
                <th className="border-b border-[#334155] p-3.5 text-left align-top font-semibold">
                  {t.pricing.compareItem}
                </th>
                {t.plans.map((plan) => (
                  <th key={plan.id} className="border-b border-[#334155] p-3.5 text-left align-top font-semibold">
                    {plan.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row" className="border-b border-[#334155] p-3.5 text-left align-top font-semibold">
                  {t.pricing.comparePosition}
                </th>
                {t.plans.map((plan) => (
                  <td key={plan.id} className="border-b border-[#334155] p-3.5 text-left align-top">
                    {plan.positioning}
                  </td>
                ))}
              </tr>
              <tr>
                <th scope="row" className="border-b border-[#334155] p-3.5 text-left align-top font-semibold">
                  {t.pricing.compareIncludes}
                </th>
                {t.plans.map((plan) => (
                  <td key={plan.id} className="border-b border-[#334155] p-3.5 text-left align-top">
                    {plan.items.map((item) => (
                      <span key={item} className="block">
                        {item}
                      </span>
                    ))}
                  </td>
                ))}
              </tr>
              <tr>
                <th scope="row" className="border-b border-[#334155] p-3.5 text-left align-top font-semibold">
                  {t.pricing.compareTimeline}
                </th>
                {t.plans.map((plan) => (
                  <td key={plan.id} className="border-b border-[#334155] p-3.5 text-left align-top">
                    {plan.timeline}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
