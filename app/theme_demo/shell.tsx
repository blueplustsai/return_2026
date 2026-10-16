"use client";

import { useEffect, type ReactNode } from "react";
import "./shell.css";

export function ThemeDemoShell({ children }: { children: ReactNode }) {
  useEffect(() => {
    const shell = document.querySelector(".theme-demo-shell");
    const touched: HTMLElement[] = [];
    document.querySelectorAll("body > *").forEach((node) => {
      if (!(node instanceof HTMLElement)) return;
      if (shell && node.contains(shell)) return;
      if (node.tagName === "SCRIPT" || node.tagName === "LINK" || node.tagName === "STYLE") return;
      node.setAttribute("inert", "");
      node.setAttribute("data-theme-demo-hidden", "");
      touched.push(node);
    });
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const previousLang = document.documentElement.lang;
    document.documentElement.lang = "en";
    return () => {
      touched.forEach((node) => {
        node.removeAttribute("inert");
        node.removeAttribute("data-theme-demo-hidden");
      });
      document.body.style.overflow = previous;
      document.documentElement.lang = previousLang;
    };
  }, []);

  return (
    <div className="theme-demo-shell">
      <div className="theme-demo-frame" id="theme-demo-scroll">
        {children}
      </div>
    </div>
  );
}
