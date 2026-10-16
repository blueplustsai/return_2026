"use client";

import { useEffect, useMemo, useRef, useState, type FormEvent } from "react";

const nav = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "services", label: "Services" },
  { id: "projects", label: "Projects" },
  { id: "journal", label: "Journal" },
  { id: "contact", label: "Contact" },
];

const offers = [
  "Design and build",
  "Site coordination",
  "Renovation and refit",
  "Structural planning",
  "Finish carpentry",
];

const services = [
  {
    title: "House building",
    copy: "Turn a rough brief into a clear sequence that keeps cost, crew, and calendar in view.",
    points: ["Phased growth plan", "Neighbor-safe conduct"],
  },
  {
    title: "Commercial shells",
    copy: "Turn a rough brief into a clear sequence that keeps cost, crew, and calendar in view.",
    points: ["Changeover support", "Output tuning"],
  },
  {
    title: "Plant and yard work",
    copy: "Turn a rough brief into a clear sequence that keeps cost, crew, and calendar in view.",
    points: ["Trade-specific plans", "Sector know-how"],
  },
];

const steps = [
  { n: "Step 01", title: "Survey and brief", copy: "We start by reading the lot, the budget, and the constraints already on the table." },
  { n: "Step 02", title: "Drawings and engineering", copy: "The set of drawings, loads, and details the crew can actually build from." },
  { n: "Step 03", title: "Build and handover", copy: "Work proceeds from marked ground to a walkthrough, with the punch list closed." },
];

const projects = [
  { title: "North yard block", cat: "Construction", tone: "p1" },
  { title: "Upland frame", cat: "Construction", tone: "p2" },
  { title: "Keel and beam", cat: "Industrial", tone: "p3" },
  { title: "Solid footing", cat: "Residential", tone: "p4" },
  { title: "Reed court homes", cat: "Residential", tone: "p5" },
  { title: "Market lane shops", cat: "Commercial", tone: "p6" },
  { title: "Harbor walk flats", cat: "Commercial", tone: "p7" },
  { title: "Green cut housing", cat: "Residential", tone: "p8" },
];

const people = [
  { name: "Mina Calder", role: "Site lead", tone: "t1" },
  { name: "Jonah Ellis", role: "Site lead", tone: "t2" },
  { name: "Priya Shah", role: "Estimator", tone: "t3" },
  { name: "Chris Adelman", role: "Field engineer", tone: "t4" },
];

const quotes = [
  { stars: 5, text: "Clear updates and a crew that showed up when the schedule said they would. The opening week felt calm.", name: "Adeel Rahman", role: "Home owner" },
  { stars: 4.5, text: "They heard the brief, kept the floor open for trade, and handed over a space we could use the next morning.", name: "Robin Hale", role: "Shop owner" },
  { stars: 4, text: "No two lots are alike, and the plan here was drawn for this block, not copied from the last one.", name: "Leslie Okonkwo", role: "School owner" },
  { stars: 5, text: "Paperwork moved faster, and the site stayed readable for the people who had to walk it every day.", name: "Sasha Nguyen", role: "Building owner" },
  { stars: 4.5, text: "Direct answers, tidy handoffs, and a finish that matched the drawings we signed.", name: "Maren Holt", role: "Clinic owner" },
];

const posts = [
  { title: "How quieter detailing trims the cost of a build", date: "December 17, 2025" },
  { title: "Greener job sites and the long life of a frame", date: "December 17, 2025" },
  { title: "Road and yard work: the snags and the fixes", date: "December 17, 2025" },
];

function scrollerOf(node: HTMLElement | null) {
  return node?.closest(".theme-demo-frame") as HTMLElement | null;
}

function scrollToId(id: string) {
  const target = document.getElementById(id);
  const scroller = scrollerOf(target);
  if (!target || !scroller) return;
  const top = target.getBoundingClientRect().top - scroller.getBoundingClientRect().top + scroller.scrollTop - 84;
  scroller.scrollTo({ top, behavior: "smooth" });
}

