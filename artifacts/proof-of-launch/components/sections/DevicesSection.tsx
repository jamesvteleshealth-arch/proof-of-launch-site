import { Reveal } from "@/components/Reveal";
import { cn } from "@/lib/cn";

type FailureMode = { icon: string; title: string; description: string };
type DevicePriority = "critical" | "high" | "medium";
type Device = {
  name: string;
  os: string;
  priority: string;
  icon: string;
};

type DevicesSectionProps = {
  devicesSection: {
    eyebrow: string;
    headline: string;
    subhead: string;
    failureModes: FailureMode[];
    fleetLabel: string;
    devices: Device[];
  };
};

const PRIORITY: Record<
  DevicePriority,
  { label: string; chip: string; ring: string }
> = {
  critical: {
    label: "Critical",
    chip: "bg-critical/15 text-critical border-critical/40",
    ring: "before:bg-critical",
  },
  high: {
    label: "High",
    chip: "bg-teal/15 text-teal border-teal/40",
    ring: "before:bg-teal",
  },
  medium: {
    label: "Medium",
    chip: "bg-muted-2/15 text-muted-2 border-muted-2/40",
    ring: "before:bg-muted-2",
  },
};

export function DevicesSection({ devicesSection }: DevicesSectionProps) {
  const { eyebrow, headline, subhead, failureModes, fleetLabel, devices } =
    devicesSection;

  return (
    <section
      id="devices"
      className="relative border-b border-border-subtle py-24 md:py-32"
      aria-labelledby="devices-headline"
    >
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-14 lg:gap-20">
          <div>
            <Reveal>
              <p className="font-mono text-[11px] uppercase tracking-eyebrow text-teal">
                // {eyebrow}
              </p>
            </Reveal>
            <Reveal delay={80}>
              <h2
                id="devices-headline"
                className="mt-6 whitespace-pre-line font-display text-[44px] font-black uppercase leading-[0.95] tracking-tightest text-ink md:text-[64px]"
              >
                {headline}
              </h2>
            </Reveal>
            <Reveal delay={160}>
              <p className="mt-6 text-base leading-relaxed text-muted-2 md:text-[17px]">
                {subhead}
              </p>
            </Reveal>

            <ul className="mt-10 space-y-5">
              {failureModes.map((mode, i) => (
                <Reveal
                  as="li"
                  key={mode.title}
                  delay={200 + i * 80}
                  className="flex gap-4 border-t border-border-subtle pt-5"
                >
                  <span
                    aria-hidden="true"
                    className="text-2xl leading-none"
                  >
                    {mode.icon}
                  </span>
                  <div>
                    <h3 className="font-display text-lg font-bold uppercase tracking-tight text-ink">
                      {mode.title}
                    </h3>
                    <p className="mt-2 text-[13.5px] leading-relaxed text-muted-2">
                      {mode.description}
                    </p>
                  </div>
                </Reveal>
              ))}
            </ul>
          </div>

          <div>
            <Reveal>
              <p className="font-mono text-[11px] uppercase tracking-eyebrow text-muted-2">
                // {fleetLabel}
              </p>
            </Reveal>

            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {devices.map((device, i) => {
                const priority =
                  PRIORITY[(device.priority as DevicePriority)] ??
                  PRIORITY.medium;
                return (
                  <Reveal
                    as="article"
                    key={device.name}
                    delay={i * 60}
                    className={cn(
                      "relative overflow-hidden rounded-md border border-border-visible bg-navy-800/60 p-5",
                      "before:absolute before:inset-x-0 before:top-0 before:h-[2px] before:content-['']",
                      priority.ring,
                    )}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <span
                        aria-hidden="true"
                        className="text-2xl leading-none"
                      >
                        {device.icon}
                      </span>
                      <span
                        className={cn(
                          "rounded-sm border px-2 py-0.5 font-mono text-[9px] font-bold uppercase tracking-eyebrow",
                          priority.chip,
                        )}
                      >
                        {priority.label}
                      </span>
                    </div>
                    <h3 className="mt-4 font-display text-[18px] font-bold uppercase leading-tight tracking-tight text-ink">
                      {device.name}
                    </h3>
                    <p className="mt-2 font-mono text-[10.5px] uppercase tracking-eyebrow text-muted-2">
                      {device.os}
                    </p>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
