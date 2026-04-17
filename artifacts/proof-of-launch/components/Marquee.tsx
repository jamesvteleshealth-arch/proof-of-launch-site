type MarqueeProps = {
  items: string[];
  animationSpeed?: string;
};

export function Marquee({ items, animationSpeed = "30s" }: MarqueeProps) {
  if (!items.length) return null;

  return (
    <div
      className="relative overflow-hidden border-y border-border-subtle bg-navy-800/40 py-4"
      aria-label="Capabilities marquee"
    >
      <div
        className="flex w-max items-center gap-12 whitespace-nowrap will-change-transform motion-reduce:animate-none"
        style={{
          animation: `marquee-scroll ${animationSpeed} linear infinite`,
        }}
      >
        {[...items, ...items].map((item, i) => (
          <span
            key={i}
            className="flex items-center gap-12 font-mono text-[11px] uppercase tracking-eyebrow text-muted-2"
          >
            <span>{item}</span>
            <span className="text-teal" aria-hidden="true">
              ◆
            </span>
          </span>
        ))}
      </div>
      <style>{`
        @keyframes marquee-scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}
