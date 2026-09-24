# Server — Inga Kamentsa API (Express + Prisma + MySQL)

Backend migrado desde Django legacy `main/models.py` a **MySQL** con Prisma.

## Stack
- Node.js + TypeScript
- Express 4 + CORS
- Prisma 5 (`provider = "mysql"`)
- Zod validators (espejo de `main/models.py`)
- `firebase-admin` opcional (validación de tokens si se usa Auth)

## Requisitos
- Node 20+
- MySQL 8+ (local o remoto) — BD `inga_kamentsa`

## Inicio rápido

```bash
cd web/server
npm install
cp .env.example .env        # edita DATABASE_URL y PORT
npx prisma migrate dev      # crea tablas MySQL desde prisma/schema.prisma
npm run dev                 # http://localhost:4000
```

Verifica:

```bash
curl http://localhost:4000/health
curl http://localhost:4000/api/eventos
curl http://localhost:4000/api/familias
curl http://localhost:4000/api/catalogos/zonas
```

## Scripts

| Script | Descripción |
|--------|-------------|
| `npm run dev` | `tsx watch src/index.ts` con reload |
| `npm run build` | `tsc` → `dist/` |
| `npm start` | `node dist/index.js` |
| `npm run seed` | `tsx scripts/seed.ts` — importa `db.sqlite3` si existe, o mocks |
| `npx prisma migrate dev` | Crea/actualiza migración MySQL |
| `npx prisma generate` | Regenera `@prisma/client` |
| `npx prisma studio` | UI para inspeccionar datos |

## Variables de entorno (`web/server/.env`)

```
DATABASE_URL="mysql://root:password@localhost:3306/inga_kamentsa"
PORT=4000
CORS_ORIGIN=http://localhost:3000
```

## Estructura

```
web/server/
├── prisma/schema.prisma   # espejo main/models.py + auth_user, @@map("main_*")
├── src/
│   ├── index.ts           # Express + /health + /api/*
│   ├── lib/prisma.ts      # singleton PrismaClient
│   ├── lib/shared/validators.ts  # zod schemas Usuario/Familia/Evento
│   └── features/
│       ├── eventos/       # eventos.router.ts + eventos.service.ts
│       ├── familias/      # familias.router.ts + familias.service.ts
│       └── catalogos/     # catalogos.router.ts (8 Tipo* + Zona/Localidad)
└── scripts/seed.ts        # SQLite legacy → MySQL o mocks
```

## Prisma — modelos

Espejo de `main/models.py:73`:

- **Catálogos**: `Zona`, `Localidad`, `TipoIdentificacion`, `TipoParentesco`, `TipoGenero`, `TipoEstadoCivil`, `TipoEscolaridad`, `TipoProfesion` (DEPRECATED en Firestore, preservados para MySQL)
- **Auth**: `User` (`auth_user`)
- **Dominio**: `Usuario` (OneToOne User), `Familia`, `UsuarioFamilia`, `Evento`, `UsuarioEvento` (`@@unique([usuarioId, eventoId, fechaAsistencia])`)

Tablas con `@@map("main_*")` / `@@map("auth_user")` para compatibilidad con nombres Django.

## Seed

```bash
# Con db.sqlite3 legacy en la raíz (opcional):
npm install -D better-sqlite3 @types/better-sqlite3
npm run seed

# Sin db.sqlite3: inserta mocks automáticamente
npm run seed
```

## Frontend

El frontend Next.js (`web/`) consume este API vía `NEXT_PUBLIC_API_URL=http://localhost:4000` (ver `web/.env.example`). `web/src/lib/providers.ts` mantiene compatibilidad Firebase/mock y puede migrar a `fetch(${NEXT_PUBLIC_API_URL}/api/...)` progresivamente.

## CORS

Por defecto permite `http://localhost:3000`. Ajusta `CORS_ORIGIN` para producción.
