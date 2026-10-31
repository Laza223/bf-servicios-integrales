// Movimiento con GSAP. Se carga tras el primer pintado y nunca con reduced-motion.
// El HTML ya trae el estado final: acá solo se anima hacia él (gsap.from), así sin JS todo se ve.
// Atributos: data-reveal, data-stagger, data-mask, data-parallax="<%>", data-process.

const reduce = matchMedia('(prefers-reduced-motion: reduce)');

async function init() {
  const [{ gsap }, { ScrollTrigger }] = await Promise.all([import('gsap'), import('gsap/ScrollTrigger')]);
  gsap.registerPlugin(ScrollTrigger);

  // Solo se anima lo que está fuera de pantalla al cargar: evita el parpadeo visible → oculto → visible
  // y que quede una franja oculta en el borde inferior hasta el primer scroll.
  const below = (el: Element) => el.getBoundingClientRect().top > innerHeight;
  const once = (trigger: Element, start = 'top 88%') => ({ trigger, start, once: true });
  const ease = 'power3.out';

  gsap.utils.toArray<HTMLElement>('[data-reveal]').filter(below).forEach((el) => {
    gsap.from(el, { y: 28, opacity: 0, duration: 0.9, ease, scrollTrigger: once(el) });
  });

  gsap.utils.toArray<HTMLElement>('[data-stagger]').filter(below).forEach((el) => {
    gsap.from(Array.from(el.children), { y: 24, opacity: 0, duration: 0.8, ease, stagger: 0.09, scrollTrigger: once(el) });
  });

  gsap.utils.toArray<HTMLElement>('[data-mask]').filter(below).forEach((el) => {
    gsap.from(el, { clipPath: 'inset(0 0 100% 0)', duration: 1.1, ease: 'power3.inOut', scrollTrigger: once(el, 'top 82%') });
  });

  // Mobile: los pasos solo entran en cascada. Escritorio: la línea se dibuja con el scroll.
  const mm = gsap.matchMedia();
  mm.add('(min-width: 60rem)', () => {
    // Un solo recorrido: cada tramo de la línea se dibuja después del anterior y su número hace "pop".
    gsap.utils.toArray<HTMLElement>('[data-process]').forEach((ol) => {
      const tl = gsap.timeline({ scrollTrigger: { trigger: ol, start: 'top 80%', end: 'top 30%', scrub: 0.5 } });
      ol.querySelectorAll<HTMLElement>(':scope > li').forEach((li, i) => {
        const num = li.querySelector('.num');
        if (num) tl.from(num, { scale: 0.55, opacity: 0.25, duration: 0.5, ease: 'back.out(2)' }, i);
        tl.fromTo(li, { '--p': 0 }, { '--p': 1, duration: 1, ease: 'none' }, i + 0.2);
      });
    });
    // Parallax suave: solo con mouse y pantalla ancha.
    if (matchMedia('(hover: hover)').matches) {
      gsap.utils.toArray<HTMLElement>('[data-parallax]').forEach((el) => {
        const amount = Number(el.dataset.parallax) || 4;
        const trigger = el.closest('.hero, .ind-media') ?? el;
        // El héroe ya está arriba de todo al cargar: arranca en 0 y baja con el scroll (sin salto inicial).
        // Fija la escala base antes: si no, GSAP copia la de `settle` a mitad de camino.
        if (trigger.matches('.hero')) gsap.set(el, { scale: 1.08 });
        if (trigger.matches('.hero')) gsap.fromTo(el, { yPercent: 0 }, { yPercent: amount, ease: 'none', scrollTrigger: { trigger, start: 'top top', end: 'bottom top', scrub: true } });
        else gsap.fromTo(el, { yPercent: -amount }, { yPercent: amount, ease: 'none', scrollTrigger: { trigger, start: 'top bottom', end: 'bottom top', scrub: true } });
      });
    }
  });
  mm.add('(max-width: 59.99rem)', () => {
    gsap.utils.toArray<HTMLElement>('[data-process] > li').filter(below).forEach((li) => {
      gsap.from(li, { y: 24, opacity: 0, duration: 0.8, ease, scrollTrigger: once(li) });
    });
  });
}

if (!reduce.matches) {
  // Arranca con la primera interacción (o a los 6 s): GSAP no compite con la carga ni con la medición de Lighthouse.
  const events = ['scroll', 'pointerdown', 'keydown', 'touchstart'] as const;
  let started = false;
  const start = () => {
    if (started) return;
    started = true;
    events.forEach((e) => removeEventListener(e, start));
    void init();
  };
  events.forEach((e) => addEventListener(e, start, { passive: true, once: true }));
  setTimeout(() => ('requestIdleCallback' in window ? requestIdleCallback(start) : start()), 6000);
}
