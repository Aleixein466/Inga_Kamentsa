# Migración a Firebase — inga-kamentsa

## Estado
- **BD canónica:** Firestore `inga-kamentsa` (`web/src/lib/firebase.ts`)
- **Frontend:** Next.js 15 `web/` (174 kB)
- **Django:** Legacy con `DATABASES = {}` `CabildoGranPutumayo/settings.py:91` — sin driver relacional. Descomenta bloque SQLite `settings.py:95` si necesitas admin legacy.

## Limpiado Python
- `requirements.txt` minimalista: solo `Django`, `Pillow`, `django-select2`. Eliminados: `mysqlclient`, `psycopg2`, `redis`, `whitenoise`. `firebase-admin` opcional comentado.
- `db.sqlite3` ignorado (`.gitignore:2`). Ya no se usa.

## Firebase (web)
- `web/.env.example` → copiar a `.env.local` con valores de Console > Project Settings > SDK
- `web/src/lib/firebase.ts` singleton + `db/auth/storage`
- `web/src/lib/providers.ts` `getEventos({soloFavoritos})` / `getFamilias()` con fallback mock
- `web/package.json` añadido `firebase@^11`

## Colecciones Firestore sugeridas (crear en Console > Firestore)
- `eventos/{id}`: { nombre, descripcion, fecha_inicio, fecha_fin, es_favorito, imagen (Storage url), createdAt }
- `familias/{id}`: { n_familia, createdAt }
- `usuarios_familias/{id}`: { usuarioId, familiaId, parentescoId }
- `usuarios/{uid}`: { nombres, apellidos, n_documento, zonaId, localidadId }
- `catalogos/{tipo}/{id}`: Zona, Localidad, TipoIdentificacion, etc (migrar desde `main/models.py`)

Reglas iniciales (Firestore > Rules):
```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /eventos/{id} { allow read: if true; allow write: if request.auth != null; }
    match /familias/{id} { allow read: if true; allow write: if request.auth != null; }
  }
}
```

## Siguiente paso
1. `cd web && npm install` (instala firebase)
2. Copiar `.env.example` → `.env.local` con tu config
3. Crear colecciones arriba y probar `npm run build` y `npm run dev` en :3000
4. (Opcional) Script seed: `node web/scripts/seed.mjs` con `firebase-admin` para migrar SQLite → Firestore
