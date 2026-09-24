/**
 * Seed MySQL via Prisma — importa desde db.sqlite3 legacy si existe, o usa mocks.
 * Uso: npx tsx scripts/seed.ts  (o npm run seed)
 * Requiere DATABASE_URL en web/server/.env
 */
import "dotenv/config";
import fs from "fs";
import path from "path";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Ruta legacy SQLite (raíz del proyecto)
const SQLITE_PATH = path.resolve(__dirname, "../../..", "db.sqlite3");

// ── Mocks (usados si db.sqlite3 no existe o better-sqlite3 no disponible) ──
const mockCatalogos = {
  zonas: [
    { nombre: "Sibundoy", codigo: "SIB" },
    { nombre: "Santiago", codigo: "SAN" },
    { nombre: "Colón", codigo: "COL" },
    { nombre: "San Francisco", codigo: "SFR" },
  ],
  localidades: [{ nombre: "Centro" }, { nombre: "Vereda Las Palmas" }],
  tiposIdentificacion: [
    { nombre: "Cédula de Ciudadanía", codigo: "CC" },
    { nombre: "Tarjeta de Identidad", codigo: "TI" },
    { nombre: "Cédula de Extranjería", codigo: "CE" },
  ],
  tiposParentesco: [
    { nombre: "Padre", codigo: "PAD" },
    { nombre: "Madre", codigo: "MAD" },
    { nombre: "Hijo", codigo: "HIJ" },
    { nombre: "Hija", codigo: "HIJA" },
  ],
  tiposGenero: [
    { nombre: "Masculino", codigo: "M" },
    { nombre: "Femenino", codigo: "F" },
    { nombre: "Otro", codigo: "O" },
  ],
  tiposEstadoCivil: [
    { nombre: "Soltero", codigo: "SOL" },
    { nombre: "Casado", codigo: "CAS" },
  ],
  tiposEscolaridad: [
    { nombre: "Primaria", codigo: "PRI" },
    { nombre: "Secundaria", codigo: "SEC" },
    { nombre: "Universitaria", codigo: "UNI" },
  ],
  tiposProfesion: [
    { nombre: "Agricultor", codigo: "AGR" },
    { nombre: "Artesano", codigo: "ART" },
    { nombre: "Docente", codigo: "DOC" },
  ],
};

const mockFamilias = [{ nFamilia: "Familia Jacanamejoy" }, { nFamilia: "Familia Muchavisoy" }];

const mockEventos = [
  { nombre: "Inti Raymi — Fiesta del Sol", descripcion: "Ceremonia mayor Inga", fechaInicio: new Date("2026-06-21"), fechaFin: new Date("2026-06-21"), esFavorito: true },
  { nombre: "Pawkar Raymi", descripcion: "Florecimiento", fechaInicio: new Date("2026-03-21"), fechaFin: new Date("2026-03-21"), esFavorito: true },
  { nombre: "Armonización Yagé", descripcion: "Encuentro de mayores", fechaInicio: new Date("2026-02-15"), fechaFin: new Date("2026-02-16"), esFavorito: false },
];

async function seedMocks() {
  console.log("[seed] Usando datos mock (db.sqlite3 no encontrado o sin better-sqlite3)");

  for (const z of mockCatalogos.zonas) {
    await prisma.zona.upsert({ where: { nombre: z.nombre }, update: {}, create: z });
  }
  const zona = await prisma.zona.findFirstOrThrow();

  for (const loc of mockCatalogos.localidades) {
    await prisma.localidad.upsert({
      where: { nombre: loc.nombre },
      update: {},
      create: { nombre: loc.nombre, zonaId: zona.id },
    });
  }

  for (const t of mockCatalogos.tiposIdentificacion) {
    await prisma.tipoIdentificacion.upsert({ where: { nombre: t.nombre }, update: {}, create: t });
  }
  for (const t of mockCatalogos.tiposParentesco) {
    await prisma.tipoParentesco.upsert({ where: { nombre: t.nombre }, update: {}, create: t });
  }
  for (const t of mockCatalogos.tiposGenero) {
    await prisma.tipoGenero.upsert({ where: { nombre: t.nombre }, update: {}, create: t });
  }
  for (const t of mockCatalogos.tiposEstadoCivil) {
    await prisma.tipoEstadoCivil.upsert({ where: { nombre: t.nombre }, update: {}, create: t });
  }
  for (const t of mockCatalogos.tiposEscolaridad) {
    await prisma.tipoEscolaridad.upsert({ where: { nombre: t.nombre }, update: {}, create: t });
  }
  for (const t of mockCatalogos.tiposProfesion) {
    await prisma.tipoProfesion.upsert({ where: { nombre: t.nombre }, update: {}, create: t });
  }

  for (const f of mockFamilias) {
    await prisma.familia.upsert({ where: { nFamilia: f.nFamilia }, update: {}, create: f });
  }

  for (const e of mockEventos) {
    const exists = await prisma.evento.findFirst({ where: { nombre: e.nombre } });
    if (!exists) await prisma.evento.create({ data: e });
  }

  // Usuario demo (requiere User + catálogos)
  const localidad = await prisma.localidad.findFirstOrThrow();
  const identificacion = await prisma.tipoIdentificacion.findFirstOrThrow();
  const genero = await prisma.tipoGenero.findFirstOrThrow();

  const user = await prisma.user.upsert({
    where: { username: "demo_inga" },
    update: {},
    create: {
      username: "demo_inga",
      password: "pbkdf2_sha256$demo$hash", // placeholder — migrar hashes reales desde auth_user si se importa SQLite
      email: "demo@inga.local",
      firstName: "Demo",
      lastName: "Inga",
    },
  });

  await prisma.usuario.upsert({
    where: { nDocumento: "0000000001" },
    update: {},
    create: {
      userId: user.id,
      nombres: "Demo",
      apellidos: "Inga",
      nDocumento: "0000000001",
      fechaNacimiento: new Date("1990-01-01"),
      zonaId: zona.id,
      localidadId: localidad.id,
      identificacionId: identificacion.id,
      generoId: genero.id,
      direccion: "Sibundoy, Putumayo",
      telefono: "3000000000",
    },
  });

  console.log("[seed] Mocks insertados OK");
}

