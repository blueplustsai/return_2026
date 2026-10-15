"use client";

import { Menu, X } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, type MouseEvent } from "react";
import { useI18n } from "@/components/Language";
import { btnPrimary, container } from "@/lib/styles";

const links = [
  { href: "/solutions", key: "solutions" },
  { href: "/use-cases", key: "useCases" },
  { href: "/pricing", key: "pricing" },
  { href: "/about", key: "about" },
] as const;

function LogoMark() {
  return (
    <span className="grid h-[34px] w-[84px] place-items-center rounded-lg border-[1.5px] border-dashed border-[#64748B] text-xs font-bold tracking-[0.15em] text-[#CBD5E1]">
      LOGO
    </span>
  );
}

export function Navbar() {
  const { t, toggle } = useI18n();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const goContact = (event: MouseEvent<HTMLAnchorElement>) => {
    if (pathname === "/pricing") {
      event.preventDefault();
      document.getElementById("contact")?.scrollIntoView({ behavior: reduce ? "auto" : "smooth" });
      setOpen(false);
    }
  };

  return (
    <header className="sticky top-0 z-50 border-b border-[rgba(148,163,184,0.12)] bg-[rgba(15,23,42,0.82)] backdrop-blur-[12px]">
      <div className={`${container} flex h-[68px] items-center justify-between`}>
        <Link href="/" aria-label={t.nav.home} className="inline-flex">
          <LogoMark />
        </Link>
        <nav className="hidden items-center gap-7 text-[15px] text-[#CBD5E1] min-[901px]:flex" aria-label={t.nav.main}>
          {links.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={
                  active
                    ? "border-b-2 border-[#8B5CF6] pb-[3px] text-white"
                    : "transition-colors hover:text-white"
                }
              >
                {t.nav[link.key]}
              </Link>
            );
          })}
          <button
            type="button"
            onClick={toggle}
            aria-label={t.nav.lang}
            className="cursor-pointer rounded-lg border border-[#475569] bg-transparent px-2.5 py-[5px] text-[13px] text-[#E2E8F0]"
          >
            繁中 / EN
          </button>
          <Link href="/pricing#contact" onClick={goContact} className={`${btnPrimary} btn-nav`}>
            {t.nav.cta}
          </Link>
        </nav>
        <button
          type="button"
          className="cursor-pointer border-0 bg-transparent p-1 text-white min-[901px]:hidden"
          aria-label={open ? t.nav.closeMenu : t.nav.openMenu}
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>
      <AnimatePresence>
        {open ? (
          <motion.nav
            id="mobile-nav"
            aria-label={t.nav.main}
            className="flex flex-col gap-1.5 overflow-hidden border-t border-[#1E293B] px-[6vw] pb-[22px] pt-3 min-[901px]:hidden"
            initial={reduce ? false : { height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={reduce ? undefined : { height: 0, opacity: 0 }}
            transition={{ duration: 0.22 }}
          >
            {links.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  className={`border-b border-[#1E293B] py-3 ${active ? "text-white" : "text-[#CBD5E1]"}`}
                >
                  {t.nav[link.key]}
                </Link>
              );
            })}
            <button
              type="button"
              onClick={toggle}
              aria-label={t.nav.lang}
              className="mt-2.5 cursor-pointer self-start rounded-lg border border-[#475569] bg-transparent px-2.5 py-[5px] text-[13px] text-[#E2E8F0]"
            >
              繁中 / EN
            </button>
            <Link href="/pricing#contact" onClick={goContact} className={`${btnPrimary} mt-2.5 self-start`}>
              {t.nav.cta}
            </Link>
          </motion.nav>
        ) : null}
      </AnimatePresence>
    </header>
  );
}

export { LogoMark };
