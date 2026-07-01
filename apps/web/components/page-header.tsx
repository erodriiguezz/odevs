interface PageHeaderProps {
  label: string
  title: string
  description: string
}

export function PageHeader({ label, title, description }: PageHeaderProps) {
  return (
    <div className="mb-10">
      <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#5B4FE9] border-l-[3px] border-[#5B4FE9] pl-2.5 mb-4">
        {label}
      </p>
      <h1 className="text-3xl lg:text-4xl font-extrabold leading-tight tracking-tight">{title}</h1>
      <p className="mt-3 text-base leading-relaxed text-zinc-500 dark:text-zinc-400 max-w-lg">
        {description}
      </p>
    </div>
  )
}
