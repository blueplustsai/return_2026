"use client";

import { useEffect, useId, useMemo, useRef, useState, type FormEvent, type ReactNode } from "react";

const projects = [
  { cat: "Frames", years: "2025 / 2026", title: "Harbor Evenings", tone: "tg-m1", note: "A dusk series along a working pier, shot while the last ferries still crossed." },
  { cat: "Studio", years: "2024", title: "Quiet Alloy", tone: "tg-m2", note: "Objects, metal, and one window. A still-life study made over four afternoons." },
  { cat: "Field", years: "2026", title: "City Footpaths", tone: "tg-m3", note: "Walking routes mapped by light rather than by street name, from dawn into noon." },
  { cat: "Field", years: "2026", title: "Ridge Walkers", tone: "tg-m4", note: "Three hikers, one ridge, and weather that refused to stay in the forecast." },
  { cat: "Trial", years: "2026", title: "Amber Current", tone: "tg-m5", note: "Liquid, glass, and a slow shutter. An experiment that became a short series." },
  { cat: "Night", years: "2025", title: "Past Eleven", tone: "tg-m6", note: "Rooms that only make sense after the street outside has gone quiet." },
];

const services = [
  {
    n: "01",
    title: "Direction",
    price: "$1000 – $5000",
    time: "5 – 10 days",
    points: ["Audience mapping", "Offer framing", "Search groundwork", "Story outline", "Result checks"],
  },
  {
    n: "02",
    title: "Identity",
    price: "$2000 – $10000",
    time: "3 – 7 days",
    points: ["Name and mark", "Logo studies", "Voice notes", "Image set", "Brand booklet"],
  },
  {
    n: "03",
    title: "Interface",
    price: "From $500",
    time: "From 3 days",
    points: ["Screen layouts", "Small-screen fit", "Type and color rules", "Control polish"],
  },
  {
    n: "04",
    title: "Advisory",
    price: "$100 / hour",
    time: "Min. 2 hours",
    points: ["Visitor interviews", "Task reviews", "Sketch flows", "Experience audit"],
  },
  {
    n: "05",
    title: "Models",
    price: "$50 / hour",
    time: "Min. 8 hours",
    points: ["Early concepts", "Wire sketches", "Clickable samples", "Trial sessions", "Next-round edits"],
  },
];

const menuGroups = [
  {
    title: "Wide frames",
    links: ["Wide frame", "Wide frame / ribbon", "Endless index", "Endless index / ribbon"],
  },
  {
    title: "Homepages",
    links: ["Layout one", "Layout two", "Layout three"],
  },
  {
    title: "Project notes",
    links: projects.map((item) => item.title),
  },
  {
    title: "Project grids",
    links: ["Grid / two columns", "Grid / three columns"],
  },
  {
    title: "Inner pages",
    links: ["About / compact", "About / full", "Contact", "Contact full", "Menu / vertical", "Menu / horizontal", "Notes"],
  },
];

const budgets = ["Under $10,000", "$10,000 to $20,000", "$20,000 to $50,000", "Above $50,000"];

type FormState = {
  name: string;
  email: string;
  budget: string;
  message: string;
  agree: boolean;
};

const emptyForm: FormState = { name: "", email: "", budget: "", message: "", agree: false };

function scrollerOf(node: HTMLElement | null) {
  return node?.closest(".theme-demo-frame") as HTMLElement | null;
}

function scrollToId(id: string) {
  const target = document.getElementById(id);
  const scroller = scrollerOf(target);
  if (!target || !scroller) return;
  const top = target.getBoundingClientRect().top - scroller.getBoundingClientRect().top + scroller.scrollTop - 78;
  scroller.scrollTo({ top, behavior: "smooth" });
}

function Arrow() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
      <path d="M3 8h10M9 4l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  );
}

