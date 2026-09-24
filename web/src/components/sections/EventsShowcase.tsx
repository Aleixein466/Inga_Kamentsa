"use client";
import { motion } from "framer-motion";
import { Calendar, MapPin, ArrowUpRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

// Mock Firestore — colección eventos (extraído de providers mock)
const eventos = [
  { nombre: "Inti Raymi — Fiesta del Sol", fecha: "21 Jun 2026", lugar: "Mocoa", img: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=600&q=80", favorito: true, desc: "Ceremonia mayor, danza y armonización." },
  { nombre: "Pawkar Raymi", fecha: "21 Mar 2026", lugar: "Resguardo", img: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=600&q=80", favorito: true, desc: "Florecimiento y siembra." },
  { nombre: "Armonización Yagé", fecha: "15 Feb 2026", lugar: "Maloca", img: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600&q=80", favorito: false, desc: "Encuentro de mayores y medicina." },
];

export function EventsShowcase() {
  return (
    <section id="eventos" className="mx-auto max-w-[1280px] px-6 py-16">
      <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
        <div>
          <p className="text-xs tracking-[0.2em] uppercase text-ocre-600 font-semibold">Cronograma vivo</p>
          <h2 className="font-display font-black text-3xl">Eventos que tejen comunidad</h2>
        </div>
        <a href="#eventos">
          <Button variant="outline">Ver cronograma <ArrowUpRight className="w-4 h-4" /></Button>
        </a>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {eventos.map((e, i) => (
          <motion.div key={e.nombre} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}>
            <Card className="overflow-hidden group hover:shadow-selva hover:-translate-y-1 transition-all duration-300 h-full flex flex-col">
              <div className="relative h-48 overflow-hidden">
                <img src={e.img} alt={e.nombre} className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                {e.favorito && <Badge className="absolute top-3 left-3 bg-ocre-400 text-selva-900">Favorito</Badge>}
                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <p className="font-display font-bold leading-tight">{e.nombre}</p>
                  <p className="text-xs text-white/80 flex items-center gap-1"><Calendar className="w-3 h-3" /> {e.fecha} · <MapPin className="w-3 h-3" /> {e.lugar}</p>
                </div>
              </div>
              <CardContent className="p-5 flex-1 flex flex-col">
                <p className="text-sm text-muted-foreground flex-1">{e.desc}</p>
                <Button variant="ghost" className="mt-3 justify-start px-0 hover:bg-transparent hover:text-ocre-600">
                  Conocer más <ArrowUpRight className="w-4 h-4" />
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
