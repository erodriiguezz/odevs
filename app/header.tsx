"use client"

import { usePathname } from 'next/navigation'

export default function Header() {
    const pathname = usePathname();

    const navItems = [
        { href: "/", label: "Home" },
        { href: "/calendar", label: "Calendar" },
        { href: "/newsletter", label: "Newsletters" },
        { href: "/code-of-conduct", label: "Code of Conduct" },
    ] as const;

    const linkClass = (href: string) => [
        "px-4 py-2 text-sm font-medium rounded-md transition-all",
        pathname === href
            ? "bg-zinc-850 text-white shadow-sm"
            : "text-zinc-400 hover:text-zinc-200",
    ].join(" ");

    return  <div className="sticky top-0 z-40 bg-zinc-950/80 backdrop-blur-md border-b border-zinc-900">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
                    <div className="flex items-center gap-3 cursor-pointer">
                        <img
                            src="/images/logo.png"
                            alt="Orlando Devs"
                            className="w-9 h-9 rounded-full object-cover border border-zinc-800"
                        />
                    </div>

                    <nav className="hidden md:flex items-center gap-1 bg-zinc-900 p-0.5 rounded-lg border border-zinc-800">
                        {navItems.map(({ href, label }) => (
                            <a key={href} href={href} className={linkClass(href)}>{label}</a>
                        ))}
                    </nav>

                    <div className="flex items-center">
                        <a
                            href="https://discord.gg/v6gchdH43K"
                            target="_blank"
                            rel="noreferrer"
                            className="flex items-center bg-[#5865F2] hover:bg-[#4e5dEC] text-white px-4 py-2.5 rounded-lg text-sm font-medium transition duration-150 shadow-sm"
                        >
                            <img
                                src="/images/discord.svg"
                                alt="Discord Logo"
                                aria-hidden="true"
                                className="w-4 h-4 mr-2"
                            />

                            <span>Join Discord</span>
                        </a>
                    </div>
                </div>
            </div>
}