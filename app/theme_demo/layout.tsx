import type { ReactNode } from "react";
import { ThemeDemoShell } from "./shell";

export default function ThemeDemoLayout({ children }: { children: ReactNode }) {
  return <ThemeDemoShell>{children}</ThemeDemoShell>;
}
