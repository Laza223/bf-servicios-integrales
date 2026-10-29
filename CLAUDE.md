# BF Servicios Integrales — sitio web

Sitio estático (Astro 7) de un electricista industrial y de seguridad electrónica de Luján, Provincia de Buenos Aires. Objetivo: consultas por WhatsApp y llamadas desde Google. Contexto de negocio en `PRODUCT.md`; dirección visual en `.impeccable/surfaces/` (y `DESIGN.md` cuando exista).

## Estructura

- `src/data/business.ts`: fuente única de los datos de contacto, la zona, los pagos y las marcas. CTA, footer y JSON-LD salen de acá.
- `src/content/servicios/*.md`: una página por servicio (frontmatter validado en `src/content.config.ts`), renderizada por `src/pages/[slug].astro`.
- `src/data/trabajos.ts`: galería de `/trabajos/`. Mientras `real = false`, la página sale con noindex y fuera del sitemap (`astro.config.mjs`).
- Fotos actuales: placeholders de Wikimedia Commons en `src/assets/placeholder/`; se reemplazan por fotos reales del dueño.

## Juez (correr después del último edit)

```bash
pnpm astro check   # 0 errores (requiere TypeScript 6: astro check no soporta TS 7)
pnpm build         # verde, 10 HTML + sitemap
```

- Lighthouse mobile sobre `pnpm astro preview` (home y `/electricidad-industrial/`): Perf ≥95, A11y ≥95, BP ≥95, SEO 100.
- Grep en `dist/` sin hits: `matriculad|PLC|solar|sin interés|Mendoza`.
- JSON-LD de cada página parsea, con `Electrician` (`name`, `areaServed`, `telephone`).
- `impeccable detect --json src` → `[]`.

## Gotchas

- **Luján BA, no Mendoza**: Google confunde Luján con Luján de Cuyo. Siempre "Luján, Provincia de Buenos Aires" (o "Bs. As.") en títulos, schema y texto.
- **WhatsApp argentino**: `549` + código de área sin 0 + número sin 15 (Luján: `5492323XXXXXX`).
- **Claims prohibidos**: nunca "matriculado" (tiene título de CFP, no matrícula), nunca "PLC", nunca "solar", nunca "sin interés", nunca precios. Ajax no aparece hasta que instale una.
- **Sin páginas por localidad** (doorway): las zonas van en la sección de cobertura.
- **Texto sobre naranja va en navy** (`--brand-900`): blanco sobre `#F97316` no pasa AA.
- **CSS con scope de Astro no llega al `<svg>` de `Icon.astro`/`Logo.astro`**: para colorear íconos desde el padre, usar `:global(.icon)`.
- **Nada de fotos de stock como trabajos propios**: `/trabajos/`, la banda del home y los links del menú solo aparecen con `real = true`. `email` e `instagram` vacíos no se renderizan.
- YAML del frontmatter: los valores con `: ` o que terminan en `:` van entre comillas.
- `title` ≤65 y `description` ≤160 caracteres (los valida el schema).
- Solo pnpm (`pnpm add -E`, `pnpm exec`, `pnpm dlx`).
