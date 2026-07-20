import Link from "next/link";
import { type AnchorHTMLAttributes } from "react";

type ButtonVariant = "primary" | "secondary";

interface ButtonProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: ButtonVariant;
  href: string;
  flex?: boolean;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-primary text-primary-foreground px-5 py-3 font-medium shadow-glow",
  secondary:
    "bg-transparent text-foreground border border-foreground/40 hover:border-foreground px-5 py-3 font-medium",
};

export function Button({
  variant = "primary",
  flex = false,
  className,
  href,
  ...props
}: ButtonProps) {
  return (
    <Link
      href={href}
      className={[
        "hover:-translate-y-px rounded-full text-sm transition-transform",
        flex ? "inline-flex items-center gap-2" : "inline-block",
        variantClasses[variant],
        className ?? "w-max",
      ].join(" ")}
      {...props}
    />
  );
}
