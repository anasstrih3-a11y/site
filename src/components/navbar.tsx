"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const links = [
  { href: "/", label: "Home" },
  { href: "/shop", label: "Shop" },
  { href: "/shop?category=Keyboards", label: "Keyboards" },
  { href: "/shop?category=Mice", label: "Mice" },
  { href: "/shop?category=Audio", label: "Audio" },
  { href: "/shop?category=Components", label: "Components" },
  { href: "/admin", label: "⚙ Admin" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-all duration-300 ${
        scrolled || mobileOpen
          ? "border-b border-white/10 bg-[#07070d]/90 backdrop-blur-xl"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="group flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-violet-600 to-cyan-500 font-display text-lg font-black text-white shadow-lg shadow-violet-900/50 transition group-hover:shadow-violet-700/60">
            N
          </span>
          <span className="font-display text-lg font-bold tracking-widest text-white">
            NEXUS<span className="text-violet-400">ARSENAL</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-7 lg:flex">
          {links.map((l) => (
            <Link
              key={l.label}
              href={l.href}
              className="text-sm font-medium text-zinc-300 transition hover:text-white"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/shop?sort=rating"
            className="rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-600 px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-violet-900/40 transition hover:brightness-110"
          >
            Top Rated
          </Link>
          <button
            onClick={() => setMobileOpen((v) => !v)}
            className="rounded-full p-2 text-zinc-300 transition hover:bg-white/10 hover:text-white lg:hidden"
            aria-label="Toggle menu"
          >
            {mobileOpen ? (
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <nav className="border-t border-white/10 bg-[#07070d]/95 px-4 pb-5 pt-3 backdrop-blur-xl lg:hidden">
          {links.map((l) => (
            <Link
              key={l.label}
              href={l.href}
              onClick={() => setMobileOpen(false)}
              className="block rounded-lg px-3 py-2.5 text-sm font-medium text-zinc-300 transition hover:bg-white/5 hover:text-white"
            >
              {l.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
