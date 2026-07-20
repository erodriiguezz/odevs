interface PageHeaderProps {
  label: string;
  title: string;
  description: string;
}

export function PageHeader({ label, title, description }: PageHeaderProps) {
  return (
    <header className="mb-10 max-w-3xl">
      <p className="font-mono text-xs uppercase tracking-widest text-primary-glow">
        {label}
      </p>
      <h1 className="mt-3 font-display text-4xl font-semibold text-balance sm:text-5xl text-foreground">
        {title}
      </h1>
      <p className="mt-4 text-base leading-relaxed text-muted-foreground">
        {description}
      </p>
    </header>
  );
}
