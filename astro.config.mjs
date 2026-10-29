// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://bfserviciosintegrales.com',
  trailingSlash: 'always',
  // /trabajos/ queda fuera hasta que haya fotos reales (src/data/trabajos.ts → real).
  integrations: [sitemap({ filter: (page) => !page.includes('/404') && !page.endsWith('/trabajos/') })],
});
