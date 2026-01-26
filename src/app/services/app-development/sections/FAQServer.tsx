export default function FAQServer() {
  const faqs = [
    {
      q: "How long does it take to build an app?",
      a: "It depends on scope. Most MVPs ship in 4–8 weeks, and more complex products take 8–16+ weeks. We define milestones early so delivery is predictable.",
    },
    {
      q: "What industries have you worked with?",
      a: "E-commerce, retail, fitness, fintech, internal tools and B2B SaaS. We adapt the process to your constraints and compliance needs.",
    },
    {
      q: "How do updates and maintenance work?",
      a: "We can provide ongoing support with monitoring, hotfixes, feature iterations and performance improvements — with clear SLAs if needed.",
    },
    {
      q: "What if I already have an app?",
      a: "We can audit, refactor, redesign, improve performance and ship new features. We’ll propose a roadmap based on impact and effort.",
    },
    {
      q: "How do you ensure app security?",
      a: "We follow best practices for auth, data handling, dependency hygiene and OWASP-aware patterns — plus automated checks in CI/CD where appropriate.",
    },
    {
      q: "What does it cost to develop an app?",
      a: "Pricing depends on scope, platforms, integrations and timeline. After a short discovery call, we provide a transparent quote with milestones.",
    },
  ];

  return (
    <section
      id="faq"
      className="relative w-full py-16 md:py-24 bg-[#060812]"
      aria-labelledby="faq-title"
    >
      <div className="mx-auto max-w-6xl px-6 lg:px-10">
        <div className="text-center">
          <h2
            id="faq-title"
            className="text-3xl font-semibold tracking-tight sm:text-4xl"
          >
            FAQ — App Development
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-white/60 sm:text-base">
            Answers to common questions before building and scaling apps with
            LHWEB.
          </p>
        </div>

        <div className="mx-auto mt-12 max-w-4xl rounded-3xl border border-white/10 bg-white/4 p-2 backdrop-blur">
          <div className="divide-y divide-white/10">
            {faqs.map((f) => (
              <details key={f.q} className="group px-4 py-3">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-2">
                  <span className="text-sm font-semibold text-white/85">
                    {f.q}
                  </span>
                  <span className="grid h-8 w-8 place-items-center rounded-2xl border border-white/10 bg-white/5 text-white/70 transition group-open:rotate-45">
                    +
                  </span>
                </summary>
                <div className="pb-3 text-sm leading-6 text-white/65">
                  {f.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
