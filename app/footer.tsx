export default function Footer() {
    return <footer
            className="bg-zinc-950 border-t border-zinc-900 text-zinc-600 py-12 text-xs mt-12"
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-zinc-700 rounded-full"></span>
                        <span
                        >Orlando Devs © {new Date().getFullYear()} • 501(c)(3) Non-profit</span
                        >
                    </div>
                    <div className="flex gap-4 font-mono text-[10px]">
                        <a
                        href="https://www.linkedin.com/company/odevs/"
                        className="hover:text-zinc-400 transition">LinkedIn</a
                        >
                        <a
                        href="https://github.com/OrlandoDevs"
                        className="hover:text-zinc-400 transition">GitHub</a
                        >
                        <a
                        href="https://discord.gg/v6gchdH43K"
                        className="hover:text-zinc-400 transition">Discord</a
                        >
                    </div>
                    </div>
                </div>
            </footer>
}