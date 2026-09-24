import { prisma } from "../../lib/prisma";

// Genérico para los 8 catálogos Tipo* + Zona/Localidad
// Cada uno expone list + getById + create

export const catalogoModels = {
  zonas: () => prisma.zona,
  localidades: () => prisma.localidad,
  tiposIdentificacion: () => prisma.tipoIdentificacion,
  tiposParentesco: () => prisma.tipoParentesco,
  tiposGenero: () => prisma.tipoGenero,
  tiposEstadoCivil: () => prisma.tipoEstadoCivil,
  tiposEscolaridad: () => prisma.tipoEscolaridad,
  tiposProfesion: () => prisma.tipoProfesion,
} as const;

export type CatalogoKey = keyof typeof catalogoModels;

export async function listCatalogo(key: CatalogoKey, q?: string) {
  const model = catalogoModels[key]() as unknown as {
    findMany: (args: unknown) => Promise<unknown[]>;
  };
  const where = q ? { nombre: { contains: q } } : {};
  return model.findMany({ where, orderBy: { nombre: "asc" } });
}

export async function getCatalogoById(key: CatalogoKey, id: number) {
  const model = catalogoModels[key]() as unknown as {
    findUnique: (args: unknown) => Promise<unknown>;
  };
  return model.findUnique({ where: { id } });
}
