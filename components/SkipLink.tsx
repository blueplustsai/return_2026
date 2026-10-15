"use client";

import { useI18n } from "@/components/Language";

export function SkipLink() {
  const { t } = useI18n();
  return (
    <a
      href="#content"
      className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[80] focus:rounded-lg focus:bg-[#1E293B] focus:px-4 focus:py-2 focus:text-white"
    >
      {t.skip}
    </a>
  );
}
