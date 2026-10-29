// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { real } from './src/data/trabajos.ts';

export default defineConfig({
  site: 'https://bfserviciosintegrales.com',
  trailingSlash: 'always',
  // /trabajos/ entra al sitemap solo con fotos reales (src/data/trabajos.ts → real).
  integrations: [sitemap({ filter: (page) => !page.includes('/404') && (real || !page.endsWith('/trabajos/')) })],
});
