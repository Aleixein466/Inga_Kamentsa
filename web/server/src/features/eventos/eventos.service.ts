import { prisma } from "../../lib/prisma";

export type EventoFilters = {
  q?: string;
  soloFavoritos?: boolean;
  page?: number;
  pageSize?: number;
};

export async function listEventos(filters: EventoFilters = {}) {
  const { q, soloFavoritos, page = 1, pageSize = 20 } = filters;
  const where: Record<string, unknown> = {};
  if (soloFavoritos) (where as Record<string, boolean>)["esFavorito"] = true;
  if (q) (where as Record<string, unknown>)["nombre"] = { contains: q };

  const [data, total] = await Promise.all([
    prisma.evento.findMany({
      where,
      orderBy: { fechaInicio: "desc" },
      skip: (page - 1) * pageSize,
      take: pageSize,
    }),
    prisma.evento.count({ where }),
  ]);
  return { data, total, page, pageSize };
}

export async function getEventoById(id: number) {
  return prisma.evento.findUnique({ where: { id } });
}

export async function createEvento(input: {
  nombre: string;
  descripcion?: string | null;
  imagen?: string | null;
  fechaInicio: Date;
  fechaFin: Date;
  esFavorito?: boolean;
}) {
  return prisma.evento.create({ data: input });
}

export async function updateEvento(id: number, data: Partial<{
  nombre: string;
  descripcion: string | null;
  imagen: string | null;
  fechaInicio: Date;
  fechaFin: Date;
  esFavorito: boolean;
}>) {
  return prisma.evento.update({ where: { id }, data });
}

export async function deleteEvento(id: number) {
  return prisma.evento.delete({ where: { id } });
}
