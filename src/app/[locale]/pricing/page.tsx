import { Container } from "@/components/layout/layout-primitives";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Check, Info, Zap, Crown, BarChart3, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { getDictionary } from "@/lib/get-dictionary";
import Link from "next/link";

const pricingTiers = [
  {
    id: "mvp",
    price: "$5k - $10k",
    features: [
      "Next.js / React Frontend",
      "Standard UI/UX Design",
      "Authentication Support",
      "Basic SEO Layout",
      "4-6 Weeks Delivery"
    ],
    popular: false,
    icon: Zap,
    color: "from-blue-500 to-cyan-500"
  },
  {
    id: "enterprise",
    price: "$25k+",
    features: [
      "Fully Custom Architecture",
      "Premium Brand Identity",
      "Advanced API Orchestration",
      "Role-Based Dashboards",
      "8-12 Weeks Delivery"
    ],
    popular: true,
    icon: Crown,
    color: "from-indigo-500 to-purple-500"
  },
  {
    id: "retainer",
    price: "$2k/mo",
    features: [
      "20 Dev Hours / Month",
      "Priority Bug Support",
      "CI/CD Pipeline Care",
      "Monthly Growth Audit",
      "Rolling Contract"
    ],
    popular: false,
    icon: BarChart3,
    color: "from-emerald-500 to-teal-500"
  }
];

export default async function PricingPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const dict = await getDictionary(locale);
  const isRtl = locale === "ar" || locale === "ur";

  const tierLocales = {
    mvp: { name: "Standard MVP", desc: "Perfect for startups needing a fast, high-quality market entry.", cta: "Start MVP" },
    enterprise: { name: "Enterprise Build", desc: "Custom enterprise-grade systems with high scale requirements.", cta: "Request Consultation" },
    retainer: { name: "Scale Retainer", desc: "Ongoing engineering support to iterate and grow your product.", cta: "Book Retainer" }
  };

  return (
    <div className="flex flex-col min-h-screen" dir={isRtl ? "rtl" : "ltr"}>
      <Navbar dict={dict} locale={locale} />
      <main className="flex-1 pt-60 pb-20">
        <Container>
          <div className="w-full max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest mb-4 border border-primary/20">
                Transparent Allocation
              </div>
              <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-4">
                Surgical <span className="text-primary">Investment</span>
              </h1>
              <p className="text-lg text-muted-foreground">{dict.pricing.description}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {pricingTiers.map((tier) => {
                const Icon = tier.icon;
                return (
                  <div
                    key={tier.id}
                    className={cn(
                      "group relative p-6 rounded-2xl border transition-all duration-300 bg-background hover:shadow-xl hover:scale-105 border-border hover:border-primary/50",
                      tier.popular && "ring-2 ring-primary/20"
                    )}
                  >
                    {tier.popular && (
                      <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-widest bg-primary text-primary-foreground">
                        {dict.pricing.mostChosen}
                      </span>
                    )}

                    <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center mb-4 bg-gradient-to-br text-white shadow-lg", tier.color)}>
                      <Icon size={22} />
                    </div>

                    <h3 className="text-lg font-semibold mb-1 group-hover:text-primary transition-colors">
                      {(tierLocales as any)[tier.id].name}
                    </h3>
                    <div className="flex items-baseline gap-2 mb-1">
                      <p className="text-2xl font-bold tracking-tight">{tier.price}</p>
                      {tier.id === "retainer" && <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">{dict.pricing.startingAt}</span>}
                    </div>
                    <p className="text-sm text-muted-foreground mb-4">{(tierLocales as any)[tier.id].desc}</p>

                    <div className="space-y-2 mb-5">
                      {tier.features.map((feature) => (
                        <div key={feature} className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Check size={13} className="text-primary" />
                          {feature}
                        </div>
                      ))}
                    </div>

                    <Link
                      href={`/${locale}/quote`}
                      className={cn(
                        "flex items-center justify-between rounded-lg px-4 py-2.5 text-sm font-medium transition-colors",
                        tier.popular ? "bg-primary text-primary-foreground hover:bg-primary/90" : "bg-secondary text-primary hover:bg-secondary/80"
                      )}
                    >
                      <span>{(tierLocales as any)[tier.id].cta}</span>
                      <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                );
              })}
            </div>

            <div className="text-center mt-12 p-6 rounded-2xl bg-secondary/30 border border-border">
              <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mx-auto mb-3">
                <Info size={20} />
              </div>
              <h2 className="text-2xl font-bold tracking-tight mb-2">{dict.pricing.customTitle}</h2>
              <p className="text-sm text-muted-foreground mb-4">{dict.pricing.customDesc}</p>
              <Link
                href={`/${locale}/contact`}
                className="inline-flex items-center gap-2 px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
              >
                {dict.pricing.customCta}
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </Container>
      </main>
      <Footer dict={dict} locale={locale} />
    </div>
  );
}