function InquiryForm({
  idPrefix,
  onDone,
}: {
  idPrefix: string;
  onDone: () => void;
}) {
  const [form, setForm] = useState<FormState>(emptyForm);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [done, setDone] = useState(false);

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  function submit(event: FormEvent) {
    event.preventDefault();
    const next: Partial<Record<keyof FormState, string>> = {};
    if (form.name.trim().length < 2) next.name = "Add a name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) next.email = "Use a valid email.";
    if (!form.budget) next.budget = "Choose a range.";
    if (form.message.trim().length < 12) next.message = "Add a short brief.";
    if (!form.agree) next.agree = "Please confirm the studio notes.";
    setErrors(next);
    if (Object.keys(next).length) return;
    setDone(true);
    onDone();
  }

  if (done) {
    return (
      <div className="tg-success" role="status">
        <i>✓</i>
        <h3>Message received</h3>
        <p>This preview stores nothing. A real studio would reply from here.</p>
      </div>
    );
  }

  return (
    <form className="tg-form" onSubmit={submit} noValidate>
      <label>
        Your name
        <input id={`${idPrefix}-name`} value={form.name} onChange={(event) => update("name", event.target.value)} autoComplete="name" />
        {errors.name ? <span className="tg-error">{errors.name}</span> : null}
      </label>
      <label>
        Your email
        <input id={`${idPrefix}-email`} type="email" value={form.email} onChange={(event) => update("email", event.target.value)} autoComplete="email" />
        {errors.email ? <span className="tg-error">{errors.email}</span> : null}
      </label>
      <label>
        Project range
        <select id={`${idPrefix}-budget`} value={form.budget} onChange={(event) => update("budget", event.target.value)}>
          <option value="">Select a range</option>
          {budgets.map((item) => (
            <option key={item}>{item}</option>
          ))}
        </select>
        {errors.budget ? <span className="tg-error">{errors.budget}</span> : null}
      </label>
      <label>
        Describe the work
        <textarea id={`${idPrefix}-message`} value={form.message} onChange={(event) => update("message", event.target.value)} />
        {errors.message ? <span className="tg-error">{errors.message}</span> : null}
      </label>
      <label className="tg-check">
        <input type="checkbox" checked={form.agree} onChange={(event) => update("agree", event.target.checked)} />
        <span>I agree to the studio notes</span>
      </label>
      {errors.agree ? <span className="tg-error">{errors.agree}</span> : null}
      <button className="tg-pill tg-submit" type="submit">
        Send message
      </button>
    </form>
  );
}

function Marquee({ label }: { label: string }) {
  const items = Array.from({ length: 8 }, (_, index) => (
    <span key={index} aria-hidden={index > 0}>
      {label} <em>✦</em>
    </span>
  ));
  return (
    <div className="tg-mq">
      <div className="tg-mq-track">
        {items}
        {items.map((item, index) => (
          <span key={`b-${index}`} aria-hidden="true">
            {label} <em>✦</em>
          </span>
        ))}
      </div>
    </div>
  );
}

