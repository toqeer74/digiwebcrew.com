import { Container } from "@/components/layout/layout-primitives";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { QuoteWizard } from "@/components/sections/quote-wizard";
import { CheckCircle2, Shield, Code2, Zap, Globe, Smartphone } from "lucide-react";
import { getDictionary } from "@/lib/get-dictionary";

export default async function CustomWebAppsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const dict = await getDictionary(locale) as any;
  const isRtl = locale === 'ar' || locale === 'ur';

  return (
    <div className="flex flex-col min-h-screen" dir={isRtl ? 'rtl' : 'ltr'}>
      <Navbar dict={dict} locale={locale} />
      <main className="flex-1 pt-60 pb-20">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 pb-20">
            {/* Content Side */}
            <div className="lg:col-span-4 space-y-8">
              <div>
                <h1 className="text-4xl font-bold tracking-tight mb-4">Custom Web Applications</h1>
                <p className="text-lg text-muted-foreground">
                  Bespoke web applications tailored to your unique business requirements. We build scalable, secure, and performant web solutions that drive growth.
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3 text-sm font-medium">
                  <CheckCircle2 size={18} className="text-primary" />
                  <span>Custom-tailored solutions</span>
                </div>
                <div className="flex items-center gap-3 text-sm font-medium">
                  <CheckCircle2 size={18} className="text-primary" />
                  <span>Scalable architecture</span>
                </div>
                <div className="flex items-center gap-3 text-sm font-medium">
                  <CheckCircle2 size={18} className="text-primary" />
                  <span>Modern tech stack</span>
                </div>
                <div className="flex items-center gap-3 text-sm font-medium">
                  <CheckCircle2 size={18} className="text-primary" />
                  <span>Responsive design</span>
                </div>
                <div className="flex items-center gap-3 text-sm font-medium">
                  <CheckCircle2 size={18} className="text-primary" />
                  <span>SEO optimized</span>
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-secondary/30 border border-border">
                <div className="flex items-center gap-3 mb-4">
                  <Shield className="text-primary" size={24} />
                  <span className="font-bold">Secure & Reliable</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Built with security best practices and reliable deployment strategies for peace of mind.
                </p>
              </div>

              {/* Features Grid */}
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-primary/5 border border-primary/20">
                  <Code2 className="text-primary mb-2" size={20} />
                  <h3 className="font-semibold text-sm mb-1">Clean Code</h3>
                  <p className="text-xs text-muted-foreground">Maintainable and well-documented</p>
                </div>
                <div className="p-4 rounded-xl bg-primary/5 border border-primary/20">
                  <Zap className="text-primary mb-2" size={20} />
                  <h3 className="font-semibold text-sm mb-1">High Performance</h3>
                  <p className="text-xs text-muted-foreground">Optimized for speed</p>
                </div>
                <div className="p-4 rounded-xl bg-primary/5 border border-primary/20">
                  <Globe className="text-primary mb-2" size={20} />
                  <h3 className="font-semibold text-sm mb-1">Global Ready</h3>
                  <p className="text-xs text-muted-foreground">Multi-language support</p>
                </div>
                <div className="p-4 rounded-xl bg-primary/5 border border-primary/20">
                  <Smartphone className="text-primary mb-2" size={20} />
                  <h3 className="font-semibold text-sm mb-1">Mobile First</h3>
                  <p className="text-xs text-muted-foreground">Responsive design</p>
                </div>
              </div>
            </div>

            {/* Wizard Side */}
            <div className="lg:col-span-8">
              <QuoteWizard dict={dict} isRtl={isRtl} locale={locale} preselectedService="custom-web-apps" />
            </div>
          </div>
        </Container>
      </main>
      <Footer dict={dict} locale={locale} />
    </div>
  );
}
