"use client";

import { useIsMobile } from "../hooks/isMobile";
import { usePathname } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Logo from "./logo";

export default function Header() {
  const pathname = usePathname();
  const isMobile = useIsMobile();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/calendar", label: "Calendar" },
    { href: "/groups", label: "Groups" },
    { href: "/code-of-conduct", label: "Code of Conduct" },
  ] as const;

  const linkClass = (href: string) =>
    [
      "rounded-full px-3 py-1.5 text-sm font-medium transition-colors",
      isMobile ? "px-4 py-3 text-base" : "",
      pathname === href
        ? "bg-primary/15 text-foreground"
        : "text-muted-foreground hover:text-foreground",
    ].join(" ");

  const discordButton = (onClick: () => void, className: string[] = []) => (
    <Link
      href="https://discord.gg/v6gchdH43K"
      target="_blank"
      rel="noreferrer"
      className={[
        "inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-glow transition-transform hover:-translate-y-px",
        ...className,
      ].join(" ")}
      onClick={onClick}
    >
      <Image
        src="/images/platform-logos/discord.svg"
        alt=""
        aria-hidden="true"
        className="h-4 w-4 shrink-0"
        width={16}
        height={16}
      />
      <span>Join Discord</span>
    </Link>
  );

  const hamburger = (open: string, closed: string, always: string) => (
    <span
      className={[
        `absolute left-0 h-0.5 w-5 rounded-full bg-current transition-all duration-300 ease-in-out ${always}`,
        isMenuOpen ? open : closed,
      ].join(" ")}
    />
  );

  const hamburgerTopBottom = (rotate: string, top: string) =>
    hamburger(`top-[7px] ${rotate}`, top, "");

  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/70 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-6 px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="flex items-center"
          onClick={() => setIsMenuOpen(false)}
        >
          <Logo className="w-9 h-9 object-cover text-foreground" />
        </Link>

        {isMobile ? (
          <div className="relative flex items-center gap-2">
            <button
              type="button"
              className="relative flex h-10 w-10 items-center justify-center rounded-lg text-foreground hover:bg-muted active:scale-95"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-expanded={isMenuOpen}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            >
              <span className="relative block h-4 w-5">
                {hamburgerTopBottom("rotate-45", "top-0")}
                {hamburger(
                  "scale-x-0 opacity-0",
                  "scale-x-100 opacity-100",
                  "top-[7px]",
                )}
                {hamburgerTopBottom("-rotate-45", "top-[14px]")}
              </span>
            </button>

            <div
              aria-hidden={!isMenuOpen}
              className={[
                "absolute top-full right-0 z-50 mt-2 flex-col min-w-48 overflow-hidden rounded-2xl border border-border bg-background py-3 px-3 shadow-lg shadow-black/40 origin-top-right ease-[cubic-bezier(0.16,1,0.3,1)]",
                isMenuOpen
                  ? "pointer-events-auto visible opacity-100 scale-100 translate-y-0"
                  : "pointer-events-none invisible opacity-0 scale-[0.8] -translate-y-10",
              ].join(" ")}
            >
              {navItems.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  tabIndex={isMenuOpen ? 0 : -1}
                  onClick={() => setIsMenuOpen(false)}
                  className={[
                    linkClass(href),
                    "inline-flex w-full text-left",
                  ].join(" ")}
                >
                  {label}
                </Link>
              ))}

              {discordButton(() => setIsMenuOpen(false), [
                "mt-2 w-full justify-center",
              ])}
            </div>
          </div>
        ) : (
          <>
            <nav className="hidden items-center gap-1 rounded-full border border-border/70 bg-surface/60 px-1.5 py-1 md:flex">
              {navItems.map(({ href, label }) => (
                <Link key={href} href={href} className={linkClass(href)}>
                  {label}
                </Link>
              ))}
            </nav>
            <div className="flex items-center gap-2">
              {discordButton(() => {})}
            </div>
          </>
        )}
      </div>
    </header>
  );
}
