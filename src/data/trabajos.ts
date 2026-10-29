import type { ImageMetadata } from 'astro';
import tablero from '../assets/placeholder/tablero.jpg';
import camara from '../assets/placeholder/camara.jpg';
import distribucion from '../assets/placeholder/distribucion.jpg';

// PENDIENTE: reemplazar por fotos reales del dueño. Mientras `real` sea false,
// /trabajos/ sale con noindex y fuera del sitemap (ver astro.config.mjs).
export const real = false;

export interface Trabajo {
  image: ImageMetadata;
  alt: string;
  title: string;
  place: string;
  service: string;
}

export const trabajos: Trabajo[] = [
  // Placeholders ilustrativos: sin lugar ni título de obra, porque no son trabajos de BF.
  { image: tablero, alt: 'Panel de control eléctrico con pulsadores', title: 'Foto ilustrativa', place: '', service: 'electricidad-industrial' },
  { image: camara, alt: 'Cámara de seguridad con carcasa sobre una fachada', title: 'Foto ilustrativa', place: '', service: 'camaras-de-seguridad' },
  { image: distribucion, alt: 'Tablero general de distribución eléctrica', title: 'Foto ilustrativa', place: '', service: 'electricidad-industrial' },
];
