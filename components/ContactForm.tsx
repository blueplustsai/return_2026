"use client";

import { useState, type FormEvent } from "react";
import { ExampleBadge } from "@/components/ExampleBadge";
import { useI18n } from "@/components/Language";
import { btnPrimary, card, eyebrow, sectionY } from "@/lib/styles";

type FormStatus = {
  status: "idle" | "success" | "error";
  message: string;
};

const initialState: FormStatus = { status: "idle", message: "" };
const codes = ["ok", "name", "company", "email", "plan", "problem", "error"] as const;
type FormCode = (typeof codes)[number];

function isFormCode(value: string): value is FormCode {
  return (codes as readonly string[]).includes(value);
}

export function ContactForm() {
  const { t } = useI18n();
  const [state, setState] = useState<FormStatus>(initialState);
  const [pending, setPending] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    setPending(true);
    try {
      const response = await fetch("/contact.php", {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" },
      });
      const payload = (await response.json().catch(() => null)) as { code?: unknown } | null;
      const code = typeof payload?.code === "string" && isFormCode(payload.code) ? payload.code : "error";
      if (code === "ok") {
        setState({ status: "success", message: t.form.ok });
        form.reset();
        return;
      }
      setState({ status: "error", message: t.form[code] });
    } catch {
      setState({ status: "error", message: t.form.error });
    } finally {
      setPending(false);
    }
  }

  return (
    <section id="contact" className={`${sectionY} scroll-mt-24 bg-[#111A2E]`}>
      <div className="mx-auto w-[min(720px,88vw)]">
        <p className={eyebrow}>{t.contact.eyebrow}</p>
        <h2 className="mb-3.5 mt-2 text-[clamp(24px,2.8vw,36px)] font-bold leading-[1.3]">{t.contact.title}</h2>
        <p className="mb-11 max-w-[40em] text-[#CBD5E1]">
          {t.contact.lead}
          <ExampleBadge />
        </p>
        <form onSubmit={onSubmit} className={`${card} grid gap-3.5`} noValidate>
          <div className="sr-only" aria-hidden="true">
            <label>
              Website
              <input name="company_website" tabIndex={-1} autoComplete="off" />
            </label>
          </div>
          {state.status !== "idle" ? (
            <p role={state.status === "error" ? "alert" : "status"} className={state.status === "error" ? "text-[#FCA5A5]" : "text-[#BBF7D0]"}>
              {state.message}
            </p>
          ) : null}
          <div className="grid grid-cols-2 gap-3.5 max-[820px]:grid-cols-1">
            <label className="field-label" htmlFor="contact-name">
              {t.contact.name}
              <input id="contact-name" className="field" name="name" autoComplete="name" required maxLength={80} />
            </label>
            <label className="field-label" htmlFor="contact-company">
              {t.contact.company}
              <input id="contact-company" className="field" name="company" autoComplete="organization" maxLength={120} />
            </label>
          </div>
          <div className="grid grid-cols-2 gap-3.5 max-[820px]:grid-cols-1">
            <label className="field-label" htmlFor="contact-email">
              {t.contact.email}
              <input id="contact-email" className="field" name="email" type="email" autoComplete="email" required maxLength={200} />
            </label>
            <label className="field-label" htmlFor="contact-plan">
              {t.contact.plan}
              <select id="contact-plan" className="field" name="plan" defaultValue="standard" required>
                {t.plans.map((plan) => (
                  <option key={plan.id} value={plan.id}>
                    {plan.name}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <label className="field-label" htmlFor="contact-problem">
            {t.contact.problem}
            <textarea id="contact-problem" className="field min-h-28 resize-y" name="problem" rows={4} required maxLength={2000} />
          </label>
          <button type="submit" className={`${btnPrimary} self-start`} disabled={pending}>
            {pending ? t.contact.sending : t.contact.submit}
          </button>
        </form>
      </div>
    </section>
  );
}
