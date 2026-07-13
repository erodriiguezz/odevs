export default function Footer() {
    const footerItems = [
        { href: "https://www.linkedin.com/company/odevs/", label: "LinkedIn" },
        { href: "https://github.com/OrlandoDevs",          label: "GitHub" },
        { href: "https://discord.gg/v6gchdH43K",           label: "Discord" },
    ] as const;

    return  <footer className="bg-background border-t border-border text-zinc-600 dark:text-zinc-400 py-14 text-sm theme-trans">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                        <div className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 bg-primary-glow rounded-full"></span>
                            <span>Orlando Devs © {new Date().getFullYear()} • 501(c)(3) Non-profit</span>
                        </div>
                        <div className="flex gap-4 font-mono text-xs">
                            {footerItems.map(({ href, label }) => (
                                <a key={href} href={href} target="_blank" rel="noreferrer" className="hover:text-zinc-900 dark:hover:text-zinc-300 theme-trans">{label}</a>
                            ))}
                        </div>
                    </div>
                </div>
            </footer>
}