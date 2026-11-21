type LogoProps = {
  className?: string;
  light?: boolean;
};

export default function Logo({ className = "", light = false }: LogoProps) {
  const text = light ? "text-white" : "text-charcoal";
  const mark = light ? "bg-white text-green-900" : "bg-green-800 text-white";

  return (
    <a
      href="#home"
      className={`inline-flex items-center gap-2.5 ${text} ${className}`}
      aria-label="CricketHub home"
    >
      <span
        className={`flex h-9 w-9 items-center justify-center rounded-xl ${mark} shadow-sm`}
        aria-hidden
      >
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none">
          <path
            d="M7 4.5c2.8 1.2 5.4 3.6 7.2 6.6M9.2 3.8c.4 3.1 1.8 6.2 4 8.8"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinecap="round"
          />
          <circle cx="16.5" cy="15.5" r="3.2" stroke="currentColor" strokeWidth="1.7" />
          <path
            d="M14.8 13.7l3.4 3.4M18.2 13.7l-3.4 3.4"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
          />
          <path
            d="M5.5 19.5h6"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinecap="round"
          />
        </svg>
      </span>
      <span className="font-display text-xl font-semibold tracking-tight sm:text-2xl">
        Cricket<span className={light ? "text-green-500" : "text-green-700"}>Hub</span>
      </span>
    </a>
  );
}
