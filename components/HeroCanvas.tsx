"use client";

import { useEffect, useRef } from "react";

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  ox: number;
  oy: number;
  r: number;
  t: number;
  a: number;
};

export function HeroCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const hero = canvas?.parentElement;
    if (!canvas || !hero) return;
    const context = canvas.getContext("2d");
    if (!context) return;

    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let reduce = motion.matches;
    let width = 0;
    let height = 0;
    let particles: Particle[] = [];
    const pointer = { x: -999, y: -999 };
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let running = false;
    let frame = 0;

    const color = (t: number, alpha: number) =>
      `rgba(${(59 + 80 * t) | 0},${(130 - 38 * t) | 0},246,${alpha})`;

    const draw = () => {
      context.clearRect(0, 0, width, height);
      for (let i = 0; i < particles.length; i += 1) {
        for (let j = i + 1; j < particles.length; j += 1) {
          const a = particles[i];
          const b = particles[j];
          const dx = a.x + a.ox - (b.x + b.ox);
          const dy = a.y + a.oy - (b.y + b.oy);
          const dist = dx * dx + dy * dy;
          if (dist < 14400) {
            context.strokeStyle = color((a.t + b.t) / 2, 0.18 * (1 - Math.sqrt(dist) / 120));
            context.beginPath();
            context.moveTo(a.x + a.ox, a.y + a.oy);
            context.lineTo(b.x + b.ox, b.y + b.oy);
            context.stroke();
          }
        }
      }
      for (const particle of particles) {
        context.fillStyle = color(particle.t, particle.a);
        context.beginPath();
        context.arc(particle.x + particle.ox, particle.y + particle.oy, particle.r, 0, 7);
        context.fill();
      }
    };

    const init = () => {
      const nextWidth = canvas.clientWidth;
      const nextHeight = canvas.clientHeight;
      if (nextWidth < 2 || nextHeight < 2) return;
      if (nextWidth === width && nextHeight === height && particles.length) return;
      width = nextWidth;
      height = nextHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count =
        width < 820 ? 36 : Math.round(Math.max(60, Math.min(120, (width * height) / 11000)));
      particles = [];
      for (let i = 0; i < count; i += 1) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          ox: 0,
          oy: 0,
          r: 1 + Math.random() * 1.5,
          t: Math.random(),
          a: 0.3 + Math.random() * 0.4,
        });
      }
    };

    const step = () => {
      if (!running || reduce) return;
      for (const particle of particles) {
        particle.x += particle.vx;
        particle.y += particle.vy;
        if (particle.x < 0 || particle.x > width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > height) particle.vy *= -1;
        const dx = particle.x + particle.ox - pointer.x;
        const dy = particle.y + particle.oy - pointer.y;
        const dist = Math.hypot(dx, dy);
        if (dist < 100 && dist > 0) {
          const force = ((100 - dist) / 100) * 4;
          particle.ox += (dx / dist) * force;
          particle.oy += (dy / dist) * force;
        }
        particle.ox *= 0.92;
        particle.oy *= 0.92;
      }
      draw();
      frame = window.requestAnimationFrame(step);
    };

    const start = () => {
      if (reduce || !running) return;
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(step);
    };

    const onMove = (event: PointerEvent) => {
      const box = canvas.getBoundingClientRect();
      pointer.x = event.clientX - box.left;
      pointer.y = event.clientY - box.top;
    };
    const onLeave = () => {
      pointer.x = -999;
      pointer.y = -999;
    };
    const onDown = (event: PointerEvent) => {
      if (reduce) return;
      const box = canvas.getBoundingClientRect();
      const cx = event.clientX - box.left;
      const cy = event.clientY - box.top;
      for (const particle of particles) {
        const dx = particle.x - cx;
        const dy = particle.y - cy;
        const dist = Math.hypot(dx, dy) || 1;
        if (dist < 220) {
          particle.ox += (dx / dist) * ((220 - dist) / 5);
          particle.oy += (dy / dist) * ((220 - dist) / 5);
        }
      }
    };
    const onResize = () => {
      init();
      if (reduce) draw();
    };
    const onMotion = () => {
      reduce = motion.matches;
      if (reduce) {
        window.cancelAnimationFrame(frame);
        draw();
        return;
      }
      start();
    };

    const observer = new IntersectionObserver(([entry]) => {
      const wasRunning = running;
      running = entry.isIntersecting && document.visibilityState === "visible";
      if (running && !wasRunning) start();
      if (!running) window.cancelAnimationFrame(frame);
    });

    const onVisibility = () => {
      const wasRunning = running;
      running = document.visibilityState === "visible" && hero.getBoundingClientRect().bottom > 0 && hero.getBoundingClientRect().top < window.innerHeight;
      if (!running) window.cancelAnimationFrame(frame);
      else if (!wasRunning) start();
    };

    hero.addEventListener("pointermove", onMove);
    hero.addEventListener("pointerleave", onLeave);
    hero.addEventListener("pointerdown", onDown);
    window.addEventListener("resize", onResize);
    document.addEventListener("visibilitychange", onVisibility);
    motion.addEventListener("change", onMotion);
    observer.observe(hero);
    init();
    if (reduce) draw();
    else start();

    return () => {
      window.cancelAnimationFrame(frame);
      hero.removeEventListener("pointermove", onMove);
      hero.removeEventListener("pointerleave", onLeave);
      hero.removeEventListener("pointerdown", onDown);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVisibility);
      motion.removeEventListener("change", onMotion);
      observer.disconnect();
    };
  }, []);

  return <canvas ref={ref} className="pointer-events-none absolute inset-0 h-full w-full" aria-hidden="true" />;
}
