import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t bg-selva-950 text-niebla-50">
      <div className="mx-auto max-w-[1280px] px-6 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-ocre-400 text-selva-950 flex items-center justify-center font-display font-black">IK</div>
              <div>
                <p className="font-display font-bold">Resguardo Inga Kamentsá</p>
                <p className="text-xs tracking-widest opacity-60">MOCOA — PUTUMAYO</p>
              </div>
            </div>
            <p className="text-sm text-niebla-100/70 max-w-md leading-relaxed">
              Nukanchipa Iuiaí — Tejiendo memoria, territorio y armonía en la selva del Putumayo. Cabildo Inga Kamentsá de Mocoa.
            </p>
          </div>
          <div>
            <p className="font-semibold text-sm mb-3 text-ocre-400">Explorar</p>
            <ul className="space-y-2 text-sm text-niebla-100/70">
              <li><Link href="#territorio" className="hover:text-white">Territorio</Link></li>
              <li><Link href="#cultura" className="hover:text-white">Lengua & Medicina</Link></li>
              <li><Link href="#eventos" className="hover:text-white">Cronograma</Link></li>
            </ul>
          </div>
          <div>
            <p className="font-semibold text-sm mb-3 text-ocre-400">Cabildo</p>
            <ul className="space-y-2 text-sm text-niebla-100/70">
              <li><Link href="#familias" className="hover:text-white">Registro de familias</Link></li>
              <li><Link href="#eventos" className="hover:text-white">Cronograma</Link></li>
              <li><span className="opacity-50">Mocoa, Putumayo — Colombia</span></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row justify-between gap-2 text-xs text-niebla-100/50">
          <p>© 2026 Resguardo Inga Kamentsá de Mocoa. Todos los derechos reservados.</p>
          <p>Hecho con respeto por la selva y la palabra de los mayores.</p>
        </div>
      </div>
    </footer>
  );
}
