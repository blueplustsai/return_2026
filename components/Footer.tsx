"use client";

import Link from "next/link";
import { ExampleBadge } from "@/components/ExampleBadge";
import { LogoMark } from "@/components/Navbar";
import { useI18n } from "@/components/Language";
import { container } from "@/lib/styles";

const links = [
  { href: "/solutions", key: "solutions" },
  { href: "/use-cases", key: "useCases" },
  { href: "/pricing", key: "pricing" },
  { href: "/about", key: "about" },
] as const;

export function Footer() {
  const { t } = useI18n();

  return (
    <footer className="border-t border-[#1E293B] bg-[#0B1222] py-14 pb-[30px] text-sm text-[#CBD5E1]">
      <div className={container}>
        <div className="grid grid-cols-[1.4fr_1fr_1fr_1fr] gap-[30px] max-[1000px]:grid-cols-2 max-[560px]:grid-cols-1">
          <div>
            <LogoMark />
            <p className="mt-3.5 max-w-[22em] text-[#CBD5E1]">{t.footer.blurb}</p>
          </div>
          <div>
            <p className="mb-3 font-bold text-white">{t.footer.quick}</p>
            <ul>
              {links.map((link) => (
                <li key={link.href} className="py-1">
                  <Link href={link.href} className="hover:text-white">
                    {t.nav[link.key]}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="mb-3 font-bold text-white">{t.footer.contact}</p>
            <ul>
              <li className="py-1">
                {t.footer.emailLabel}
                {t.footer.email}
                <ExampleBadge />
              </li>
              <li className="py-1">
                {t.footer.phoneLabel}
                {t.footer.phone}
                <ExampleBadge />
              </li>
              <li className="py-1">{t.footer.address}</li>
            </ul>
          </div>
          <div>
            <p className="mb-3 font-bold text-white">{t.footer.social}</p>
            <ul>
              {t.footer.socials.map((item) => (
                <li key={item} className="py-1">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-10 flex flex-wrap items-center justify-between gap-2.5 border-t border-[#1E293B] pt-5 text-[#CBD5E1]">
          <span>{t.footer.copy}</span>
          <span>
            <a href="#privacy" className="hover:text-white">
              {t.footer.privacy}
            </a>
            <span aria-hidden="true">　·　</span>
            <a href="#terms" className="hover:text-white">
              {t.footer.terms}
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
}
