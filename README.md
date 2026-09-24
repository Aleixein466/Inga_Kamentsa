# Resguardo Inga Kamëntsá de Mocoa

Plataforma canónica **Next.js 15 + Firestore (`inga-kamentsa`)** en `web/` y plantilla **Django legacy** en `main/` (CRUD admin, PDFs). Migración documentada en `web/FIREBASE_MIGRATION.md`.

## Estructura

```
Pagina_Web_Inga_Kamentsa/
├── web/                  # CANÓNICO — Next.js 15 (Tailwind v4, Framer Motion, Firebase)
│   ├── src/lib/firebase.ts
│   ├── src/lib/providers.ts
│   ├── src/lib/design-system.ts   # canónico (no tocar)
│   ├── src/app/globals.css        # canónico (no tocar)
│   └── public/img/eventos/        # imágenes migradas desde media/eventos/
├── main/                 # Django legacy plantilla (DATABASES={} por defecto)
│   ├── models.py         # 8 Tipo* DEPRECATED → Firestore catalogos/{tipo}
│   ├── views.py          # helper _agrupar_asistencias factorizado
│   ├── templates/bases/base.html          # canónico moderno
│   ├── templates/bases/landing/base.html  # wrapper extends base.html + extra_css landing.css
│   ├── static/img/inti_rayni/  (antes "inti rayni" con espacio) + pawakur_rayni
│   └── admin.py          # Evento/Familia registrados
├── media/eventos/.gitkeep  # originales copiados a web/public/img/eventos/
├── CabildoGranPutumayo/settings.py  # Django legacy, DB vacía; descomenta SQLite si necesitas admin
└── requirements.txt      # Django + Pillow + django-select2 (+ firebase-admin opcional)
```

## Tecnologías

- **Web canónico:** Next.js 15, React 19, Tailwind v4, Framer Motion, Firebase 11 (Firestore/Auth/Storage)
- **Legacy:** Python 3.11, Django 4/5, Pillow, WeasyPrint (opcional, fallback HTML si falta GTK/Pango)

## Instalación

### Web (recomendado)
```bash
cd web
npm install
cp .env.example .env.local   # completar config Firebase Console > Project Settings > SDK
npm run dev                  # http://localhost:3000
npm run build
```
Crear colecciones Firestore según `web/FIREBASE_MIGRATION.md`: `eventos`, `familias`, `catalogos/{tipo}`.

### Django legacy (solo plantilla/admin)
```bash
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
# Habilitar DB legacy si lo necesitas: descomenta bloque SQLite en CabildoGranPutumayo/settings.py:95
python manage.py migrate
python manage.py runserver
```
`env/` está en `.gitignore` (eliminado del repo). `__pycache__/` ignorado.

## Migración y auditoría P1/P2

- `inti rayni` → `inti_rayni`, `pawakur` → `pawakur_rayni` (sin espacios)
- `media/eventos/` (14 archivos) copiados a `web/public/img/eventos/`, se deja `.gitkeep`
- `bases/base.html` canónico moderno con `{% block extra_css %}` / `extra_js` / `modals` / `footer`; `bases/landing/base.html` es wrapper que extiende base (elimina duplicación Bootstrap/jQuery/DataTables)
- `bases/card.html` canónico, `login/bases/cardLogin.html` documentado como duplicado legacy con video background
- `main/models.py`: 8 Tipo* marcados `# DEPRECATED: migrado a Firestore catalogos` + docstring cabecera
- `main/views.py`: helper `_agrupar_asistencias(evento)` factoriza `listar_usuarios_por_evento` y `generar_pdf_asistencias_evento`; prints debug eliminados; `signout` sin `@login_required`
- `main/admin.py` registra `Evento`, `Familia`, `Usuario`, `UsuarioEvento`, `UsuarioFamilia`
- `main/templates/bases/landing/otros/historia.html` reescrita: 448 líneas Pastos/Waka → versión Inga-Kamëntsá concisa (Valle Sibundoy, Yagé, chumbe, lengua Inga, Bëtsknaté)
- `web/src/lib/design-system.ts` y `web/src/app/globals.css` son canónicos — no modificar
```

