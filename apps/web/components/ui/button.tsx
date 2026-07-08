import Link from 'next/link'
import { type AnchorHTMLAttributes } from 'react'

type ButtonVariant = 'primary' | 'secondary'

interface ButtonProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: ButtonVariant
  href: string
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    'bg-primary hover:bg-primary-glow text-white rounded-md px-7 py-3.5 text-sm font-bold transition-all duration-300',
  secondary:
    'bg-transparent text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white border border-zinc-400 dark:border-zinc-600 hover:border-zinc-600 dark:hover:border-zinc-400 rounded-full px-7 py-3.5 text-sm font-semibold transition-all duration-300',
}

export function Button({ variant = 'primary', className, href, ...props }: ButtonProps) {
  return (
    <Link
      href={href}
      className={`inline-block ${variantClasses[variant]}${className ? ` ${className}` : ''}`}
      {...props}
    />
  )
}
