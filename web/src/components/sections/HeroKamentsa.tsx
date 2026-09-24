"use client";
import { motion } from "framer-motion";
import { ArrowRight, Play, MapPin, Sprout, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export function HeroKamentsa() {
  return (
    <section className="relative overflow-hidden">
      {/* Fondo ancestral — gradiente selva + patrón sutil */}
      <div className="absolute inset-0 bg-gradient-to-br from-selva-900 via-selva-700 to-selva-900" />
      <div className="absolute inset-0 opacity-[0.07]" style={{backgroundImage:`url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`}} />
      <div className="absolute -top-32 -right-32 w-[600px] h-[600px] bg-ocre-400/20 rounded-full blur-[120px]" />
      <div className="absolute -bottom-40 -left-40 w-[700px] h-[700px] bg-arcilla-500/20 rounded-full blur-[130px]" />

      <div className="relative mx-auto max-w-[1280px] px-6 py-16 lg:py-24 grid lg:grid-cols-2 gap-10 items-center">
        {/* Izquierda — Copy */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: [0.25,0.1,0.25,1] }} className="text-niebla-50">
          <div className="flex flex-wrap gap-2 mb-5">
            <Badge variant="outline" className="bg-white/10 border-white/20 text-niebla-50 backdrop-blur">
              <MapPin className="w-3 h-3 mr-1" /> Resguardo — Mocoa, Putumayo
            </Badge>
            <Badge className="bg-ocre-400 text-selva-900 border-transparent">Nukanchipa Iuiaí</Badge>
          </div>

          <h1 className="font-display font-black leading-[0.9] tracking-tight text-[42px] sm:text-[56px] lg:text-[64px]">
            <span className="block text-niebla-100/90 text-[18px] font-body font-semibold tracking-[0.2em] mb-2">CABILDO INGA KAMENTSÁ · MOCOA</span>
            Resguardo
            <span className="block text-ocre-400">Inga Kamentsá</span>
            <span className="block">de Mocoa</span>
          </h1>

          <p className="mt-5 text-[17px] leading-relaxed text-niebla-100/80 max-w-[560px]">
            Tejemos memoria, lengua y medicina ancestral en la selva. Territorio de armonía, palabra de mayores y cuidado del agua. Un diseño que honra la tierra y mira al futuro.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button variant="ocre" size="lg" className="group">
              Explorar territorio <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Button>
            <Button variant="outline" size="lg" className="bg-white/10 border-white/20 text-white hover:bg-white hover:text-selva-900 backdrop-blur">
              <Play className="w-4 h-4" /> Ver historia
            </Button>
          </div>

          <div className="mt-8 flex items-center gap-6 text-sm text-niebla-100/70">
            <span className="flex items-center gap-2"><Sprout className="w-4 h-4 text-ocre-400" /> 1.280 ha protegidas</span>
            <span className="flex items-center gap-2"><Shield className="w-4 h-4 text-ocre-400" /> Cabildo reconocido</span>
          </div>
        </motion.div>

        {/* Derecha — Bento visual con Aceternity vibe */}
        <motion.div initial={{ opacity: 0, y: 24, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.8, delay: 0.15, ease: [0.25,0.1,0.25,1] }} className="relative">
          {/* Card principal con border-beam effect */}
          <div className="relative rounded-[28px] p-[1.5px] bg-gradient-to-br from-ocre-400 via-ocre-400/30 to-transparent">
            <div className="rounded-[26px] bg-niebla-50 dark:bg-selva-900 overflow-hidden shadow-[0_32px_80px_rgba(0,0,0,0.35)]">
              <div className="aspect-[4/3] relative bg-gradient-to-br from-selva-700 to-selva-900 flex items-center justify-center overflow-hidden">
                {/* Simulación foto territorio — reemplazable por /public/hero.jpg */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent z-10" />
                <img src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=900&q=80" alt="Selva Putumayo" className="absolute inset-0 w-full h-full object-cover opacity-90" />
                <div className="absolute bottom-4 left-4 right-4 z-20">
                  <p className="text-white font-display font-bold text-lg">Selva del Putumayo</p>
                  <p className="text-white/80 text-xs">Mocoa — piedemonte amazónico, agua y vida</p>
                </div>
                {/* Beam animado */}
                <motion.div className="absolute inset-0 z-10 rounded-[26px]" style={{background: `linear-gradient(90deg, transparent, rgba(212,162,78,0.5), transparent)`}} animate={{ x: ["-100%", "100%"] }} transition={{ duration: 2.5, repeat: Infinity, ease: "linear", repeatDelay: 1.5 }} />
              </div>
              <div className="p-5 grid grid-cols-3 gap-3">
                {[
                  { k: "Familias", v: "187" },
                  { k: "Lengua", v: "Inga" },
                  { k: "Eventos", v: "24/año" },
                ].map((s) => (
                  <div key={s.k} className="rounded-2xl bg-niebla-100 dark:bg-white/5 p-3 text-center">
                    <p className="font-display font-black text-selva-900 dark:text-white">{s.v}</p>
                    <p className="text-[11px] tracking-widest uppercase text-muted-foreground">{s.k}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Card flotante */}
          <motion.div initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.6 }} className="hidden sm:flex absolute -bottom-6 -left-6 bg-white dark:bg-selva-800 rounded-2xl shadow-selva p-4 items-center gap-3 border">
            <div className="w-12 h-12 rounded-xl bg-ocre-400 flex items-center justify-center text-selva-900 font-black">◉</div>
            <div>
              <p className="text-sm font-bold leading-none">Yagé & Memoria</p>
              <p className="text-xs text-muted-foreground">Saberes de los taitas</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
