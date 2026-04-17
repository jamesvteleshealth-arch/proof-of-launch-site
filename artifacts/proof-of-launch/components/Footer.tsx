const LINKS = [
  { label: "Tracks", href: "#tracks" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "LaunchOps", href: "#launchops" },
  { label: "Studio", href: "#studio" },
  { label: "Device Lab", href: "#devices" },
  { label: "Contact", href: "#contact" },
];

export function Footer() {
  return (
    <footer className="border-t border-border-subtle bg-navy-900 py-14">
      <div className="mx-auto flex max-w-7xl flex-col gap-10 px-5 md:px-8">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <p className="font-mono text-[13px] uppercase tracking-eyebrow text-ink">
            PROOF<span className="text-teal italic">OF</span>LAUNCH LLC
          </p>
          <nav aria-label="Footer">
            <ul className="flex flex-wrap gap-x-6 gap-y-3">
              {LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="font-mono text-[11px] uppercase tracking-eyebrow text-muted-2 transition-colors hover:text-ink"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <p className="font-display text-[28px] font-black uppercase leading-tight tracking-tightest text-teal md:text-[36px]">
          The Proof Is In The Launch.
        </p>

        <p className="border-t border-border-subtle pt-6 font-mono text-[10.5px] uppercase tracking-eyebrow text-muted">
          © 2026 Proof of Launch LLC · Wyoming · Healthtech · Fintech · Retail
        </p>
      </div>
    </footer>
  );
}
