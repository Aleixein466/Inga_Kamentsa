"use client";
import * as React from "react";
import { motion } from "framer-motion";
import { Languages, Leaf, Mountain, Sparkles } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { culturalPillars } from "@/lib/design-system";

const icons: Record<string, React.ComponentType<{ className?: string }>> = { Languages, Leaf, Mountain, Sparkles };

export function CulturalPillars() {
  return (
    <section id="cultura" className="mx-auto max-w-[1280px] px-6 py-16">
      <div className="max-w-2xl mx-auto text-center mb-10">
        <p className="text-xs tracking-[0.2em] uppercase text-ocre-600 font-semibold">Identidad Inga Kamentsá</p>
        <h2 className="font-display font-black text-3xl sm:text-4xl mt-2">Cuatro pilares que sostienen el territorio</h2>
        <p className="mt-3 text-muted-foreground">Palabra, medicina, tierra y tejido — principios que guían al Cabildo.</p>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
        {culturalPillars.map((p, i) => {
          const Icon = icons[p.icon];
          return (
            <motion.div key={p.title} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08, duration: 0.6 }}>
              <Card className="h-full group hover:shadow-selva hover:-translate-y-1 transition-all duration-300 overflow-hidden">
                <div className="h-1 bg-gradient-to-r from-ocre-400 to-arcilla-500" />
                <CardContent className="p-6">
                  <div className="w-11 h-11 rounded-xl bg-selva-900 text-niebla-50 dark:bg-ocre-400 dark:text-selva-900 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-display font-bold">{p.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1 leading-relaxed">{p.desc}</p>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