function Overlay({ title, onClose, children }: { title: string; onClose: () => void; children: ReactNode }) {
  const titleId = useId();
  const closeRef = useRef<HTMLButtonElement>(null);
  const closeRefFn = useRef(onClose);
  closeRefFn.current = onClose;
  useEffect(() => {
    closeRef.current?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeRefFn.current();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);
  return (
    <div role="dialog" aria-modal="true" aria-labelledby={titleId}>
      <div className="tg-panel-head">
        <h3 id={titleId}>{title}</h3>
        <button ref={closeRef} className="tg-close" type="button" onClick={onClose} aria-label="Close">
          ×
        </button>
      </div>
      {children}
    </div>
  );
}

export function TriggerPage() {
  const rootRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const [menu, setMenu] = useState(false);
  const [quote, setQuote] = useState(false);
  const [project, setProject] = useState<(typeof projects)[number] | null>(null);
  const [openService, setOpenService] = useState<string | null>(services[0]?.title ?? null);
  const [clock, setClock] = useState("––:––");
  const [meridiem, setMeridiem] = useState("");
  const [boot, setBoot] = useState(0);
  const [booting, setBooting] = useState(true);
  const [solid, setSolid] = useState(false);
  const [showTop, setShowTop] = useState(false);
  const [fine, setFine] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setBooting(false);
      return;
    }
    const started = performance.now();
    let frame = 0;
    const tick = (now: number) => {
      const progress = Math.min(1, (now - started) / 1100);
      setBoot(Math.round(progress * 100));
      if (progress < 1) frame = requestAnimationFrame(tick);
      else window.setTimeout(() => setBooting(false), 280);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    const format = () => {
      const parts = new Intl.DateTimeFormat("en-US", {
        timeZone: "America/Los_Angeles",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      }).formatToParts(new Date());
      const hour = parts.find((part) => part.type === "hour")?.value ?? "";
      const minute = parts.find((part) => part.type === "minute")?.value ?? "";
      const day = parts.find((part) => part.type === "dayPeriod")?.value ?? "";
      setClock(`${hour}:${minute}`);
      setMeridiem(day.toUpperCase());
    };
    format();
    const id = window.setInterval(format, 1000);
    return () => window.clearInterval(id);
  }, []);

  useEffect(() => {
    const frame = scrollerOf(rootRef.current);
    if (!frame) return;
    const onScroll = () => {
      setSolid(frame.scrollTop > 24);
      setShowTop(frame.scrollTop > 700);
    };
    onScroll();
    frame.addEventListener("scroll", onScroll, { passive: true });
    return () => frame.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    setFine(finePointer);
    if (!finePointer) return;
    const node = cursorRef.current;
    if (!node) return;
    const move = (event: MouseEvent) => {
      node.style.transform = `translate(${event.clientX}px, ${event.clientY}px)`;
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  useEffect(() => {
    const frame = scrollerOf(rootRef.current);
    if (!frame) return;
    frame.style.overflow = menu || quote || project ? "hidden" : "";
  }, [menu, quote, project]);

  const invert = menu;
  const year = useMemo(() => new Date().getFullYear(), []);

  function go(id: string) {
    setMenu(false);
    setQuote(false);
    setProject(null);
    window.setTimeout(() => scrollToId(id), 40);
  }

  return (
    <div ref={rootRef} className={fine ? "is-fine" : undefined}>
      <div ref={cursorRef} className="tg-cursor" aria-hidden="true" />
      <div className={booting ? "tg-boot" : "tg-boot is-done"} aria-hidden={!booting}>
        <span className="tg-boot-count">{String(boot).padStart(2, "0")}</span>
      </div>

      <header className={`tg-header${solid && !invert ? " is-solid" : ""}${invert ? " is-invert" : ""}`}>
        <a className="tg-logo" href="#top" onClick={(event) => { event.preventDefault(); go("top"); }}>
          <strong>Adrian Kessler</strong>
          <span>Photographer</span>
        </a>
        <div className="tg-header-actions">
          <p className="tg-status">
            <i className="tg-dot" aria-hidden="true" />
            <span className="tg-status-label">Open for freelance</span>
          </p>
          <button className="tg-pill" type="button" onClick={() => { setMenu(false); setQuote(true); }}>
            <span className="tg-quote-label">Request a quote</span>
            <span className="tg-quote-icon" aria-hidden="true">+</span>
          </button>
          <button className={`tg-burger${menu ? " is-open" : ""}`} type="button" aria-expanded={menu} aria-label={menu ? "Close menu" : "Open menu"} onClick={() => { setQuote(false); setMenu((value) => !value); }}>
            <span />
            <span />
          </button>
        </div>
      </header>

      {menu ? (
        <nav className="tg-menu" aria-label="Primary">
          <div className="tg-menu-grid">
            <div className="tg-menu-primary">
              <button type="button" onClick={() => go("works")}>Works</button>
              <button type="button" onClick={() => go("services")}>Services</button>
              <button type="button" onClick={() => go("contact")}>Contact</button>
            </div>
            <div className="tg-menu-groups">
              {menuGroups.map((group) => (
                <div key={group.title}>
                  <h2>{group.title}</h2>
                  {group.links.map((link) => {
                    const match = projects.find((item) => item.title === link);
                    const current = link === "Layout two";
                    return (
                      <button
                        key={link}
                        type="button"
                        className={current ? "is-current" : undefined}
                        onClick={() => {
                          if (match) {
                            setMenu(false);
                            setProject(match);
                            return;
                          }
                          if (link.startsWith("About") || link === "Notes") go("services");
                          else if (link.startsWith("Contact") || link.startsWith("Menu")) go("contact");
                          else go("works");
                        }}
                      >
                        {link}
                      </button>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </nav>
      ) : null}

      {quote ? (
        <div className="tg-modal">
          <div className="tg-panel">
            <Overlay title="Request a quote" onClose={() => setQuote(false)}>
              <InquiryForm idPrefix="quote" onDone={() => undefined} />
            </Overlay>
          </div>
        </div>
      ) : null}

      <main id="top">
        <section className="tg-open" id="works" aria-label="Selected works">
          <div className="tg-wall">
            <div className="tg-wall-col">
              {projects.filter((_, index) => index % 2 === 0).map((item) => (
                <button key={item.title} className={`tg-tile ${item.tone}`} type="button" onClick={() => setProject(item)}>
                  <span>{item.cat}</span>
                  <strong>{item.title}</strong>
                </button>
              ))}
            </div>
            <div className="tg-wall-col is-offset">
              {projects.filter((_, index) => index % 2 === 1).map((item) => (
                <button key={item.title} className={`tg-tile ${item.tone}`} type="button" onClick={() => setProject(item)}>
                  <span>{item.cat}</span>
                  <strong>{item.title}</strong>
                </button>
              ))}
            </div>
          </div>
          <div className="tg-namepanel">
            <h1 className="tg-title">
              <span>Adrian</span>
              <span>Kessler</span>
            </h1>
            <p className="tg-role">
              Studio photographer
              <br />
              and art director
            </p>
            <div className="tg-hero-foot">
              <div className="tg-hero-meta">
                <div>
                  Selected works
                  <br />
                  2023 – 2026
                </div>
                <div>
                  Now based in Portland, OR,
                  <br />
                  <span className="tg-clock">
                    <b>{clock}</b>
                    <span className="tg-colon"> </span>
                    {meridiem}
                  </span>
                </div>
              </div>
              <button className="tg-scroll" type="button" onClick={() => scrollToId("services")}>
                Scroll <i />
              </button>
            </div>
          </div>
        </section>

        <section className="tg-section tg-services" id="services" aria-labelledby="services-title">
          <h2 id="services-title" style={{ position: "absolute", width: 1, height: 1, overflow: "hidden" }}>
            Services
          </h2>
          <Marquee label="My services" />
          {services.map((item) => {
            const open = openService === item.title;
            return (
              <article key={item.title} className={`tg-service${open ? " is-open" : ""}`}>
                <button className="tg-service-name" type="button" aria-expanded={open} onClick={() => setOpenService(open ? null : item.title)}>
                  <span className="tg-go">
                    <Arrow />
                  </span>
                  <span className="tg-service-copy">
                    <small>{item.n}</small>
                    <b>{item.title}</b>
                  </span>
                </button>
                <div className="tg-tags">
                  <span>{item.price}</span>
                  <span>{item.time}</span>
                </div>
                <ul className="tg-features">
                  {item.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </article>
            );
          })}
        </section>

        <section className="tg-section" id="contact" aria-labelledby="contact-title">
          <h2 id="contact-title" style={{ position: "absolute", width: 1, height: 1, overflow: "hidden" }}>
            Contacts
          </h2>
          <Marquee label="Contacts" />
          <div className="tg-contact">
          <div>
            <div className="tg-facts">
              <p>
                <span>Email</span>
                <strong>studio@example.com</strong>
              </p>
              <p>
                <span>Phone</span>
                <strong>+1 503 555 0148</strong>
              </p>
              <p>
                <span>Office</span>
                <strong>
                  18 Pine Street
                  <br />
                  Riverbend
                  <br />
                  OR 97214
                </strong>
              </p>
            </div>
          </div>
          <InquiryForm idPrefix="contact" onDone={() => undefined} />
          </div>
        </section>
      </main>

      <footer className="tg-footer">
        <div className="tg-footer-top">
          <p>Open for a new commission?</p>
          <a className="tg-pill" href="mailto:hello@example.com">
            hello@example.com
          </a>
        </div>
        <ul className="tg-socials">
          <li><a href="#contact" onClick={(event) => { event.preventDefault(); go("contact"); }}>Be</a></li>
          <li><a href="#contact" onClick={(event) => { event.preventDefault(); go("contact"); }}>Ig</a></li>
          <li><a href="#contact" onClick={(event) => { event.preventDefault(); go("contact"); }}>Dr</a></li>
        </ul>
        <div className="tg-footer-bottom">
          <strong>Adrian Kessler</strong>
          <div className="tg-footer-links">
            <button type="button" onClick={() => go("contact")}>Privacy notes</button>
            <button type="button" onClick={() => go("contact")}>Terms</button>
          </div>
          <span>© {year} Northline — portfolio layout study.</span>
          <button className="tg-pill" type="button" onClick={() => go("works")}>
            View the archive
          </button>
          {showTop ? (
            <button className="tg-top" type="button" onClick={() => go("top")} aria-label="Scroll up">
              ↑
            </button>
          ) : null}
        </div>
      </footer>

      {project ? (
        <div className="tg-detail">
          <div className="tg-detail-card" role="dialog" aria-modal="true" aria-labelledby="detail-title">
            <div className={`tg-detail-visual ${project.tone}`} />
            <div className="tg-detail-copy">
              <div className="tg-detail-head">
                <p className="tg-kicker">{project.cat} · {project.years}</p>
                <button className="tg-close" type="button" onClick={() => setProject(null)} aria-label="Close project">
                  ×
                </button>
              </div>
              <h3 id="detail-title">{project.title}</h3>
              <p>{project.note}</p>
              <p>Placeholder frames stand in for licensed photography. The pacing follows a fullscreen project note: category, years, title, then a short read.</p>
              <button className="tg-pill" type="button" onClick={() => { setProject(null); setQuote(true); }}>
                Request a quote
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
