"use client";

import { FileText } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { ExampleBadge } from "@/components/ExampleBadge";
import { useI18n } from "@/components/Language";
import { container, eyebrow, sectionY } from "@/lib/styles";

const listVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.4 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" as const } },
};

function Bubble({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <motion.div className={className} variants={itemVariants}>
      {children}
    </motion.div>
  );
}

export function ChatScene() {
  const { t } = useI18n();
  const scene = t.chatScene;
  const reduce = useReducedMotion();
  const instant = reduce === true;

  return (
    <section className={`${sectionY} bg-[#111C33]`} aria-labelledby="chat-scene-title">
      <div className={`${container} grid grid-cols-[minmax(0,1fr)_380px] items-center gap-[72px] max-[860px]:grid-cols-1 max-[860px]:gap-10`}>
        <div>
          <p className={eyebrow}>{scene.eyebrow}</p>
          <h2 id="chat-scene-title" className="mb-[18px] mt-3 text-[clamp(26px,3vw,38px)] font-bold leading-[1.35]">
            {scene.titleBefore}
            <br />
            <span className="grad-text whitespace-nowrap">{scene.titleAccent}</span>
            {scene.titleAfter}
          </h2>
          <p className="max-w-[30em] text-[17px] leading-[1.8] text-[#CBD5E1]">{scene.lead}</p>
          <ol className="mt-7 grid list-none gap-3.5 p-0">
            {scene.points.map((point, index) => (
              <li key={point} className="flex items-start gap-3 text-base leading-relaxed text-[#E2E8F0]">
                <span className="grid size-[26px] shrink-0 place-items-center rounded-lg border border-[#334155] bg-[#1E293B] text-[13px] font-semibold text-[#93C5FD]">
                  {index + 1}
                </span>
                <span>{point}</span>
              </li>
            ))}
          </ol>
        </div>

        <div className="relative mx-auto w-[340px] max-[860px]:w-[300px]">
          <div className="rounded-[44px] border border-[#334155] bg-[#020617] p-3 shadow-[0_30px_80px_rgba(0,0,0,0.5),0_0_60px_rgba(99,102,241,0.25)]">
            <div className="overflow-hidden rounded-[34px] bg-[#8CABD9]">
              <div className="flex items-center gap-2.5 bg-[#1E293B] px-[18px] pb-3 pt-4 text-[15px] font-semibold text-[#F8FAFC]">
                <span className="grid size-[30px] shrink-0 place-items-center rounded-full bg-gradient-to-br from-[#3B82F6] to-[#8B5CF6] text-[13px]">
                  AI
                </span>
                <span>
                  {scene.brand}
                  <ExampleBadge>{scene.sample}</ExampleBadge>
                  <span className="ml-1">{scene.account}</span>
                  <small className="mt-0.5 flex items-center gap-1 text-[11px] font-normal text-[#86EFAC]">
                    <span className="inline-block size-1.5 rounded-full bg-[#86EFAC]" aria-hidden="true" />
                    {scene.online}
                  </small>
                </span>
              </div>
              <motion.div
                className="flex flex-col gap-2.5 bg-[#7494C0] px-3 pb-[18px] pt-3.5"
                initial={instant ? "show" : "hidden"}
                whileInView="show"
                viewport={{ once: true, amount: 0.25 }}
                variants={instant ? undefined : listVariants}
              >
                <Bubble className="self-center rounded-[10px] bg-[rgba(15,23,42,0.35)] px-2.5 py-[3px] text-[11px] text-white">
                  {scene.time}
                </Bubble>
                <Bubble className="max-w-[78%] self-end rounded-2xl rounded-tr-[4px] bg-[#86EFAC] px-3 py-[9px] text-[13.5px] leading-[1.55] text-[#0F172A]">
                  {scene.user1}
                </Bubble>
                <Bubble className="max-w-[78%] self-start rounded-2xl rounded-tl-[4px] bg-white px-3 py-[9px] text-[13.5px] leading-[1.55] text-[#0F172A]">
                  {scene.ai1.split("\n").map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                  <span className="mt-1.5 flex items-start gap-1 text-[11px] leading-snug text-[#4F46E5]">
                    <FileText className="mt-px size-3 shrink-0" aria-hidden="true" />
                    {scene.source}
                  </span>
                </Bubble>
                <Bubble className="max-w-[82%] self-start overflow-hidden rounded-[14px] bg-white text-[13px] text-[#0F172A]">
                  <div className="bg-[#EEF2FF] px-3 py-2.5 font-bold">{scene.cardTitle}</div>
                  <div className="px-3 py-2.5">
                    {scene.cardPrice}
                    <br />
                    {scene.cardShip}
                  </div>
                  <span className="block bg-gradient-to-r from-[#3B82F6] to-[#8B5CF6] px-3 py-[9px] text-center font-semibold text-white">
                    {scene.cardCta}
                  </span>
                </Bubble>
                <Bubble className="max-w-[78%] self-end rounded-2xl rounded-tr-[4px] bg-[#86EFAC] px-3 py-[9px] text-[13.5px] leading-[1.55] text-[#0F172A]">
                  {scene.user2}
                </Bubble>
                <Bubble className="max-w-[78%] self-start rounded-2xl rounded-tl-[4px] bg-white px-3 py-[9px] text-[13.5px] leading-[1.55] text-[#0F172A]">
                  {scene.ai2}
                </Bubble>
                <Bubble className="self-end text-[10px] text-[#E2E8F0]">{scene.read}</Bubble>
              </motion.div>
            </div>
          </div>
          <div className="absolute -right-20 -top-[18px] rounded-xl border border-[#8B5CF6] bg-[#1E293B] px-3.5 py-2.5 text-[13px] text-[#E2E8F0] shadow-[0_0_24px_rgba(139,92,246,0.35)] max-[860px]:hidden">
            <b className="block text-[15px] text-[#F8FAFC]">{scene.speedValue}</b>
            {scene.speedLabel}
          </div>
          <div className="absolute -left-20 bottom-[110px] rounded-xl border border-[#334155] bg-[#1E293B] px-3.5 py-2.5 text-[13px] text-[#E2E8F0] max-[860px]:hidden">
            <b className="block text-[15px] text-[#F8FAFC]">{scene.handoffValue}</b>
            {scene.handoffLabel}
          </div>
        </div>
      </div>
    </section>
  );
}
