import type { ImageMetadata } from 'astro';
import tableroManual from '../assets/trabajos/tablero-manual-automatico.webp';
import tableroExterior from '../assets/trabajos/tablero-exterior.webp';
import tableroPared from '../assets/trabajos/tablero-pared.webp';
import motor from '../assets/trabajos/motor-conexionado.webp';
import camara from '../assets/trabajos/camara-domo.webp';
import tanque from '../assets/trabajos/tanque-canalizacion.webp';

// Fotos reales de trabajos de BF. Con `real` en false, /trabajos/ saldría con noindex
// y fuera del sitemap (ver astro.config.mjs). Sin lugar: no se conoce dónde se hizo cada uno.
export const real = true;

export interface Trabajo {
  image: ImageMetadata;
  alt: string;
  title: string;
  place: string;
  service: string;
  position?: string;
}

export const trabajos: Trabajo[] = [
  { image: tableroManual, alt: 'Tablero de control con selector manual/automático y luces piloto roja y verde, montado en una pared de ladrillo', title: 'Tablero con selector manual/automático', place: '', service: 'electricidad-industrial' },
  { image: motor, alt: 'Motor eléctrico trifásico azul con la caja de conexiones abierta y el cable de alimentación conectado', title: 'Conexionado de motor trifásico', place: '', service: 'electricidad-industrial' },
  { image: camara, alt: 'Cámara de seguridad tipo domo instalada sobre un muro, con el cable bajando por la pared', title: 'Cámara domo en muro exterior', place: '', service: 'camaras-de-seguridad', position: '50% 55%' },
  { image: tableroExterior, alt: 'Tablero de control con tres luces piloto rojas, fijado a un pilar de ladrillo con la canalización hacia abajo', title: 'Tablero de control en pilar', place: '', service: 'electricidad-industrial', position: '50% 62%' },
  { image: tableroPared, alt: 'Tablero de control en una pared de ladrillo, con dos canalizaciones que bajan desde el techo', title: 'Tablero con canalización exterior', place: '', service: 'electricidad-industrial' },
  { image: tanque, alt: 'Tanque de agua en el altillo con la canalización eléctrica y las cajas de paso fijadas a la estructura', title: 'Canalización eléctrica en tanque de agua', place: '', service: 'portones-automaticos' },
];
