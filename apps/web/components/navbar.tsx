"use client";

import { useIsMobile } from "../hooks/isMobile";
import { usePathname } from "next/navigation";
import { useState, CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Header() {
    const pathname = usePathname(); // to show current location
    const isMobile = useIsMobile(); // to choose which menu

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const navItems = [
        { href: "/", label: "Home" },
        { href: "/calendar", label: "Calendar" },
        { href: "/newsletter", label: "Newsletters" },
        { href: "/code-of-conduct", label: "Code of Conduct" },
    ] as const;

    const linkClass = (href: string) => [
        "px-4 py-2 text-sm font-medium rounded-md transition-all leading-none",
        pathname === href
            ? "bg-zinc-850 text-white shadow-sm"
            : "text-zinc-400 hover:text-zinc-200",
    ].join(" ");
    
    const discordButton = (style: CSSProperties | undefined, onClick: () => void, className: string[]) =>
        <Link
            href="https://discord.gg/v6gchdH43K"
            target="_blank"
            rel="noreferrer"
            className={["flex items-center bg-[#5865F2] hover:bg-[#4e5dEC] text-white px-4 py-2 rounded-lg text-sm font-medium shadow-sm", ...className].join(" ")}
            onClick={onClick}
            style={style}
        >
            <Image
                src="/images/discord.svg"
                alt="Discord Logo"
                aria-hidden="true"
                className="w-4 h-4 mr-2"
                width={16}
                height={16}
            />

            <span>Join Discord</span>
        </Link>;

    const delayStyle: (index: number) => CSSProperties = (index: number) => ({
        transitionDelay: isMenuOpen
            ? `${index*40 + 75}ms`
            : `${(navItems.length+1 - index) * 25}ms`
    });

    const hamburger = (open: string, closed: string, always: string) =>
        <span className={[
            `absolute left-0 h-0.5 w-5 rounded-full bg-current transition-all duration-300 ease-in-out ${always}`,
            isMenuOpen ? open : closed,
        ].join(" ")}/>;

    const hamburgerTopBottom = (rotate: string, top: string) => hamburger(`top-[7px] ${rotate}`, top, "");

    return  <div className="sticky top-0 z-40 bg-zinc-950/80 backdrop-blur-md border-b border-zinc-900">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Image src="/images/logo.png" alt="Orlando Devs" width={36} height={36} className="w-9 h-9 rounded-full object-cover border border-zinc-800" />
                    </div>
                    {isMobile ?
                        <div className="relative flex items-center">
                            <button
                                type="button"
                                className="md:hidden relative flex h-10 w-10 items-center justify-center rounded-lg text-zinc-200 transition-[color,transform] duration-200 hover:bg-zinc-900 active:scale-95"
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                                aria-expanded={isMenuOpen}
                                aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                            >
                                {/* 3 lines of menu hamburger, middle fades top/bottom become X*/}
                                <span className="relative block h-4 w-5">
                                    {hamburgerTopBottom("rotate-45", "top-0")}
                                    {hamburger("scale-x-0 opacity-0", "scale-x-100 opacity-100", "top-[7px]")}
                                    {hamburgerTopBottom("-rotate-45", "top-[14px]")}
                                </span>
                            </button>
                            
                            <div
                                aria-hidden={!isMenuOpen}
                                className={[
                                    "absolute top-full right-0 z-50 mt-2 flex-col min-w-44 overflow-hidden rounded-lg border border-zinc-800 bg-zinc-950 py-4 px-4 shadow-lg shadow-black/40 origin-top-right transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]",
                                    isMenuOpen
                                        ? "pointer-events-auto visible opacity-100 scale-100 translate-y-0"
                                        : "pointer-events-none invisible opacity-0 scale-80 -translate-y-10",
                                ].join(" ")}
                            >
                                {navItems.map(({ href, label }, index) => (
                                    <Link
                                        key={href}
                                        href={href}
                                        tabIndex={isMenuOpen ? 0 : -1}
                                        onClick={() => setIsMenuOpen(false)}
                                        style={delayStyle(index)}
                                        className={[
                                            linkClass(href),
                                            "w-full text-left duration-300 ease-out inline-flex",
                                            isMenuOpen ? "translate-x-0 opacity-100" : "-translate-x-3 opacity-0",
                                        ].join(" ")}
                                    >{label}</Link>))}
                                    
                                    {discordButton(delayStyle(navItems.length), // geist sans is 0.71% font height  font-sm is 0.875rem
                                        () => setIsMenuOpen(false), [`transition-all duration-300 ease-out mt-2`,
                                                                     isMenuOpen ? "translate-x-0 opacity-100" : "-translate-x-3 opacity-0",])}
                            </div>
                        </div>
                     : // desktop
                        <>
                            <nav className="hidden md:flex items-center gap-1 bg-zinc-900 p-0.5 rounded-lg border border-zinc-800">
                                {navItems.map(({ href, label }) => (
                                    <Link key={href} href={href} className={linkClass(href)}>{label}</Link>
                                ))}
                            </nav>
                            <div className="flex items-center">
                                {discordButton(undefined, () => {}, ["transition duration-150"])}
                            </div>
                        </>}
                </div>
            </div>;
}