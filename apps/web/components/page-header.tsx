interface PageHeaderProps {
  label: string
  title: string
  description: string
}

export function PageHeader({ label, title, description }: PageHeaderProps) {
  return (
    <div className="mb-10">
      <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-primary border-l-[3px] border-primary pl-2.5 mb-4 font-mono">
        {label}
      </p>
      <h1 className="text-3xl lg:text-4xl font-extrabold leading-tight tracking-tight font-display text-foreground theme-trans">{title}</h1>
      <p className="mt-3 text-base leading-relaxed text-muted-foreground max-w-lg theme-trans">
        {description}
      </p>
    </div>
  )
}
