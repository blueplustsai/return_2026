"use server";

import { copy, isLang, type Lang } from "@/lib/content";

export type ContactState = {
  status: "idle" | "success" | "error";
  message: string;
};

const PLANS = new Set(["poc", "standard", "enterprise"]);

function clean(value: FormDataEntryValue | null, max: number) {
  return String(value ?? "")
    .replace(/[\u0000-\u001F\u007F]/g, "")
    .trim()
    .slice(0, max);
}

export async function submitConsultation(
  _previous: ContactState,
  formData: FormData,
): Promise<ContactState> {
  const requested = String(formData.get("lang") ?? "");
  const lang: Lang = isLang(requested) ? requested : "zh";
  const messages = copy[lang].form;

  try {
    if (String(formData.get("company_website") ?? "").trim()) {
      return { status: "success", message: messages.ok };
    }

    const name = clean(formData.get("name"), 81);
    const company = clean(formData.get("company"), 121);
    const email = clean(formData.get("email"), 201);
    const plan = String(formData.get("plan") ?? "");
    const problem = clean(formData.get("problem"), 2001);

    if (name.length < 1 || name.length > 80) {
      return { status: "error", message: messages.name };
    }
    if (company.length > 120) {
      return { status: "error", message: messages.company };
    }
    if (email.length > 200 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return { status: "error", message: messages.email };
    }
    if (!PLANS.has(plan)) {
      return { status: "error", message: messages.plan };
    }
    if (problem.length < 1 || problem.length > 2000) {
      return { status: "error", message: messages.problem };
    }

    return { status: "success", message: messages.ok };
  } catch {
    return { status: "error", message: messages.error };
  }
}