async function seedFromSqlite() {
  // Intento con better-sqlite3 si está instalado. Si no, fallback a mocks.
  let Database: unknown;
  try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    Database = require("better-sqlite3");
  } catch {
    console.warn("[seed] better-sqlite3 no instalado — fallback a mocks. Instala con: npm install -D better-sqlite3 @types/better-sqlite3");
    await seedMocks();
    return;
  }

  console.log(`[seed] Leyendo SQLite legacy: ${SQLITE_PATH}`);
  // @ts-expect-error dynamic require
  const db = new (Database as new (p: string, opts?: unknown) => { prepare: (sql: string) => { all: () => unknown[] } })(SQLITE_PATH, { readonly: true });

  // Helper: copia tabla SQLite -> Prisma upsert genérico
  // Por simplicidad, se migran las tablas principales; ajustar SQL según esquema legacy real.
  const tables: Array<{ sqlite: string; prisma: () => Promise<void> }> = [];

  // Si la BD no tiene alguna tabla, se omite sin romper el seed.
  try {
    const zonas = (db.prepare("SELECT id, nombre, codigo FROM main_zona").all() as Array<{ nombre: string; codigo: string }>);
    for (const r of zonas) await prisma.zona.upsert({ where: { nombre: r.nombre }, update: {}, create: { nombre: r.nombre, codigo: r.codigo } });
    console.log(`[seed] Zonas migradas: ${zonas.length}`);
  } catch (e) {
    console.warn("[seed] main_zona no migrada:", (e as Error).message);
  }

  try {
    const eventos = (db.prepare("SELECT nombre, descripcion, imagen, fecha_inicio, fecha_fin, es_favorito FROM main_evento").all() as Array<{ nombre: string; descripcion: string | null; imagen: string | null; fecha_inicio: string; fecha_fin: string; es_favorito: number }>);
    for (const r of eventos) {
      const exists = await prisma.evento.findFirst({ where: { nombre: r.nombre } });
      if (!exists) {
        await prisma.evento.create({
          data: {
            nombre: r.nombre,
            descripcion: r.descripcion,
            imagen: r.imagen,
            fechaInicio: new Date(r.fecha_inicio),
            fechaFin: new Date(r.fecha_fin),
            esFavorito: !!r.es_favorito,
          },
        });
      }
    }
    console.log(`[seed] Eventos migrados: ${eventos.length}`);
  } catch (e) {
    console.warn("[seed] main_evento no migrado:", (e as Error).message);
  }

  // Familias
  try {
    const familias = (db.prepare("SELECT n_familia FROM main_familia").all() as Array<{ n_familia: string }>);
    for (const r of familias) await prisma.familia.upsert({ where: { nFamilia: r.n_familia }, update: {}, create: { nFamilia: r.n_familia } });
    console.log(`[seed] Familias migradas: ${familias.length}`);
  } catch (e) {
    console.warn("[seed] main_familia no migrada:", (e as Error).message);
  }

  if (tables.length === 0) console.log("[seed] Migración SQLite parcial completada — revisa logs para tablas faltantes");
}

async function main() {
  const hasSqlite = fs.existsSync(SQLITE_PATH);
  if (hasSqlite) {
    console.log(`[seed] Detectado ${SQLITE_PATH} — intentando migración SQLite -> MySQL`);
    await seedFromSqlite();
  } else {
    await seedMocks();
  }
}

main()
  .catch((e) => {
    console.error("[seed] error", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
