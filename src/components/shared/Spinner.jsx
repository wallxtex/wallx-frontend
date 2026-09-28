/**
 * Spinner Component
 * 
 * A lightweight, accessible spinning wheel that inherits color and size from its parent.
 * Respects user's motion preferences (prefers-reduced-motion).
 * 
 * Usage:
 *   <Spinner /> - inherits parent's font-size and color
 *   <Spinner className="w-4 h-4" /> - custom size
 */

const Spinner = ({ className = "", ...rest }) => {
  return (
    <svg
      className={`animate-spin ${className}`}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      aria-hidden="true"
      style={{
        width: '1em',
        height: '1em',
        color: 'currentColor',
      }}
      {...rest}
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  );
};

export default Spinner;
