import Link from 'next/link'
import { type AnchorHTMLAttributes } from 'react'

type ButtonVariant = 'primary' | 'secondary'

interface ButtonProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: ButtonVariant
  href: string
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    'bg-[#FF6B35] hover:bg-[#D9531E] text-white rounded-md px-7 py-3.5 text-sm font-bold transition-colors',
  secondary:
    'bg-transparent text-zinc-400 border border-zinc-600 hover:text-white hover:border-zinc-400 rounded-md px-7 py-3.5 text-sm font-semibold transition-colors',
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
