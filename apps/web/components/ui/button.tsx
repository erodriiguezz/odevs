import Link from 'next/link'
import { type AnchorHTMLAttributes } from 'react'

type ButtonVariant = 'primary' | 'secondary'

interface ButtonProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: ButtonVariant
  href: string
  flex?: boolean
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    'bg-primary hover:bg-primary-glow text-white px-7 py-3.5 font-bold',
  secondary:
    'bg-transparent text-muted-foreground hover:text-foreground border border-zinc-400 dark:border-zinc-600 hover:border-zinc-600 dark:hover:border-zinc-400 rounded-full px-7 py-3.5 font-semibold',
}

export function Button({ variant = 'primary', flex = false, className, href, ...props }: ButtonProps) {
  return (
    <Link
      href={href}
      className={`inline-block hover:-translate-y-px theme-trans rounded-full w-max text-sm ${variantClasses[variant]} ${flex ? 'inline-flex gap-2 items-center' : ''} ${className ? ` ${className} ` : ''}`}
      {...props}
    />
  )
}
