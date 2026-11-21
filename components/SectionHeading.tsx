type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  light?: boolean;
};

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  light = false,
}: SectionHeadingProps) {
  const alignment = align === "center" ? "mx-auto text-center" : "text-left";
  const titleColor = light ? "text-white" : "text-charcoal";
  const descColor = light ? "text-white/75" : "text-charcoal-muted";
  const eyeColor = light ? "text-green-500" : "text-green-700";

  return (
    <div className={`mb-10 max-w-2xl ${alignment} md:mb-14`}>
      {eyebrow ? (
        <p className={`mb-3 text-sm font-semibold uppercase tracking-[0.18em] ${eyeColor}`}>
          {eyebrow}
        </p>
      ) : null}
      <h2
        className={`font-display text-3xl font-semibold tracking-tight sm:text-4xl md:text-[2.75rem] ${titleColor}`}
      >
        {title}
      </h2>
      {description ? (
        <p className={`mt-4 text-base leading-relaxed sm:text-lg ${descColor}`}>
          {description}
        </p>
      ) : null}
    </div>
  );
}
