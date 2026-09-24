import { prisma } from "../../lib/prisma";

export async function listFamilias(opts: { q?: string; page?: number; pageSize?: number } = {}) {
  const { q, page = 1, pageSize = 20 } = opts;
  const where = q ? { nFamilia: { contains: q } } : {};
  const [data, total] = await Promise.all([
    prisma.familia.findMany({
      where,
      orderBy: { nFamilia: "asc" },
      skip: (page - 1) * pageSize,
      take: pageSize,
      include: { miembros: { include: { usuario: true, parentesco: true } } },
    }),
    prisma.familia.count({ where }),
  ]);
  return { data, total, page, pageSize };
}

export async function getFamiliaById(id: number) {
  return prisma.familia.findUnique({
    where: { id },
    include: { miembros: { include: { usuario: true, parentesco: true } } },
  });
}

export async function createFamilia(nFamilia: string) {
  return prisma.familia.create({ data: { nFamilia } });
}

export async function updateFamilia(id: number, nFamilia: string) {
  return prisma.familia.update({ where: { id }, data: { nFamilia } });
}

export async function deleteFamilia(id: number) {
  return prisma.familia.delete({ where: { id } });
}