function stars(value: number) {
  const full = Math.floor(value);
  return `${"★".repeat(full)}${value - full >= 0.5 ? "☆" : ""}`;
}

export function BrickzPage() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [stuck, setStuck] = useState(false);
  const [filter, setFilter] = useState("All");
  const [page, setPage] = useState(0);
  const [active, setActive] = useState("home");
  const [skillsOn, setSkillsOn] = useState(false);
  const [sent, setSent] = useState(false);
  const [news, setNews] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const year = useMemo(() => new Date().getFullYear(), []);

  useEffect(() => {
    const frame = scrollerOf(rootRef.current);
    if (!frame) return;
    const onScroll = () => {
      setStuck(frame.scrollTop > 8);
      const ids = nav.map((item) => item.id);
      let current = "home";
      ids.forEach((id) => {
        const node = document.getElementById(id);
        if (!node) return;
        const top = node.getBoundingClientRect().top - frame.getBoundingClientRect().top;
        if (top < 140) current = id;
      });
      setActive(current);
    };
    frame.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => frame.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const node = document.getElementById("skills");
    if (!node) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry?.isIntersecting) setSkillsOn(true);
    }, { threshold: 0.4 });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const id = window.setInterval(() => setPage((value) => (value + 1) % quotes.length), 5000);
    return () => window.clearInterval(id);
  }, []);

  useEffect(() => {
    const frame = scrollerOf(rootRef.current);
    if (!frame) return;
    frame.style.overflow = open ? "hidden" : "";
  }, [open]);

  const cats = ["All", "Commercial", "Construction", "Industrial", "Residential"];
  const visible = projects.filter((item) => filter === "All" || item.cat === filter);
  const count = (cat: string) => projects.filter((item) => item.cat === cat).length;
  const pair = [quotes[page % quotes.length], quotes[(page + 1) % quotes.length]];

  function go(id: string) {
    setOpen(false);
    window.setTimeout(() => scrollToId(id), 30);
  }

  function submit(event: FormEvent) {
    event.preventDefault();
    const next: Record<string, string> = {};
    if (form.name.trim().length < 2) next.name = "Add your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) next.email = "Use a valid email.";
    if (form.phone.trim().length < 7) next.phone = "Add a phone number.";
    if (form.message.trim().length < 8) next.message = "Add a short note.";
    setErrors(next);
    if (Object.keys(next).length) return;
    setSent(true);
  }

  return (
    <div ref={rootRef}>
      <div className="bz-top">
        <div className="bz-top-inner">
          <a href="tel:+15035550199">Call us: +1 503 555 0199</a>
          <a className="bz-top-mail" href="mailto:hello@fieldstone.example">Send mail: hello@fieldstone.example</a>
        </div>
      </div>
      <header className={`bz-header${stuck ? " is-stuck" : ""}`}>
        <div className="bz-nav-inner">
          <a className="bz-logo" href="#home" onClick={(event) => { event.preventDefault(); go("home"); }}>
            <span className="bz-mark" aria-hidden="true">
              <svg width="18" height="18" viewBox="0 0 18 18">
                <path d="M2 8 L9 2 L16 8 V16 H2 Z" fill="none" stroke="#1c1c1d" strokeWidth="1.6" />
              </svg>
            </span>
            Fieldstone
          </a>
          <ul className="bz-links">
            {nav.map((item) => (
              <li key={item.id}>
                <button type="button" className={active === item.id ? "is-on" : undefined} onClick={() => go(item.id)}>
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
          <button className="bz-btn" type="button" onClick={() => go("contact")}>Book a walkthrough</button>
          <button className="bz-burger" type="button" aria-label="Open menu" onClick={() => setOpen(true)}>
            <span />
          </button>
        </div>
      </header>

      {open ? (
        <div className="bz-drawer" onClick={() => setOpen(false)}>
          <div className="bz-drawer-panel" role="dialog" aria-modal="true" aria-label="Menu" onClick={(event) => event.stopPropagation()}>
            <button className="bz-btn ghost" type="button" onClick={() => setOpen(false)}>Close</button>
            <nav>
              {nav.map((item) => (
                <button key={item.id} type="button" onClick={() => go(item.id)}>{item.label}</button>
              ))}
            </nav>
            <p className="bz-note">We like bringing a drawing set to life, and we pick the tools that fit the lot in front of us.</p>
            <p>Call us: +1 503 555 0199<br />Email: studio@fieldstone.example<br />Hours: Mon–Fri, 8:00am – 6:00pm</p>
            <button className="bz-btn" type="button" onClick={() => go("contact")}>Get in touch</button>
          </div>
        </div>
      ) : null}

      <main>
        <section className="bz-wrap bz-hero" id="home">
          <div>
            <p className="bz-kicker"><i /> Urban builds, one page</p>
            <h1>Steady building partners, on site</h1>
            <p className="bz-lead">Every lot has its own ground, so the plan is drawn around that ground instead of a single template.</p>
            <div className="bz-hero-actions">
              <button className="bz-btn" type="button" onClick={() => go("contact")}>Free first meeting</button>
              <button className="bz-linkish" type="button" onClick={() => go("contact")}>Talk with the desk →</button>
            </div>
          </div>
          <div className="bz-hero-visual" role="img" aria-label="Placeholder skyline of a job site">
            <div className="bz-badge">
              <strong>25+</strong>
              years on active sites
            </div>
          </div>
        </section>

        <section className="bz-wrap bz-collab" id="about">
          <div>
            <p className="bz-kicker"><i /> Work with the crew</p>
            <h2>Let&apos;s plan the next site together</h2>
            <p>Read the latest notes from the yard. A short brief is enough to start the first walkthrough.</p>
            <button className="bz-btn" type="button" onClick={() => go("services")}>Your services</button>
          </div>
          <ul className="bz-service-list">
            {offers.map((item) => (
              <li key={item}>
                <button type="button" onClick={() => go("services")}>
                  {item}
                  <span aria-hidden="true">→</span>
                </button>
              </li>
            ))}
          </ul>
        </section>
        <div className="bz-ribbon" aria-hidden="true">
          <div className="bz-ribbon-track">
            {Array.from({ length: 2 }, (_, copy) => (
              <span key={copy}>
                {Array.from({ length: 8 }, (_, index) => (
                  <span key={index}>Refit · Framing · Groundwork · </span>
                ))}
              </span>
            ))}
          </div>
        </div>

        <section className="bz-block" id="services">
          <div className="bz-wrap">
            <div className="bz-head">
              <div>
                <p className="bz-kicker"><i /> What we take on</p>
                <h2>Reliable site services</h2>
              </div>
              <p>Built for mid-size teams that want a crew able to scale without losing the drawing set.</p>
            </div>
            <div className="bz-cards">
              {services.map((item) => (
                <article key={item.title} className="bz-card">
                  <span className="bz-ico" aria-hidden="true">▣</span>
                  <h3>{item.title}</h3>
                  <p>{item.copy}</p>
                  <ul>
                    {item.points.map((point) => <li key={point}>{point}</li>)}
                  </ul>
                  <button className="bz-more" type="button" onClick={() => go("contact")}>Explore more</button>
                </article>
              ))}
            </div>
            <div className="bz-steps">
              {steps.map((item) => (
                <article key={item.n} className="bz-step">
                  <em>{item.n}</em>
                  <h3>{item.title}</h3>
                  <p>{item.copy}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bz-block alt">
          <div className="bz-wrap bz-about">
            <div className="bz-about-visual" role="img" aria-label="Placeholder photograph of a concrete frame">
              <span>Fieldstone · since 1999</span>
            </div>
            <div>
              <p className="bz-kicker"><i /> How the work is run</p>
              <h2>Strong footings for a clearer tomorrow</h2>
              <p>A build partner sits with the team, names the snags, and leaves a sequence the site can follow without a second translation.</p>
              <ul className="bz-checks">
                <li>Code and inspection prep</li>
                <li>Fair-trade site conduct</li>
                <li>Side-by-side trade review</li>
                <li>Method. Sequence. Finish.</li>
              </ul>
              <button className="bz-btn dark" type="button" onClick={() => go("contact")}>Start the brief</button>
              <div id="skills">
                <div className={`bz-skill${skillsOn ? " is-on" : ""}`}>
                  <div><span>Technical skills</span><span>86%</span></div>
                  <div className="bz-bar"><i style={{ width: skillsOn ? "86%" : 0 }} /></div>
                </div>
                <div className={`bz-skill${skillsOn ? " is-on" : ""}`}>
                  <div><span>Field skills</span><span>78%</span></div>
                  <div className="bz-bar"><i style={{ width: skillsOn ? "78%" : 0 }} /></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="bz-ribbon" aria-hidden="true">
          <div className="bz-ribbon-track">
            {Array.from({ length: 2 }, (_, copy) => (
              <span key={copy}>Fieldstone · company · since 1999 · </span>
            ))}
          </div>
        </div>

        <section className="bz-block" id="projects">
          <div className="bz-wrap">
            <div className="bz-head">
              <div>
                <p className="bz-kicker"><i /> Selected sites</p>
                <h2>Project record</h2>
              </div>
              <p>A mix of shells, fit-outs, and yards. Filters keep the board to one kind of work.</p>
            </div>
            <div className="bz-filters" role="tablist" aria-label="Project types">
              {cats.map((cat) => (
                <button key={cat} type="button" role="tab" aria-selected={filter === cat} className={filter === cat ? "is-on" : undefined} onClick={() => setFilter(cat)}>
                  {cat} {cat === "All" ? `(${String(projects.length).padStart(2, "0")})` : `(${String(count(cat)).padStart(2, "0")})`}
                </button>
              ))}
            </div>
            <div className="bz-projects" style={{ marginTop: 18 }}>
              {visible.map((item) => (
                <button key={item.title} className="bz-project" type="button" onClick={() => go("contact")}>
                  <i className={item.tone} />
                  <span>
                    <small>{item.cat}</small>
                    <strong>{item.title}</strong>
                  </span>
                </button>
              ))}
            </div>
          </div>
        </section>

        <section className="bz-block alt">
          <div className="bz-wrap">
            <div className="bz-head">
              <div>
                <p className="bz-kicker"><i /> People on the tools</p>
                <h2>Meet the site leads</h2>
              </div>
              <p>A small bench for mid-size and larger builds that still want a named lead.</p>
            </div>
            <div className="bz-team">
              {people.map((person) => (
                <article key={person.name} className="bz-person">
                  <div className={`ph ${person.tone}`} role="img" aria-label="" />
                  <div>
                    <h3>{person.name}</h3>
                    <p>{person.role}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bz-band">
          <div className="bz-band-inner">
            <div>
              <p className="bz-kicker">Fieldstone builds</p>
              <h2>Find a path through a complicated site</h2>
            </div>
            <button className="bz-btn dark" type="button" onClick={() => go("contact")}>Best next step</button>
          </div>
        </section>

        <section className="bz-block">
          <div className="bz-wrap bz-quotes">
            <div>
              <p className="bz-kicker"><i /> Client notes</p>
              <h2>Words that keep the trust</h2>
              <p className="bz-score">5.0</p>
            </div>
            <div>
              <div className="bz-slider">
                {pair.map((item) => (
                  <blockquote key={item.name + item.role} className="bz-quote">
                    <div className="bz-stars" aria-label={`${item.stars} out of 5`}>{stars(item.stars)}</div>
                    <p>{item.text}</p>
                    <footer>
                      {item.name}
                      <span>{item.role}</span>
                    </footer>
                  </blockquote>
                ))}
              </div>
              <div className="bz-dots">
                {quotes.map((item, index) => (
                  <button key={item.name} type="button" className={index === page ? "is-on" : undefined} aria-label={`Show note ${index + 1}`} onClick={() => setPage(index)} />
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="bz-block alt" id="journal">
          <div className="bz-wrap">
            <div className="bz-head">
              <div>
                <p className="bz-kicker"><i /> From the journal</p>
                <h2>Notes and site stories</h2>
              </div>
              <p>Short reads from recent jobs. Nothing here is a copied article.</p>
            </div>
            <div className="bz-posts">
              {posts.map((post, index) => (
                <article key={post.title} className="bz-post">
                  <div className={`ph p${index + 1}`} />
                  <div>
                    <time dateTime="2025-12-17">{post.date}</time>
                    <h3>{post.title}</h3>
                    <button className="bz-linkish" type="button" onClick={() => go("contact")}>Read more</button>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bz-block" id="contact">
          <div className="bz-wrap bz-ask">
            <div>
              <p className="bz-kicker"><i /> Write the desk</p>
              <h2>Have a question in mind?</h2>
              <p>A few lines about the lot, the timing, and the budget band are enough to start.</p>
            </div>
            {sent ? (
              <p className="bz-toast" role="status">Thanks. This preview keeps the note on this page and does not send it.</p>
            ) : (
              <form className="bz-form" onSubmit={submit} noValidate>
                <label>
                  Your name
                  <input value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} autoComplete="name" />
                  {errors.name ? <span className="err">{errors.name}</span> : null}
                </label>
                <label>
                  Your email
                  <input type="email" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} autoComplete="email" />
                  {errors.email ? <span className="err">{errors.email}</span> : null}
                </label>
                <label>
                  Your phone
                  <input value={form.phone} onChange={(event) => setForm({ ...form, phone: event.target.value })} autoComplete="tel" />
                  {errors.phone ? <span className="err">{errors.phone}</span> : null}
                </label>
                <label className="full">
                  Your message
                  <textarea value={form.message} onChange={(event) => setForm({ ...form, message: event.target.value })} />
                  {errors.message ? <span className="err">{errors.message}</span> : null}
                </label>
                <button className="bz-btn" type="submit">Send details</button>
              </form>
            )}
          </div>
        </section>
      </main>

      <footer className="bz-foot">
        <div className="bz-foot-grid">
          <div>
            <h2>A steady partner for the build.</h2>
            <p>Layouts, sequences, and site notes composed so a visitor can see the work before the first meeting.</p>
            <p><strong>Phone:</strong> +880 1556 9569</p>
            <p><strong>Hours:</strong> Mon–Fri 08:00–17:00, weekend closed</p>
            <p><strong>Office:</strong> New harbor, 1201</p>
          </div>
          <div>
            <h3>Quick links</h3>
            {["About", "Contact", "Projects", "Services"].map((label) => (
              <button key={label} type="button" onClick={() => go(label === "About" ? "about" : label === "Projects" ? "projects" : label === "Services" ? "services" : "contact")}>{label}</button>
            ))}
          </div>
          <div>
            <h3>Sectors</h3>
            {["Residential", "Commercial", "Industrial", "Civil works"].map((label) => (
              <button key={label} type="button" onClick={() => { setFilter(label === "Civil works" ? "Construction" : label); go("projects"); }}>{label}</button>
            ))}
          </div>
          <div>
            <h3>Desk notes</h3>
            <p>Fieldstone writes short updates for teams planning a shell, a refit, or a yard.</p>
            {news ? <p role="status">Saved on this page only.</p> : (
              <form className="bz-news" onSubmit={(event) => { event.preventDefault(); setNews(true); }}>
                <input type="email" required placeholder="Email address" aria-label="Email address" />
                <button className="bz-btn" type="submit">Join</button>
              </form>
            )}
          </div>
        </div>
        <div className="bz-legal">
          <span>© {year} Fieldstone layout study</span>
          <span>Notes · Privacy</span>
        </div>
      </footer>
    </div>
  );
}
