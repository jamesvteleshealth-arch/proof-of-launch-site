import { useEffect, useRef, useState, FormEvent } from "react";

function App() {
  const revealRefs = useRef<(HTMLElement | null)[]>([]);
  const [activeSection, setActiveSection] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("on");
            observer.unobserve(e.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -40px 0px" }
    );

    const elements = document.querySelectorAll(".reveal");
    elements.forEach((el, i) => {
      (el as HTMLElement).style.transitionDelay = `${(i % 4) * 70}ms`;
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll("section[id]");
      let cur = "";
      sections.forEach((s) => {
        if (window.scrollY >= (s as HTMLElement).offsetTop - 130) cur = s.id;
      });
      setActiveSection(cur);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  const navLinkStyle = (hash: string) => ({
    color: activeSection === hash ? "var(--teal)" : undefined,
  });

  return (
    <>
      <nav>
        <a href="#" className="logo">
          <div className="logo-hex">POL</div>
          <span className="logo-text">
            PROOF<em>OF</em>LAUNCH
          </span>
        </a>
        <ul className="nav-links">
          <li>
            <a href="#pillars" style={navLinkStyle("pillars")}>
              Services
            </a>
          </li>
          <li>
            <a href="#build" style={navLinkStyle("build")}>
              Build
            </a>
          </li>
          <li>
            <a href="#prove" style={navLinkStyle("prove")}>
              QA &amp; Launch
            </a>
          </li>
          <li>
            <a href="#devices" style={navLinkStyle("devices")}>
              Device Lab
            </a>
          </li>
          <li>
            <a href="#contact" className="nav-pill">
              Start a Project
            </a>
          </li>
        </ul>
      </nav>

      <section id="hero">
        <div className="hero-glow-teal"></div>
        <div className="hero-glow-violet"></div>
        <div className="hero-inner">
          <div>
            <div className="hero-eyebrow">
              <span className="hero-dot"></span>Vibe Coding + DevOps
              Engineering · QA · Deploy · Prove
            </div>
            <h1 className="hero-h1">
              <span className="w1">IDEA TO</span>
              <span className="w2">PROVEN</span>
              <span className="w3">LAUNCH.</span>
            </h1>
            <p className="hero-sub">
              Proof of Launch builds across the full stack —{" "}
              <strong>vibe coding and AI tools for speed</strong>,{" "}
              <strong>DevOps engineers from scratch</strong> where it matters.
              Then we prove it's production-ready with real QA, real
              infrastructure, and real device testing. Business development
              consulting included from day one.
            </p>
            <div className="hero-btns">
              <a href="#contact" className="btn-teal">
                Start With a Free Discovery Call →
              </a>
              <a href="#pillars" className="btn-ghost">
                See How It Works ↓
              </a>
            </div>
          </div>
          <div className="hero-journey reveal">
            <div className="journey-header">// Your journey with us</div>
            <div className="journey-step">
              <div className="js-num" style={{ color: "var(--border2)" }}>
                01
              </div>
              <div>
                <div className="js-title">Discovery &amp; BD</div>
                <div className="js-desc">
                  We validate your idea, define the MVP, and map a build plan.
                  Business development consulting with James — included free.
                </div>
                <span className="js-tag" style={{ color: "var(--amber)" }}>
                  Free · Included
                </span>
              </div>
            </div>
            <div className="journey-step">
              <div className="js-num" style={{ color: "var(--border2)" }}>
                02
              </div>
              <div>
                <div className="js-title">Build</div>
                <div className="js-desc">
                  Our team builds your app using Replit, Lovable, Cursor, Bolt,
                  or v0 — the right tool for the right problem.
                </div>
                <span className="js-tag" style={{ color: "var(--violet)" }}>
                  2–12 Weeks
                </span>
              </div>
            </div>
            <div className="journey-step">
              <div className="js-num" style={{ color: "var(--border2)" }}>
                03
              </div>
              <div>
                <div className="js-title">Prove &amp; Deploy</div>
                <div className="js-desc">
                  Full QA suite, real device testing, cloud infrastructure
                  setup. Your app ships production-ready.
                </div>
                <span className="js-tag" style={{ color: "var(--teal)" }}>
                  Bundled In
                </span>
              </div>
            </div>
            <div className="journey-step">
              <div className="js-num" style={{ color: "var(--border2)" }}>
                04
              </div>
              <div>
                <div className="js-title">Live</div>
                <div className="js-desc">
                  Your app is in users' hands. Proven, deployed, and documented.
                  Ongoing QA retainer available.
                </div>
                <span className="js-tag" style={{ color: "#10B981" }}>
                  You Ship With Confidence
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="marquee-bar">
        <div className="marquee-track">
          {[0, 1].map((k) => (
            <span key={k} style={{ display: "contents" }}>
              <span className="mitem">
                <span className="mdot"></span>Vibe Coding + DevOps Engineering
              </span>
              <span className="mitem">
                <span className="mdot"></span>Business Development
              </span>
              <span className="mitem">
                <span className="mdot"></span>Replit · Lovable · Cursor · Bolt ·
                v0
              </span>
              <span className="mitem">
                <span className="mdot"></span>Functional QA
              </span>
              <span className="mitem">
                <span className="mdot"></span>Real Device Testing
              </span>
              <span className="mitem">
                <span className="mdot"></span>AWS · GCP · Azure · DigitalOcean
              </span>
              <span className="mitem">
                <span className="mdot"></span>App Store Compliance
              </span>
              <span className="mitem">
                <span className="mdot"></span>HIPAA · Fintech
              </span>
              <span className="mitem">
                <span className="mdot"></span>DevOps From Scratch
              </span>
              <span className="mitem">
                <span className="mdot"></span>Chicago HQ · Manila Team
              </span>
            </span>
          ))}
        </div>
      </div>

      <section id="pillars">
        <div className="slabel">What We Do</div>
        <h2 className="stitle reveal">
          Two Services.
          <br />
          One Studio.
        </h2>
        <p className="ssub reveal">
          You can come to us with a raw idea, or an app that's already built.
          Either way, you leave with something proven.
        </p>
        <div className="pillars-split">
          <div className="pillar" style={{ ["--p-color" as string]: "var(--violet)" }}>
            <div className="pillar-bg-text">BUILD</div>
            <span className="pillar-icon">🏗️</span>
            <div className="pillar-label" style={{ color: "var(--violet)" }}>
              Pillar One
            </div>
            <div className="pillar-name">Build</div>
            <div className="pillar-tagline">
              You have an idea. We validate it, scope it, and build it — using
              vibe coding and AI tools for speed, and DevOps engineers from
              scratch where reliability matters. QA and deployment bundled in.
            </div>
            <ul className="pillar-features">
              <li style={{ ["--li-color" as string]: "var(--violet)" }}>
                Free discovery &amp; BD consulting with James
              </li>
              <li>MVP scoping and market validation</li>
              <li>
                Vibe coding for speed — Replit, Lovable, Cursor, Bolt, v0
              </li>
              <li>DevOps engineers for infrastructure, from scratch</li>
              <li>QA and cloud deploy included in every build tier</li>
              <li>Phased billing — Discovery → Build → Launch</li>
            </ul>
            <a
              href="#build"
              className="pillar-cta"
              style={{ color: "var(--violet)" }}
            >
              See Build Tiers →
            </a>
            <style>{`.pillar:first-child::after { background: var(--violet); } .pillar:first-child li::before { color: var(--violet); }`}</style>
          </div>
          <div className="pillar" style={{ ["--p-color" as string]: "var(--teal)" }}>
            <div className="pillar-bg-text">PROVE</div>
            <span className="pillar-icon">🔬</span>
            <div className="pillar-label" style={{ color: "var(--teal)" }}>
              Pillar Two
            </div>
            <div className="pillar-name">Prove</div>
            <div className="pillar-tagline">
              You already have an app. We test it, harden it, deploy it to real
              infrastructure, and certify it's ready for real users — on real
              devices.
            </div>
            <ul className="pillar-features">
              <li>Functional QA — 30 to 80+ test cases</li>
              <li>Physical device testing (iOS &amp; Android)</li>
              <li>Cloud migration off Replit to AWS, GCP, Azure</li>
              <li>App store compliance and HIPAA/Fintech audit</li>
              <li>Flat-rate pricing from $399</li>
            </ul>
            <a
              href="#prove"
              className="pillar-cta"
              style={{ color: "var(--teal)" }}
            >
              See QA Tiers →
            </a>
            <style>{`.pillar:last-child::after { background: var(--teal); } .pillar:last-child li::before { color: var(--teal); }`}</style>
          </div>
        </div>
      </section>

      <section id="build">
        <div className="slabel">Build Service</div>
        <h2 className="stitle reveal">
          From Idea to App
          <br />
          in Three Phases.
        </h2>
        <p className="ssub reveal">
          Every build starts with a free discovery session — no code, no cost,
          just a sharp conversation about what you're building and whether it
          has legs.
        </p>
        <div className="phases-row">
          <div className="phase-card reveal">
            <div className="ph-num">01</div>
            <span className="ph-icon">💡</span>
            <div className="ph-name">Discovery &amp; Business Development</div>
            <div className="ph-desc">
              James leads a structured discovery session to validate your idea,
              identify the market opportunity, define your MVP scope, choose the
              right tech stack, and produce a build estimate. This is where most
              studios charge $2,000+. We include it free — because a bad build
              scope wastes everyone's time.
            </div>
            <div className="ph-includes" style={{ color: "var(--amber)" }}>
              ✓ Free · Included with every build engagement
            </div>
            <style>{`.phase-card:nth-child(1)::before { background: var(--amber); } .phase-card:nth-child(1):hover .ph-num { color: var(--amber); }`}</style>
          </div>
          <div className="phase-card reveal">
            <div className="ph-num">02</div>
            <span className="ph-icon">⚙️</span>
            <div className="ph-name">Build</div>
            <div className="ph-desc">
              We use the right tool for each layer. Vibe coding tools like
              Lovable, v0, and Bolt accelerate UI and scaffolding. Cursor and
              Replit handle logic and integrations. Our DevOps engineers write
              infrastructure, deployment pipelines, and backend architecture
              from scratch — because some things shouldn't be AI-generated.
              Weekly progress demos throughout.
            </div>
            <div className="ph-includes" style={{ color: "var(--violet)" }}>
              ✓ Weekly demos · Revision rounds included
            </div>
            <style>{`.phase-card:nth-child(2)::before { background: var(--violet); } .phase-card:nth-child(2):hover .ph-num { color: var(--violet); }`}</style>
          </div>
          <div className="phase-card reveal">
            <div className="ph-num">03</div>
            <span className="ph-icon">🚀</span>
            <div className="ph-name">Prove &amp; Launch</div>
            <div className="ph-desc">
              Every build includes a Proof of Launch QA and deploy cycle.
              Functional testing, real device lab, cloud infrastructure setup,
              app store submission if applicable. You don't just get code — you
              get a production-ready product with a written go/no-go report.
            </div>
            <div className="ph-includes" style={{ color: "var(--teal)" }}>
              ✓ QA tier bundled · Cloud deploy included
            </div>
            <style>{`.phase-card:nth-child(3)::before { background: var(--teal); } .phase-card:nth-child(3):hover .ph-num { color: var(--teal); }`}</style>
          </div>
        </div>
        <div className="build-tiers">
          <div className="bt-card reveal">
            <div className="bt-tier">Build Tier 01</div>
            <div className="bt-name">Starter Build</div>
            <div className="bt-sub">
              Web app, internal tool, or landing page — AI-accelerated
            </div>
            <div className="bt-price">
              <sup>$</sup>2,999
            </div>
            <div className="bt-price-note">FLAT · ONE TIME</div>
            <div className="bt-div"></div>
            <ul className="bt-features">
              <li>Discovery &amp; BD consulting (free)</li>
              <li>Web app or internal tool build</li>
              <li>Up to 5 core feature screens</li>
              <li>Responsive design</li>
              <li>Deployment to Vercel, Netlify, or Railway</li>
              <li>Tier 1 Sanity Check QA included</li>
            </ul>
            <div className="bt-incl">
              QA included: <strong>Sanity Check ($399 value)</strong>
            </div>
            <div className="bt-timeline">⏱ ~2 week build</div>
          </div>
          <div className="bt-card featured reveal">
            <div className="bt-badge">Most Popular</div>
            <div className="bt-tier">Build Tier 02</div>
            <div className="bt-name">Growth Build</div>
            <div className="bt-sub">
              Full web or mobile app — hybrid vibe coding + engineering
            </div>
            <div className="bt-price">
              <sup>$</sup>6,999
            </div>
            <div className="bt-price-note">FLAT · ONE TIME</div>
            <div className="bt-div"></div>
            <ul className="bt-features">
              <li>Discovery &amp; BD consulting (free)</li>
              <li>Full web or mobile app build</li>
              <li>Auth, database, API integrations</li>
              <li>iOS and/or Android ready</li>
              <li>2 rounds of revision</li>
              <li>Domain, SSL, CI/CD setup</li>
              <li>Tier 2 Launch Ready QA included</li>
              <li>Weekly progress demos</li>
            </ul>
            <div className="bt-incl">
              QA included: <strong>Launch Ready ($1,499 value)</strong>
            </div>
            <div className="bt-timeline">
              ⏱ 4–6 week build · vs. $12K+ freelance
            </div>
          </div>
          <div className="bt-card reveal">
            <div className="bt-tier">Build Tier 03</div>
            <div className="bt-name">Venture Build</div>
            <div className="bt-sub">
              Complex platform — DevOps engineers from scratch, AI-assisted
              where it accelerates
            </div>
            <div
              className="bt-price"
              style={{ fontSize: "32px", paddingTop: "12px" }}
            >
              Custom
              <br />
              Quote
            </div>
            <div className="bt-price-note">SCOPED ON DISCOVERY</div>
            <div className="bt-div"></div>
            <ul className="bt-features">
              <li>Full BD consulting + market analysis</li>
              <li>Multi-role, multi-screen platform</li>
              <li>Healthcare, Fintech, or marketplace builds</li>
              <li>External integrations (APIs, EMRs, etc.)</li>
              <li>DevOps infrastructure written from scratch</li>
              <li>
                Multi-environment architecture (dev / staging / prod)
              </li>
              <li>
                AI-accelerated where it adds speed — engineer-owned throughout
              </li>
              <li>AWS / GCP / Azure infrastructure</li>
              <li>Tier 3 Compliance Launch QA included</li>
              <li>UAT with recruited test users</li>
            </ul>
            <div className="bt-incl">
              QA included:{" "}
              <strong>Compliance Launch ($3,499 value)</strong>
            </div>
            <div className="bt-timeline">
              ⏱ 8–12 week build · vs. $20K–$40K agency
            </div>
          </div>
        </div>
        <div className="tools-strip reveal">
          <span className="tools-label">Our stack →</span>
          <span className="tool-badge">Replit</span>
          <span className="tool-badge">Lovable</span>
          <span className="tool-badge">Cursor</span>
          <span className="tool-badge">Bolt</span>
          <span className="tool-badge">v0 by Vercel</span>
          <span
            className="tool-badge"
            style={{ borderColor: "var(--teal)", color: "var(--teal)" }}
          >
            DevOps from scratch
          </span>
          <span
            className="tool-badge"
            style={{ borderColor: "var(--amber)", color: "var(--amber)" }}
          >
            AI-assisted
          </span>
        </div>

        <div
          className="reveal"
          style={{
            marginTop: "2rem",
            padding: "20px 28px",
            background: "var(--bg3)",
            borderLeft: "3px solid var(--teal)",
            maxWidth: "780px",
          }}
        >
          <span
            style={{
              fontFamily: "var(--fm)",
              fontSize: "10px",
              letterSpacing: ".12em",
              color: "var(--teal)",
              textTransform: "uppercase",
            }}
          >
            Our philosophy
          </span>
          <p
            style={{
              marginTop: "8px",
              fontSize: "15px",
              color: "var(--muted2)",
              lineHeight: 1.7,
            }}
          >
            <strong style={{ color: "var(--white)" }}>
              Speed from AI. Trust from engineers.
            </strong>{" "}
            We use vibe coding and AI tools where they genuinely accelerate — UI
            scaffolding, rapid prototyping, iteration. Our DevOps engineers write
            infrastructure, deployment pipelines, and business-critical logic
            from scratch. Every build is AI-accelerated and human-owned.
          </p>
        </div>
      </section>

      <section id="prove">
        <div className="slabel">QA &amp; Launch Engineering</div>
        <h2 className="stitle reveal">
          Already Built?
          <br />
          Let's Prove It.
        </h2>
        <p className="ssub reveal">
          Bring us your existing app — vibe coded, agency built, or homegrown.
          We test it, harden it, and deploy it to production-grade
          infrastructure.
        </p>
        <div className="prove-grid">
          <div className="pc reveal">
            <div className="pc-tier">QA Tier 01</div>
            <div className="pc-name">Sanity Check</div>
            <div className="pc-for">Pre-submission gut check</div>
            <div className="pc-price">
              <sup>$</sup>399
            </div>
            <div className="pc-note">FLAT · ONE TIME</div>
            <div className="pc-div"></div>
            <ul className="pc-list">
              <li>30 core test cases</li>
              <li>Bug report (P1–P4 severity)</li>
              <li>UX red flags noted</li>
              <li>Screenshots of failures</li>
              <li>Go / No-Go verdict</li>
            </ul>
            <div className="pc-time">⏱ 24-hour turnaround</div>
          </div>
          <div className="pc reveal">
            <div
              className="pc-badge"
              style={{ background: "var(--amber)", color: "var(--bg)" }}
            >
              New
            </div>
            <div className="pc-tier">QA Tier 02</div>
            <div className="pc-name">Finish Line</div>
            <div className="pc-for">Half-built app needs the finish</div>
            <div className="pc-price">
              <sup>$</sup>799
            </div>
            <div className="pc-note">FLAT · ONE TIME</div>
            <div className="pc-div"></div>
            <ul className="pc-list">
              <li>One feature completion or bug fix sprint</li>
              <li>DevOps or QA engineer assigned</li>
              <li>Sanity Check QA bundled</li>
              <li>Go / No-Go verdict</li>
              <li>Ideal for stalled Replit or Lovable builds</li>
            </ul>
            <div className="pc-time">⏱ 48-hour turnaround</div>
          </div>
          <div className="pc featured reveal">
            <div
              className="pc-badge"
              style={{ background: "var(--teal)", color: "var(--bg)" }}
            >
              Most Popular
            </div>
            <div className="pc-tier">QA Tier 03</div>
            <div className="pc-name">Launch Ready</div>
            <div className="pc-for">First real release</div>
            <div className="pc-price">
              <sup>$</sup>1,499
            </div>
            <div className="pc-note">FLAT · ONE TIME</div>
            <div className="pc-div"></div>
            <ul className="pc-list">
              <li>80+ case full test suite</li>
              <li>Basic physical device testing</li>
              <li>Domain, SSL, env migration</li>
              <li>UX + store metadata audit</li>
              <li>Privacy policy check</li>
              <li>Release notes drafted</li>
              <li>One retest cycle after fixes</li>
            </ul>
            <div className="pc-time">⏱ 5-day turnaround</div>
          </div>
          <div className="pc reveal">
            <div className="pc-tier">QA Tier 04</div>
            <div className="pc-name">Compliance Launch</div>
            <div className="pc-for">Healthcare &amp; Fintech apps</div>
            <div className="pc-price">
              <sup>$</sup>3,499
            </div>
            <div className="pc-note">FLAT · ONE TIME</div>
            <div className="pc-div"></div>
            <ul className="pc-list">
              <li>Everything in Launch Ready</li>
              <li>Full device matrix testing</li>
              <li>HIPAA permissions audit</li>
              <li>Data encryption verification</li>
              <li>Security &amp; auth edge cases</li>
              <li>CI/CD + DB migration</li>
              <li>Compliance summary memo</li>
            </ul>
            <div
              style={{
                marginTop: "12px",
                fontFamily: "var(--fm)",
                fontSize: "9px",
                color: "var(--muted2)",
                fontStyle: "italic",
              }}
            >
              HIPAA consultants alone charge $2K–$5K
            </div>
            <div className="pc-time">⏱ 7-day turnaround</div>
          </div>
          <div className="pc reveal">
            <div className="pc-tier">QA Tier 05</div>
            <div className="pc-name">Retainer</div>
            <div className="pc-for">Teams shipping weekly</div>
            <div className="pc-price">
              <sup>$</sup>3,500
            </div>
            <div className="pc-note">PER MONTH</div>
            <div className="pc-div"></div>
            <ul className="pc-list">
              <li>Up to 4 QA cycles / month</li>
              <li>2 physical device regression passes</li>
              <li>Hotfix verification</li>
              <li>Infra health monitoring</li>
              <li>Dedicated Slack channel</li>
              <li>Monthly QA summary</li>
              <li>Priority queue</li>
            </ul>
            <div
              style={{
                marginTop: "12px",
                fontFamily: "var(--fm)",
                fontSize: "9px",
                color: "var(--muted2)",
                fontStyle: "italic",
              }}
            >
              vs. $6K–$8K/mo for a junior US QA hire
            </div>
            <div className="pc-time">⏱ Priority turnaround</div>
          </div>
        </div>
        <div className="prove-addons">
          <div className="addon reveal">
            <div className="addon-ico">🚨</div>
            <div>
              <div className="addon-name">Rejection Recovery</div>
              <div className="addon-desc">
                Got rejected by App Store or Google Play? Fast audit +
                resubmission readiness.
              </div>
            </div>
            <div className="addon-p">
              <div className="addon-pnum">$499</div>
              <div className="addon-pnote">48-hr turnaround</div>
            </div>
          </div>
          <div className="addon reveal">
            <div className="addon-ico">📱</div>
            <div>
              <div className="addon-name">Real Device Audit</div>
              <div className="addon-desc">
                Device-specific crashes post-launch? 3-device physical audit
                with bug report.
              </div>
            </div>
            <div className="addon-p">
              <div className="addon-pnum">$699</div>
              <div className="addon-pnote">48-hr turnaround</div>
            </div>
          </div>
        </div>
        <div className="full-cycle reveal">
          <div className="fc-left">
            <div className="fc-ico">🏗️</div>
            <div>
              <div className="fc-name">Full Cycle</div>
              <div className="fc-desc">
                Complex platforms, regulated industries, funded startups. Phased
                QA, recruited UAT users, load testing, security audits, full
                cloud architecture. Scoped on discovery call.
              </div>
            </div>
          </div>
          <div className="fc-p">
            <div className="fc-pnum">Custom Quote</div>
            <div className="fc-pnote">2–5 week engagement</div>
          </div>
        </div>
      </section>

      <section id="devices">
        <div className="devices-layout">
          <div className="reveal">
            <div className="slabel">Real Device Lab</div>
            <h2 className="stitle">
              What Simulators
              <br />
              Won't Catch.
            </h2>
            <p className="ssub" style={{ marginBottom: 0 }}>
              Touch target failures. Camera permission bugs after restart.
              Offline sync breaking on iOS PWA. These only appear on real
              hardware — and that's exactly what our Manila-based device lab
              tests on.
            </p>
            <div className="field-list">
              <div className="fitem">
                <div className="fitem-ico">📷</div>
                <div>
                  <div className="fitem-title">
                    Camera permissions after app restart
                  </div>
                  <div className="fitem-desc">
                    Permission state changes between sessions — simulators
                    never replicate this.
                  </div>
                </div>
              </div>
              <div className="fitem">
                <div className="fitem-ico">☀️</div>
                <div>
                  <div className="fitem-title">
                    Outdoor sunlight readability
                  </div>
                  <div className="fitem-desc">
                    Clinical and field apps must be readable in direct sunlight.
                    We test there.
                  </div>
                </div>
              </div>
              <div className="fitem">
                <div className="fitem-ico">📶</div>
                <div>
                  <div className="fitem-title">
                    Offline sync and reconnect cycles
                  </div>
                  <div className="fitem-desc">
                    Data entered offline → airplane mode off → sync verified in
                    database.
                  </div>
                </div>
              </div>
              <div className="fitem">
                <div className="fitem-ico">📹</div>
                <div>
                  <div className="fitem-title">
                    WebRTC video device-to-device
                  </div>
                  <div className="fitem-desc">
                    Video call quality on actual mobile hardware — not a desktop
                    Chrome tab.
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="reveal">
            <div
              style={{
                fontFamily: "var(--fm)",
                fontSize: "10px",
                color: "var(--muted)",
                letterSpacing: ".1em",
                textTransform: "uppercase",
                marginBottom: "12px",
              }}
            >
              Our Device Fleet — Manila Lab
            </div>
            <div className="device-grid">
              <div className="dcard crit">
                <span className="dbadge crit">Critical</span>
                <div className="dcard-ico">📱</div>
                <div className="dcard-name">Samsung Galaxy Tab A</div>
                <div className="dcard-os">Android 13 · PWA workflows</div>
              </div>
              <div className="dcard crit">
                <span className="dbadge crit">Critical</span>
                <div className="dcard-ico">📱</div>
                <div className="dcard-name">Samsung Galaxy S</div>
                <div className="dcard-os">Android 13 · Consumer apps</div>
              </div>
              <div className="dcard hi">
                <span className="dbadge hi">High</span>
                <div className="dcard-ico">🍎</div>
                <div className="dcard-name">iPhone 14</div>
                <div className="dcard-os">iOS 17 · Safari PWA</div>
              </div>
              <div className="dcard hi">
                <span className="dbadge hi">High</span>
                <div className="dcard-ico">🍎</div>
                <div className="dcard-name">iPad 10th Gen</div>
                <div className="dcard-os">iPadOS 17 · Clinical</div>
              </div>
              <div className="dcard hi">
                <span className="dbadge hi">High</span>
                <div className="dcard-ico">📱</div>
                <div className="dcard-name">Google Pixel</div>
                <div className="dcard-os">Android Stock · Baseline</div>
              </div>
              <div className="dcard med">
                <span className="dbadge med">Medium</span>
                <div className="dcard-ico">📱</div>
                <div className="dcard-name">Samsung A Series</div>
                <div className="dcard-os">Android 12 · Perf floor</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="contact">
        <div className="contact-layout">
          <div className="reveal">
            <div className="slabel">Get Started</div>
            <h2 className="contact-h">
              Have an Idea
              <br />
              or an App?
              <br />
              <span style={{ color: "var(--teal)" }}>We Build Both.</span>
            </h2>
            <p className="contact-p">
              Tell us where you are — raw idea, app in progress, or ready to
              ship — and we'll come back within one business day with a clear
              next step. Discovery is always free.
            </p>
            <div className="cfacts">
              <div className="cfact">
                <div className="cfact-ico">💡</div>
                <span>
                  <strong>Discovery is free.</strong> No commitment, no invoice.
                </span>
              </div>
              <div className="cfact">
                <div className="cfact-ico">⚡</div>
                <span>
                  <strong>24-hour response</strong> on all new project
                  inquiries.
                </span>
              </div>
              <div className="cfact">
                <div className="cfact-ico">🌏</div>
                <span>
                  Chicago HQ ·{" "}
                  <strong>Manila engineering team</strong> — DevOps, QA, and
                  AI-assisted developers.
                </span>
              </div>
              <div className="cfact">
                <div className="cfact-ico">🔒</div>
                <span>
                  All projects covered by{" "}
                  <strong>NDA and IP agreement</strong> from day one.
                </span>
              </div>
              <div className="cfact">
                <div className="cfact-ico">💳</div>
                <span>
                  <strong>Flat-rate pricing</strong> — no hidden fees, no hourly
                  surprises.
                </span>
              </div>
            </div>
          </div>
          <div className="reveal">
            <form className="cform" onSubmit={handleSubmit}>
              <div className="frow">
                <div className="fg">
                  <label>Your Name</label>
                  <input type="text" placeholder="Jane Smith" required />
                </div>
                <div className="fg">
                  <label>Email</label>
                  <input
                    type="email"
                    placeholder="jane@yourapp.com"
                    required
                  />
                </div>
              </div>
              <div className="fg">
                <label>What do you need?</label>
                <select required>
                  <option value="">Select your situation</option>
                  <optgroup label="── BUILD SERVICE ──">
                    <option>
                      I have an idea — Discovery &amp; Build (free discovery)
                    </option>
                    <option>
                      Starter Build — Web app or tool ($2,999)
                    </option>
                    <option>Growth Build — Full app ($6,999)</option>
                    <option>
                      Venture Build — Complex platform (custom quote)
                    </option>
                  </optgroup>
                  <optgroup label="── QA & LAUNCH ──">
                    <option>Sanity Check — Quick QA ($399)</option>
                    <option>
                      Finish Line — Complete my half-built app ($799)
                    </option>
                    <option>
                      Launch Ready — Full QA + deploy ($1,499)
                    </option>
                    <option>
                      Compliance Launch — Healthcare/Fintech ($3,499)
                    </option>
                    <option>Retainer — Ongoing QA ($3,500/mo)</option>
                    <option>Rejection Recovery ($499)</option>
                    <option>Real Device Audit ($699)</option>
                    <option>Full Cycle (custom quote)</option>
                  </optgroup>
                  <option>Not sure yet — let's talk</option>
                </select>
              </div>
              <div className="frow">
                <div className="fg">
                  <label>App / Project Name</label>
                  <input type="text" placeholder="Or 'Untitled idea'" />
                </div>
                <div className="fg">
                  <label>Platform</label>
                  <select>
                    <option value="">Select</option>
                    <option>iOS</option>
                    <option>Android</option>
                    <option>iOS + Android</option>
                    <option>Web App</option>
                    <option>All Platforms</option>
                    <option>Not sure yet</option>
                  </select>
                </div>
              </div>
              <div className="fg">
                <label>Tell us more</label>
                <textarea placeholder="What's the idea or app? Target users? Known issues? Timeline pressure? Even rough notes work."></textarea>
              </div>
              <button
                type="submit"
                className="fsub"
                disabled={submitted}
                style={
                  submitted
                    ? {
                        background: "#009E80",
                        clipPath: "none",
                      }
                    : undefined
                }
              >
                {submitted
                  ? "✓ Received — We'll be in touch within 24 hours"
                  : "Send — We'll Respond Within 24 Hours →"}
              </button>
              <div className="fnote">
                All information kept strictly confidential. Discovery
                conversations are always free.
              </div>
            </form>
          </div>
        </div>
      </section>

      <footer>
        <div className="flogo">
          PROOF<em>OF</em>LAUNCH LLC
        </div>
        <ul className="flinks">
          <li>
            <a href="#pillars">Services</a>
          </li>
          <li>
            <a href="#build">Build</a>
          </li>
          <li>
            <a href="#prove">QA &amp; Launch</a>
          </li>
          <li>
            <a href="#devices">Device Lab</a>
          </li>
          <li>
            <a href="#contact">Contact</a>
          </li>
        </ul>
        <div className="fcopy">
          © 2025 Proof of Launch LLC · Wyoming · proofoflaunch.com
        </div>
      </footer>
    </>
  );
}

export default App;
