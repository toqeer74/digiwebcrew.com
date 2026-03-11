import Link from "next/link";
import { Container } from "@/components/layout/layout-primitives";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { getDictionary } from "@/lib/get-dictionary";
import { AnimatedSection } from "@/components/AnimatedSection";
import { Accordion } from "@/components/ui/accordion";
import { ServiceProcessSteps } from "@/components/sections/service-process-steps";
import { localePath } from "@/lib/locale-path";

const supportingPoints = [
  "Built for faster response and better lead flow",
  "Designed around real business tasks",
  "Connected to forms, CRM, and follow-up systems",
  "Structured to support growth without adding chaos",
];

const whoFor = [
  "law firms handling consultation inquiries",
  "clinics, dental practices, and med spas managing booking and lead questions",
  "home service businesses dealing with calls, form submissions, and service requests",
  "consultants and agencies handling inbound leads and discovery call requests",
  "businesses that lose leads because response is too slow",
  "teams that want clearer lead routing and better follow-up",
  "businesses that need support systems without hiring more people right away",
];

const buildTypes = [
  "Website chatbots",
  "Lead qualification flows",
  "CRM automation",
  "Email follow-up systems",
  "SMS and WhatsApp workflows",
  "Inquiry routing systems",
  "Appointment and booking support flows",
  "Support response systems",
  "Internal workflow automation",
  "AI-assisted lead handling systems",
];

const included = [
  ["Chatbot setup", "A website chat experience built to answer common questions, guide visitors, and support lead capture."],
  ["Lead qualification logic", "Question flows that help sort leads based on service type, urgency, fit, or next-step intent."],
  ["Workflow automation", "Automated actions that reduce manual tasks and move leads or requests through the right process."],
  ["CRM integration", "Connection with CRM tools so lead details, notes, and status updates are handled more cleanly."],
  ["Follow-up support", "Automated email, SMS, or WhatsApp steps where they make sense for the business."],
  ["Routing and escalation", "Logic that sends inquiries to the right person, team, or next action based on need."],
  ["Support flow design", "A clearer structure for handling repeated customer questions or early-stage inquiries."],
  ["System planning", "A setup built around how the business actually works instead of adding random automation on top."],
];

const problems = [
  "slow response to new inquiries",
  "missed leads after hours",
  "repeated questions taking too much team time",
  "poor follow-up after form submission",
  "no clear lead qualification process",
  "too much manual admin work",
  "disconnected communication tools",
  "confusion about who should respond next",
  "leads getting lost between systems",
  "inconsistent handling of inbound requests",
];

const bestUseCases = [
  "handling website inquiries outside business hours",
  "qualifying leads before a sales call or consultation",
  "routing form submissions to the right person",
  "sending faster follow-up after contact",
  "reducing repetitive support questions",
  "supporting booking or appointment requests",
  "organizing lead communication across channels",
  "improving first-response experience without extra staff pressure",
];

const futureExpansion = [
  "voice-based lead intake",
  "more advanced qualification logic",
  "deeper CRM process automation",
  "support escalation flows",
  "connected website, funnel, and automation systems",
];

const relatedServices = [
  "Conversion Funnels and Landing Pages",
  "Custom Website Development",
  "SEO and Growth Retainers",
  "CRM Integration",
  "Website Maintenance and Support",
  "DevOps and Cloud",
];

const faqItems = [
  {
    value: "faq-1",
    title: "Do I need a chatbot to use automation?",
    content:
      "No. Some projects involve a chatbot, while others focus more on follow-up, routing, CRM updates, or internal workflow improvements.",
  },
  {
    value: "faq-2",
    title: "Can you connect automation to my CRM or booking tools?",
    content:
      "Yes. We can support integrations with CRM, booking, forms, and communication tools depending on the project.",
  },
  {
    value: "faq-3",
    title: "Will this replace human support?",
    content:
      "Not fully. The goal is usually to improve speed, reduce repetitive work, and make handoff easier. Human support still matters in many cases.",
  },
  {
    value: "faq-4",
    title: "Can automation help after someone fills out a form?",
    content:
      "Yes. Follow-up, routing, confirmation, tagging, and next-step actions are common parts of this kind of setup.",
  },
  {
    value: "faq-5",
    title: "Can I start small and expand later?",
    content:
      "Yes. Many businesses begin with one focused system and add more workflow layers as the need grows.",
  },
];

