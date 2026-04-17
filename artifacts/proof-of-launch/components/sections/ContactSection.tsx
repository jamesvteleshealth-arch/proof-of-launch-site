import { Reveal } from "@/components/Reveal";
import { ContactForm } from "@/components/ContactForm";

type Fact = { icon: string; text: string };

type ContactSectionProps = {
  contactSection: {
    eyebrow: string;
    headline: string;
    headlineAccent: string;
    subhead: string;
    facts: Fact[];
    form: React.ComponentProps<typeof ContactForm>["form"];
  };
};

function renderFactText(text: string) {
  // **bold** segments → <strong>
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={i} className="font-semibold text-ink">
          {part.slice(2, -2)}
        </strong>
      );
    }
    return <span key={i}>{part}</span>;
  });
}

export function ContactSection({ contactSection }: ContactSectionProps) {
  const { eyebrow, headline, headlineAccent, subhead, facts, form } =
    contactSection;

  return (
    <section
      id="contact"
      className="relative border-b border-border-subtle py-24 md:py-32"
      aria-labelledby="contact-headline"
    >
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-2 lg:gap-20">
          <div>
            <Reveal>
              <p className="font-mono text-[11px] uppercase tracking-eyebrow text-teal">
                // {eyebrow}
              </p>
            </Reveal>
            <Reveal delay={80}>
              <h2
                id="contact-headline"
                className="mt-6 whitespace-pre-line font-display text-[44px] font-black uppercase leading-[0.95] tracking-tightest text-ink md:text-[64px]"
              >
                {headline}
                <br />
                <span className="text-teal">{headlineAccent}</span>
              </h2>
            </Reveal>
            <Reveal delay={160}>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-2 md:text-[17px]">
                {subhead}
              </p>
            </Reveal>

            <ul className="mt-10 space-y-4">
              {facts.map((fact, i) => (
                <Reveal
                  as="li"
                  key={fact.text}
                  delay={200 + i * 60}
                  className="flex gap-4 border-t border-border-subtle pt-4"
                >
                  <span aria-hidden="true" className="text-xl leading-none">
                    {fact.icon}
                  </span>
                  <p className="text-[14px] leading-relaxed text-muted-2">
                    {renderFactText(fact.text)}
                  </p>
                </Reveal>
              ))}
            </ul>
          </div>

          <div>
            <Reveal>
              <div className="rounded-md border border-border-visible bg-navy-800/60 p-6 md:p-8">
                <ContactForm form={form} />
              </div>
            </Reveal>

            <Reveal delay={120}>
              <div className="mt-6 space-y-3">
                {[
                  "Or book a 30-min Studio discovery call",
                  "Or book a 20-min LaunchOps intake call",
                ].map((label) => (
                  <a
                    key={label}
                    href="#"
                    data-calendly-pending="true"
                    className="flex items-center justify-between rounded-sm border border-dashed border-border-visible bg-navy-800/30 px-4 py-3 font-mono text-[11px] uppercase tracking-eyebrow text-muted-2 transition-colors hover:text-ink"
                  >
                    <span>{label}</span>
                    <span className="text-[10px] text-muted">Coming soon</span>
                  </a>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
