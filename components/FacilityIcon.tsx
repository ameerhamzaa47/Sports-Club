type FacilityIconProps = {
  name: string;
  className?: string;
};

export default function FacilityIcon({ name, className = "h-6 w-6" }: FacilityIconProps) {
  const common = {
    className,
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "currentColor",
    strokeWidth: 1.7,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  switch (name) {
    case "nets":
      return (
        <svg {...common}>
          <rect x="4" y="3" width="16" height="18" rx="2" />
          <path d="M8 3v18M12 3v18M16 3v18M4 8h16M4 13h16M4 18h16" />
        </svg>
      );
    case "practice":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="8" />
          <path d="M12 8v4l2.5 2.5" />
        </svg>
      );
    case "ground":
      return (
        <svg {...common}>
          <ellipse cx="12" cy="12" rx="9" ry="6" />
          <path d="M12 6v12M3.5 12h17" />
        </svg>
      );
    case "coaching":
      return (
        <svg {...common}>
          <path d="M12 12a3.5 3.5 0 100-7 3.5 3.5 0 000 7z" />
          <path d="M5 20c1.2-3 3.7-4.5 7-4.5S17.8 17 19 20" />
        </svg>
      );
    case "rooms":
      return (
        <svg {...common}>
          <path d="M4 20V8l8-4 8 4v12" />
          <path d="M9 20v-6h6v6" />
        </svg>
      );
    case "equipment":
      return (
        <svg {...common}>
          <path d="M8 4l2 16M14 4l-2 16" />
          <circle cx="12" cy="18" r="2.5" />
          <path d="M6 8h12" />
        </svg>
      );
    default:
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="8" />
        </svg>
      );
  }
}