export default async function AIChatbotsAutomationPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale);
  const isRtl = locale === "ar" || locale === "ur";

  return (
    <div className="flex flex-col min-h-screen bg-[#0A0A0F]" dir={isRtl ? "rtl" : "ltr"}>
      <Navbar dict={dict} locale={locale} />
      <main className="flex-1 pt-32 pb-24">
        <Container>
          <div className="max-w-5xl mx-auto space-y-8">
            <AnimatedSection className="text-center">
              <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-4 text-[#F8F8FF]">
                AI Chatbots and Automation Built to Improve Lead Handling and Response Speed
              </h1>
              <p className="text-lg text-[#94A3B8] mb-6">
                We build practical chatbot and automation systems that help businesses capture leads, qualify inquiries, reduce manual follow-up, and improve customer communication.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                {supportingPoints.map((point) => (
                  <div key={point} className="rounded-lg border border-[#1E1E2E] bg-[#13131E] px-4 py-3 text-sm text-[#94A3B8]">
                    {point}
                  </div>
                ))}
              </div>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href={localePath(locale, "/book-consultation")} className="inline-flex items-center justify-center px-8 py-4 bg-[#6366F1] text-white font-bold rounded-lg hover:bg-[#6366F1]/90 transition-colors">
                  Book Consultation
                </Link>
                <Link href={localePath(locale, "/quote")} className="inline-flex items-center justify-center px-8 py-4 border border-[#1E1E2E] bg-[#13131E] text-[#F8F8FF] font-bold rounded-lg hover:border-[#6366F1]/50 transition-colors">
                  Get Custom Project Scope
                </Link>
              </div>
            </AnimatedSection>

            <AnimatedSection className="bg-[#13131E] border border-[#1E1E2E] rounded-xl p-8">
              <h2 className="text-2xl font-bold text-[#F8F8FF] mb-4">Automation Should Make the Business Run Better</h2>
              <p className="text-[#94A3B8] mb-3">Most businesses do not need more tools. They need better systems.</p>
              <p className="text-[#94A3B8] mb-3">
                Digital Web Crew builds chatbot and automation setups that help businesses respond faster, route inquiries more clearly, reduce repetitive work, and create a smoother path from first contact to next step.
              </p>
              <p className="text-[#94A3B8] mb-3">
                This can include website chat, lead qualification, workflow logic, CRM actions, follow-up sequences, and other process improvements that support the way the business actually operates.
              </p>
              <p className="text-[#94A3B8]">The goal is simple. Help the team save time, respond better, and handle leads with less friction.</p>
            </AnimatedSection>

            <AnimatedSection className="bg-[#13131E] border border-[#1E1E2E] rounded-xl p-8">
              <h2 className="text-2xl font-bold text-[#F8F8FF] mb-4">Who This Service Is Built For</h2>
              <p className="text-[#94A3B8] mb-4">
                This service is a strong fit for businesses that deal with incoming leads, repeated questions, manual follow-up, or slow response times.
              </p>
              <ul className="list-disc list-inside space-y-2 text-[#94A3B8]">
                {whoFor.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </AnimatedSection>

            <AnimatedSection className="bg-[#13131E] border border-[#1E1E2E] rounded-xl p-8">
              <h2 className="text-2xl font-bold text-[#F8F8FF] mb-4">What We Can Build</h2>
              <p className="text-[#94A3B8] mb-4">
                The right automation setup depends on your lead flow, current tools, and what parts of the process take too much manual work today.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
                {buildTypes.map((item) => (
                  <div key={item} className="rounded-lg border border-[#1E1E2E] bg-[#0F0F18] px-4 py-3 text-[#94A3B8]">
                    {item}
                  </div>
                ))}
              </div>
              <p className="text-[#94A3B8]">
                Some businesses need a focused chatbot setup. Others need a wider automation layer connected to lead handling, communication, and internal workflows.
              </p>
            </AnimatedSection>

            <AnimatedSection className="bg-[#13131E] border border-[#1E1E2E] rounded-xl p-8">
              <h2 className="text-2xl font-bold text-[#F8F8FF] mb-4">What&apos;s Included in This Service</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {included.map(([title, desc]) => (
                  <div key={title} className="rounded-lg border border-[#1E1E2E] bg-[#0F0F18] p-4">
                    <h3 className="font-semibold text-[#F8F8FF] mb-2">{title}</h3>
                    <p className="text-sm text-[#94A3B8]">{desc}</p>
                  </div>
                ))}
              </div>
            </AnimatedSection>

            <AnimatedSection className="bg-[#13131E] border border-[#1E1E2E] rounded-xl p-8">
              <h2 className="text-2xl font-bold text-[#F8F8FF] mb-4">What Better Automation Can Fix</h2>
              <p className="text-[#94A3B8] mb-4">
                Many businesses lose time and leads because too much depends on manual response, slow follow-up, or disconnected tools. This service can help solve problems like:
              </p>
              <ul className="list-disc list-inside space-y-2 text-[#94A3B8] mb-4">
                {problems.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <p className="text-[#94A3B8]">
                The goal is not to automate everything. It is to improve the parts of the process that are slowing the business down.
              </p>
            </AnimatedSection>

            <AnimatedSection className="bg-[#13131E] border border-[#1E1E2E] rounded-xl p-8">
              <h2 className="text-2xl font-bold text-[#F8F8FF] mb-4">How We Approach Automation Projects</h2>
              <p className="text-[#94A3B8] mb-3">We start by looking at what happens now.</p>
              <p className="text-[#94A3B8] mb-3">
                That means understanding how leads come in, what information matters, where the delays are, and which tasks are repeated too often. From there, we define a setup that fits the business instead of forcing the business to fit the tool.
              </p>
              <p className="text-[#94A3B8] mb-3">
                Some projects need only a chatbot and a simple follow-up flow. Others need multiple connected actions across forms, CRM, messaging, and internal systems.
              </p>
              <p className="text-[#94A3B8]">We keep the focus on practical use. Clear entry points, better handoff, faster response, and less manual work.</p>
            </AnimatedSection>

            <AnimatedSection className="bg-[#13131E] border border-[#1E1E2E] rounded-xl p-8">
              <h2 className="text-2xl font-bold text-[#F8F8FF] mb-4">Best Use Cases for This Service</h2>
              <p className="text-[#94A3B8] mb-4">
                This service works especially well for businesses that need faster and more consistent lead handling.
              </p>
              <ul className="list-disc list-inside space-y-2 text-[#94A3B8]">
                {bestUseCases.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </AnimatedSection>

            <AnimatedSection className="bg-[#13131E] border border-[#1E1E2E] rounded-xl p-8">
              <h2 className="text-2xl font-bold text-[#F8F8FF] mb-4">Built With Room to Grow</h2>
              <p className="text-[#94A3B8] mb-4">
                Some businesses begin with a simple chatbot or workflow and expand later into a broader communication system.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 mb-4">
                {futureExpansion.map((item) => (
                  <div key={item} className="rounded-lg border border-[#1E1E2E] bg-[#0F0F18] px-4 py-3 text-[#94A3B8]">
                    {item}
                  </div>
                ))}
              </div>
              <p className="text-[#94A3B8]">The setup should be useful now and flexible enough to grow later.</p>
            </AnimatedSection>

            <AnimatedSection className="bg-[#13131E] border border-[#1E1E2E] rounded-xl p-8">
              <h2 className="text-2xl font-bold text-[#F8F8FF] mb-4">Related Services That Pair Well With Automation</h2>
              <p className="text-[#94A3B8] mb-4">Automation usually works best when it is connected to the rest of the digital system.</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {relatedServices.map((item) => (
                  <span key={item} className="px-3 py-2 rounded-full border border-[#1E1E2E] bg-[#0F0F18] text-sm text-[#94A3B8]">
                    {item}
                  </span>
                ))}
              </div>
              <p className="text-[#94A3B8]">These can be added into a broader project scope when the business needs a more connected setup.</p>
            </AnimatedSection>

            <AnimatedSection>
              <ServiceProcessSteps
                title="What the Process Looks Like"
                steps={[
                  { title: "Discover", description: "We review your lead flow, communication gaps, current tools, and the manual tasks creating friction." },
                  { title: "Scope", description: "We define the right automation structure, chatbot behavior, integrations, and next-step logic." },
                  { title: "Build and Connect", description: "We set up the system, connect the tools, and shape the flow around your business process." },
                  { title: "Test and Improve", description: "We review how it performs, adjust weak points, and support the next phase as needed." },
                ]}
                ctaHref={localePath(locale, "/process")}
                ctaLabel="View Full Process"
              />
            </AnimatedSection>

            <AnimatedSection className="bg-[#13131E] border border-[#1E1E2E] rounded-xl p-8">
              <h2 className="text-2xl font-bold text-[#F8F8FF] mb-4">Starting Price</h2>
              <p className="text-[#94A3B8] mb-3">
                Automation projects vary based on the number of workflows, platform integrations, communication channels, and logic complexity.
              </p>
              <p className="text-xl font-bold text-[#F8F8FF] mb-2">AI Chatbots and Automation starting at $2,500</p>
              <p className="text-[#94A3B8] mb-6">
                Larger workflow systems, multi-channel follow-up, and more advanced automation setups are scoped separately based on requirements.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href={localePath(locale, "/book-consultation")} className="inline-flex items-center justify-center px-8 py-4 bg-[#6366F1] text-white font-bold rounded-lg hover:bg-[#6366F1]/90 transition-colors">
                  Book Consultation
                </Link>
                <Link href={localePath(locale, "/quote")} className="inline-flex items-center justify-center px-8 py-4 border border-[#1E1E2E] bg-[#0F0F18] text-[#F8F8FF] font-bold rounded-lg hover:border-[#6366F1]/50 transition-colors">
                  Get Custom Project Scope
                </Link>
              </div>
            </AnimatedSection>

            <AnimatedSection>
              <h2 className="text-2xl font-bold text-[#F8F8FF] mb-4">Questions About Chatbots and Automation</h2>
              <Accordion items={faqItems} />
            </AnimatedSection>

            <AnimatedSection className="bg-[#13131E] border border-[#1E1E2E] rounded-xl p-8 text-center">
              <h2 className="text-2xl font-bold text-[#F8F8FF] mb-3">Need Better Lead Handling Without More Manual Work?</h2>
              <p className="text-[#94A3B8] mb-6">
                If your team is losing time to slow response, repeated questions, or disconnected follow-up, the right chatbot or automation setup can help. Book a consultation or get a custom project scope to move forward.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href={localePath(locale, "/book-consultation")} className="inline-flex items-center justify-center px-8 py-4 bg-[#6366F1] text-white font-bold rounded-lg hover:bg-[#6366F1]/90 transition-colors">
                  Book Consultation
                </Link>
                <Link href={localePath(locale, "/quote")} className="inline-flex items-center justify-center px-8 py-4 border border-[#1E1E2E] bg-[#0F0F18] text-[#F8F8FF] font-bold rounded-lg hover:border-[#6366F1]/50 transition-colors">
                  Get Custom Project Scope
                </Link>
              </div>
            </AnimatedSection>
          </div>
        </Container>
      </main>
      <Footer dict={dict} locale={locale} />
    </div>
  );
}
