"use client";
import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Leaf, Users, Calendar, BookOpen, LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";

const navLinks = [
  { href: "#territorio", label: "Territorio", icon: Leaf },
  { href: "#cultura", label: "Cultura", icon: BookOpen },
  { href: "#eventos", label: "Eventos", icon: Calendar },
  { href: "#familias", label: "Familias", icon: Users },
];

export function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 w-full border-b border-selva-900/5 bg-niebla-50/80 dark:bg-selva-950/80 backdrop-blur-xl">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8 flex h-[72px] items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-selva-900 dark:bg-ocre-400 flex items-center justify-center text-niebla-50 dark:text-selva-950 font-display font-black text-lg">
            IK
          </div>
          <div className="hidden sm:block">
            <p className="font-display font-extrabold leading-none text-[15px] tracking-tight">KAMENTSÁ</p>
            <p className="text-[11px] tracking-[0.18em] text-muted-foreground uppercase">Mocoa · Putumayo</p>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="px-4 py-2 rounded-full text-sm font-medium hover:bg-selva-900 hover:text-white dark:hover:bg-white dark:hover:text-selva-900 transition-colors flex items-center gap-2"
            >
              <l.icon className="w-4 h-4 opacity-60" />
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-2">
          <Link href="#familias">
            <Button variant="ghost" size="sm">
              Acceder
            </Button>
          </Link>
          <Link href="#familias">
            <Button variant="ocre" size="sm">
              <LogIn className="w-4 h-4" /> Crear cuenta
            </Button>
          </Link>
        </div>

        <button onClick={() => setOpen(!open)} className="md:hidden p-2 rounded-xl hover:bg-black/5 dark:hover:bg-white/10">
          {open ? <X /> : <Menu />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden border-t bg-niebla-50 dark:bg-selva-950 overflow-hidden"
          >
            <div className="px-4 py-4 flex flex-col gap-2">
              {navLinks.map((l) => (
                <Link key={l.href} href={l.href} onClick={() => setOpen(false)} className="px-4 py-3 rounded-xl hover:bg-selva-900 hover:text-white flex items-center gap-3">
                  <l.icon className="w-5 h-5" /> {l.label}
                </Link>
              ))}
              <div className="flex gap-2 pt-2">
                <Link href="#familias" className="flex-1">
                  <Button variant="outline" className="w-full">Acceder</Button>
                </Link>
                <Link href="#familias" className="flex-1">
                  <Button variant="ocre" className="w-full">Crear cuenta</Button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
