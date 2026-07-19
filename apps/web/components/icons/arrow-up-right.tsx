interface IconProps {
  className?: string
}

export function ArrowUpRightIcon({ className = 'h-3.5 w-3.5' }: IconProps) {
  return (
    <svg
      aria-hidden="true"
      className={`shrink-0 ${className}`}
      fill="none"
      viewBox="0 0 24 24"
      width="1em"
      height="1em"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      overflow="visible"
    >
      {/* Inset from edges so stroke isn't clipped by the SVG viewport */}
      <path d="M8 8h7v7" />
      <path d="M8 15 15 8" />
    </svg>
  )
}
