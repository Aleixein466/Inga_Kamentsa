import { z } from "zod";

// ── Helpers ──
const varchar = (max: number, field: string) =>
  z.string().min(1, `${field} requerido`).max(max, `${field} máx ${max} chars`);

const nullableVarchar = (max: number) =>
  z.string().max(max).nullable().optional().or(z.literal(""));

// Fecha YYYY-MM-DD (DateField Django)
const dateField = z.coerce.date({
  required_error: "Fecha requerida",
  invalid_type_error: "Fecha inválida (YYYY-MM-DD)",
});

// ── Catálogos (Tipo*) — todos comparten nombre/codigo únicos ──

export const catalogoSchema = z.object({
  nombre: varchar(45, "nombre"),
  codigo: varchar(5, "codigo"),
});

export const zonaSchema = catalogoSchema;
export const tipoIdentificacionSchema = catalogoSchema;
export const tipoParentescoSchema = catalogoSchema;
export const tipoGeneroSchema = catalogoSchema;
export const tipoEstadoCivilSchema = catalogoSchema;
export const tipoEscolaridadSchema = catalogoSchema;
export const tipoProfesionSchema = catalogoSchema;

export const localidadSchema = z.object({
  zonaId: z.number().int().positive("zonaId requerido"),
  nombre: varchar(45, "nombre"),
});

// ── Familia ──
// main/models.py: Familia.n_familia CharField(45) unique
export const familiaSchema = z.object({
  n_familia: varchar(45, "n_familia"),
  // alias camelCase para API JSON
  nFamilia: varchar(45, "nFamilia").optional(),
});

export const createFamiliaSchema = z.object({
  n_familia: varchar(45, "n_familia").optional(),
  nFamilia: varchar(45, "nFamilia").optional(),
}).refine((d) => d.n_familia || d.nFamilia, { message: "n_familia requerido", path: ["n_familia"] });

// ── Evento ──
// main/models.py: Evento{nombre, descripcion, imagen, fecha_inicio, fecha_fin, es_favorito}
export const eventoSchema = z.object({
  nombre: varchar(45, "nombre"),
  descripcion: z.string().nullable().optional(),
  imagen: z.string().max(255).nullable().optional(),
  fecha_inicio: dateField.optional(),
  fechaInicio: dateField.optional(),
  fecha_fin: dateField.optional(),
  fechaFin: dateField.optional(),
  es_favorito: z.boolean().optional().default(false),
  esFavorito: z.boolean().optional(),
}).refine((d) => d.fecha_inicio || d.fechaInicio, { message: "fecha_inicio requerida", path: ["fecha_inicio"] })
  .refine((d) => d.fecha_fin || d.fechaFin, { message: "fecha_fin requerida", path: ["fecha_fin"] });

export const createEventoSchema = eventoSchema;
export const updateEventoSchema = eventoSchema.partial();

// ── Usuario ──
// main/models.py: Usuario con 15 campos, FKs a catálogos + OneToOne a auth_user
export const usuarioSchema = z.object({
  userId: z.number().int().positive().optional(),
  username: varchar(150, "username").optional(),
  nombres: varchar(45, "nombres"),
  apellidos: varchar(45, "apellidos"),
  n_documento: varchar(10, "n_documento").optional(),
  nDocumento: varchar(10, "nDocumento").optional(),
  fecha_nacimiento: dateField.optional(),
  fechaNacimiento: dateField.optional(),
  zonaId: z.number().int().positive("zonaId requerido"),
  localidadId: z.number().int().positive("localidadId requerido"),
  direccion: nullableVarchar(45),
  telefono: z.string().max(10).nullable().optional().or(z.literal("")),
  identificacionId: z.number().int().positive("identificacionId requerido"),
  generoId: z.number().int().positive("generoId requerido"),
  estadoCivilId: z.number().int().positive().nullable().optional(),
  escolaridadId: z.number().int().positive().nullable().optional(),
  profesionId: z.number().int().positive().nullable().optional(),
})
  .refine((d) => d.n_documento || d.nDocumento, { message: "n_documento requerido", path: ["n_documento"] })
  .refine((d) => d.fecha_nacimiento || d.fechaNacimiento, { message: "fecha_nacimiento requerida", path: ["fecha_nacimiento"] });

export const createUsuarioSchema = usuarioSchema;
export const updateUsuarioSchema = usuarioSchema.partial();

// ── UsuarioFamilia ──
export const usuarioFamiliaSchema = z.object({
  usuarioId: z.number().int().positive(),
  familiaId: z.number().int().positive(),
  parentescoId: z.number().int().positive(),
});

// ── UsuarioEvento ──
// unique_together = ('usuario','evento','fecha_asistencia')
export const usuarioEventoSchema = z.object({
  usuarioId: z.number().int().positive(),
  eventoId: z.number().int().positive(),
  fecha_asistencia: dateField.optional(),
  fechaAsistencia: dateField.optional(),
  asistencia: z.boolean().optional().default(false),
}).refine((d) => d.fecha_asistencia || d.fechaAsistencia, { message: "fecha_asistencia requerida", path: ["fecha_asistencia"] });

// ── Query params comunes ──
export const paginationSchema = z.object({
  page: z.coerce.number().int().min(1).optional().default(1),
  pageSize: z.coerce.number().int().min(1).max(100).optional().default(20),
  q: z.string().optional(),
  soloFavoritos: z.coerce.boolean().optional(),
});

export type CreateEventoInput = z.infer<typeof createEventoSchema>;
export type CreateFamiliaInput = z.infer<typeof createFamiliaSchema>;
export type CreateUsuarioInput = z.infer<typeof createUsuarioSchema>;
