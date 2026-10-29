// Única fuente de datos del negocio: CTA, footer y JSON-LD salen de acá.
// TODO(dueño): reemplazar los valores marcados como PENDIENTE antes de publicar.

export const business = {
  name: 'BF Servicios Integrales',
  tagline: 'Electricidad industrial y seguridad electrónica',
  url: 'https://bfserviciosintegrales.com',
  // Formato wa.me argentino: 54 9 + característica sin 0 + número sin 15. PENDIENTE.
  whatsapp: '5492323363438',
  // Formato E.164 para tel: y schema. PENDIENTE.
  phone: '+5492323363438',
  phoneDisplay: '2323 36-3438',
  // Vacíos = no se muestran ni van al JSON-LD. PENDIENTE: email.
  email: '' as string,
  instagram: 'https://www.instagram.com/serviciosintegralesbf/' as string,
  locality: 'Luján',
  region: 'Provincia de Buenos Aires',
  regionShort: 'Bs. As.',
  country: 'AR',
  geo: { latitude: -34.5703, longitude: -59.105 },
  hours: 'Urgencias 24 h, todos los días',
  credentials: [
    'Título de Electricista Industrial (CFP)',
    'Más de 5 años de experiencia',
    'Factura C (monotributo)',
    'Seguro de accidentes personales con cláusula de no repetición',
  ],
  payments: ['Transferencia', 'Efectivo', 'Mercado Pago', 'Tarjeta en cuotas'],
  brands: ['Hikvision', 'Dahua', 'Garnet', 'X-28', 'Alonso'],
} as const;

// Partido de Luján primero, después la zona de influencia.
export const coverage = {
  partido: ['Luján', 'Open Door', 'Jáuregui', 'Torres', 'Olivera', 'Cortínez', 'Carlos Keen'],
  zona: ['Pilar', 'General Rodríguez', 'Mercedes', 'Exaltación de la Cruz', 'San Andrés de Giles', 'Moreno'],
} as const;

export function waLink(message: string): string {
  return `https://wa.me/${business.whatsapp}?text=${encodeURIComponent(message)}`;
}

export const telLink = `tel:${business.phone}`;
