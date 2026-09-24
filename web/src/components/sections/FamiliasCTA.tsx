"use client";
import { motion } from "framer-motion";
import { UsersRound, ArrowRight, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

export function FamiliasCTA() {
  return (
    <section id="familias" className="mx-auto max-w-[1280px] px-6 py-8">
      <motion.div initial={{ opacity: 0, scale: 0.98 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="rounded-[24px] bg-selva-900 dark:bg-selva-800 p-[1px]">
        <div className="rounded-[23px] bg-gradient-to-br from-selva-900 to-selva-700 dark:from-selva-800 dark:to-selva-900 p-8 md:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="text-niebla-50">
            <p className="inline-flex items-center gap-2 text-xs tracking-[0.18em] uppercase bg-white/10 border border-white/20 px-3 py-1 rounded-full">
              <ShieldCheck className="w-3 h-3" /> Cabildo · Registro comunitario
            </p>
            <h3 className="font-display font-black text-2xl sm:text-3xl mt-3">¿Tu familia hace parte del resguardo?</h3>
            <p className="text-niebla-100/70 mt-2 max-w-xl">Gestiona familias y miembros con respeto y trazabilidad. Datos en Firestore <code className="bg-white/10 px-1 rounded">familias</code> + <code className="bg-white/10 px-1 rounded">usuarios_familias</code>.</p>
          </div>
          <div className="flex flex-wrap gap-3 shrink-0">
            <a href="#familias">
              <Button variant="ocre" size="lg"><UsersRound className="w-4 h-4" /> Registrar familia <ArrowRight className="w-4 h-4" /></Button>
            </a>
            <a href="#familias">
              <Button variant="outline" size="lg" className="bg-white/10 border-white/20 text-white hover:bg-white hover:text-selva-900">Ver miembros</Button>
            </a>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
