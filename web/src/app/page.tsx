import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { HeroKamentsa } from "@/components/sections/HeroKamentsa";
import { CulturalPillars } from "@/components/sections/CulturalPillars";
import { TerritoryDashboard } from "@/components/sections/TerritoryDashboard";
import { EventsShowcase } from "@/components/sections/EventsShowcase";
import { FamiliasCTA } from "@/components/sections/FamiliasCTA";

export default function Page() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <HeroKamentsa />
        <CulturalPillars />
        <TerritoryDashboard />
        <EventsShowcase />
        <FamiliasCTA />
        {/* Identidad — web 100% independiente de Django/Python */}
        <section className="mx-auto max-w-[1280px] px-6 py-12">
          <div className="rounded-2xl border bg-niebla-100 dark:bg-white/[0.04] p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">
              Web independiente — datos en <span className="font-semibold text-foreground">Firestore (inga-kamentsa)</span> · Sin dependencia de Python/Django. Plantilla Django legada solo como referencia.
            </p>
            <span className="text-xs px-3 py-1 rounded-full bg-selva-900 text-white dark:bg-ocre-400 dark:text-selva-900 font-semibold">Next.js 15 · Firestore</span>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
