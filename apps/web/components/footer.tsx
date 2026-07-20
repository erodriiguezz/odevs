export default function Footer() {
  const footerItems = [
    {
      href: "https://www.linkedin.com/company/odevs/",
      label: "LinkedIn",
    },
    {
      href: "https://github.com/OrlandoDevs",
      label: "GitHub",
    },
    {
      href: "https://discord.gg/v6gchdH43K",
      label: "Discord",
    },
  ] as const;

  return (
    <footer className="border-t border-border/60 bg-background">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-6 px-4 py-10 text-center sm:px-6 lg:px-8 md:flex-row md:items-center md:justify-between md:text-left">
        <div className="text-sm text-muted-foreground">
          Orlando Devs © {new Date().getFullYear()} · 501(c)(3) Non-profit
        </div>
        <div className="flex items-center justify-center gap-6 text-sm md:justify-end">
          {footerItems.map(({ href, label }) => (
            <a
              key={href}
              href={href}
              target="_blank"
              rel="noreferrer"
              className="text-muted-foreground hover:text-foreground"
            >
              {label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
