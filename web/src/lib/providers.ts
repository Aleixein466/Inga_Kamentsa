/* eslint-disable @typescript-eslint/no-explicit-any */
// Provider abstraction — Firebase es la BD canónica (inga-kamentsa) — OPCIONAL.
// Sin firebase instalado o sin env vars, usa mocks. 100% independiente de Django/Python.
// MySQL: este módulo puede consumir la API Express + Prisma en web/server vía
// fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/...`) cuando NEXT_PUBLIC_DATA_MODE lo requiera.
// Ver web/server/README.md y web/server/prisma/schema.prisma (espejo main/models.py).

import { db, isFirebaseConfigured } from "./firebase";

// Tipos canónicos (antes alineados con main/models.py — ahora independientes)
export type Evento = {
  id: string;
  nombre: string;
  descripcion?: string;
  imagen?: string;
  fecha_inicio: string;
  fecha_fin: string;
  es_favorito: boolean;
};

export type Familia = { id: string; n_familia: string };

// Mocks (fallback si Firebase no configurado o durante build)
const mockEventos: Evento[] = [
  { id: "1", nombre: "Inti Raymi — Fiesta del Sol", descripcion: "Ceremonia mayor", fecha_inicio: "2026-06-21", fecha_fin: "2026-06-21", es_favorito: true },
  { id: "2", nombre: "Pawkar Raymi", descripcion: "Florecimiento", fecha_inicio: "2026-03-21", fecha_fin: "2026-03-21", es_favorito: true },
  { id: "3", nombre: "Armonización Yagé", descripcion: "Encuentro de mayores", fecha_inicio: "2026-02-15", fecha_fin: "2026-02-16", es_favorito: false },
];

function getFirestoreHelpers(): any {
  try {
    // eval evita resolución estática de webpack si firebase no está instalado
    const r: any = eval("require");
    return r("firebase/firestore");
  } catch {
    return null;
  }
}

export async function getEventos(opts?: { soloFavoritos?: boolean }): Promise<Evento[]> {
  if (!isFirebaseConfigured || !db) {
    return opts?.soloFavoritos ? mockEventos.filter(e => e.es_favorito) : mockEventos;
  }
  try {
    const mod = getFirestoreHelpers();
    if (!mod) throw new Error("firebase/firestore no disponible");
    const { collection, getDocs, query, where } = mod;
    const ref = collection(db, "eventos");
    const q = opts?.soloFavoritos ? query(ref, where("es_favorito", "==", true)) : ref;
    const snap = await getDocs(q);
    return snap.docs.map((d: any) => ({ id: d.id, ...(d.data() as Omit<Evento, "id">) }));
  } catch (e) {
    console.warn("[providers] Firestore getEventos fallback mock:", e);
    return opts?.soloFavoritos ? mockEventos.filter(e => e.es_favorito) : mockEventos;
  }
}

export async function getFamilias(): Promise<Familia[]> {
  if (!isFirebaseConfigured || !db) return [{ id: "1", n_familia: "Familia Demo" }];
  try {
    const mod = getFirestoreHelpers();
    if (!mod) throw new Error("firebase/firestore no disponible");
    const { collection, getDocs } = mod;
    const snap = await getDocs(collection(db, "familias"));
    return snap.docs.map((d: any) => ({ id: d.id, ...(d.data() as Omit<Familia, "id">) }));
  } catch { return []; }
}

export const dataMode = process.env.NEXT_PUBLIC_DATA_MODE || "firebase";
