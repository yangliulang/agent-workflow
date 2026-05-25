const defaults = 'inline-block shrink-0 flex-none';

export function IconChevron({ className = 'h-4 w-4' }) {
  return (
    <svg
      className={`${defaults} ${className}`}
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden
    >
      <path d="M6 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function IconCheck({ className = 'h-4 w-4' }) {
  return (
    <svg
      className={`${defaults} ${className}`}
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden
    >
      <path d="M3 8.5l3.2 3.2 6.8-8.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function IconTerminal({ className = 'h-5 w-5' }) {
  return (
    <svg
      className={`${defaults} ${className}`}
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden
    >
      <rect x="2" y="3" width="16" height="14" rx="2" />
      <path d="M6 8l2.5 2L6 12M11 12h3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function IconLayers({ className = 'h-5 w-5' }) {
  return (
    <svg
      className={`${defaults} ${className}`}
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden
    >
      <path d="M3 7l7-3 7 3-7 3-7-3z" />
      <path d="M3 11l7 3 7-3" opacity="0.55" />
    </svg>
  );
}

export function IconPlus({ className = 'h-4 w-4' }) {
  return (
    <svg
      className={`${defaults} ${className}`}
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden
    >
      <path d="M8 3v10M3 8h10" strokeLinecap="round" />
    </svg>
  );
}
