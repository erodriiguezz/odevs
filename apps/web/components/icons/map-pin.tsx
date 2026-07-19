interface IconProps {
  className?: string
}

export function MapPinIcon({ className = 'h-3.5 w-3.5' }: IconProps) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* Slightly inset path so optical size matches clock/calendar icons */}
      <g transform="translate(12 12) scale(1.12) translate(-12 -12)">
        <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" />
        <circle cx="12" cy="10" r="3" />
      </g>
    </svg>
  )
}
