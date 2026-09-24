"use client";
import { motion } from "framer-motion";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, Calendar, Map, Database } from "lucide-react";

const data = [
  { name: "Familias", v: 187, fill: "#1a3a2a" },
  { name: "Usuarios", v: 642, fill: "#d4a24e" },
  { name: "Eventos", v: 24, fill: "#b0704a" },
  { name: "Asistencias", v: 412, fill: "#14301e" },
];

export function TerritoryDashboard() {
  return (
    <section id="territorio" className="mx-auto max-w-[1280px] px-6 py-8">
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Métricas */}
        <div className="lg:col-span-2">
          <Card className="overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="flex items-center gap-2"><Database className="w-5 h-5 text-ocre-500" /> Métricas comunitarias</CardTitle>
              <Badge variant="selva">Tiempo real · Firestore</Badge>
            </CardHeader>
            <CardContent>
              <div className="h-[260px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={data} barSize={38}>
                    <XAxis dataKey="name" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
                    <YAxis width={30} tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
                    <Tooltip cursor={{ fill: "rgba(0,0,0,0.03)" }} contentStyle={{ borderRadius: 12, border: "1px solid #e7e5dd" }} />
                    <Bar dataKey="v" radius={[12, 12, 12, 12]}>
                      {data.map((d, i) => <Cell key={i} fill={d.fill} />)}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <p className="text-xs text-muted-foreground mt-2">Fuente: Firestore <code className="bg-muted px-1 py-0.5 rounded">eventos</code> / <code className="bg-muted px-1 py-0.5 rounded">familias</code> (mock local si no hay config).</p>
            </CardContent>
          </Card>
        </div>

        {/* Cards territorio */}
        <div className="grid gap-6">
          {[
            { icon: Map, label: "Territorio", value: "1.280 ha", sub: "Piedemonte amazónico", color: "bg-selva-900 text-white" },
            { icon: Users, label: "Familias Inga", value: "187", sub: "+12 este año", color: "bg-ocre-400 text-selva-900" },
            { icon: Calendar, label: "Próximo evento", value: "Inti Raymi", sub: "Junio · Ceremonia del Sol", color: "bg-arcilla-500 text-white" },
          ].map((c, i) => (
            <motion.div key={c.label} initial={{ opacity: 0, x: 12 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
              <Card className="overflow-hidden">
                <CardContent className="p-5 flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${c.color}`}>
                    <c.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-xs tracking-widest uppercase text-muted-foreground">{c.label}</p>
                    <p className="font-display font-black text-lg leading-none">{c.value}</p>
                    <p className="text-xs text-muted-foreground">{c.sub}</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
