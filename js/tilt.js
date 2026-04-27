/* ============================================
   ZEPTIVO Digital — 3D Tilt Effect
   Lightweight custom tilt for service cards
   ============================================ */

const TiltEffect = (() => {
  const SETTINGS = {
    maxTilt: 12,
    perspective: 1000,
    scale: 1.03,
    speed: 400,
    glareOpacity: 0.12
  };

  function init() {
    const cards = document.querySelectorAll('[data-tilt]');
    cards.forEach(card => {
      // Create glare element
      const glare = document.createElement('div');
      glare.style.cssText = `
        position:absolute;inset:0;border-radius:inherit;
        pointer-events:none;opacity:0;
        transition:opacity ${SETTINGS.speed}ms;
        background:linear-gradient(135deg,rgba(255,255,255,${SETTINGS.glareOpacity}) 0%,transparent 80%);
      `;
      card.style.position = 'relative';
      card.style.overflow = 'hidden';
      card.appendChild(glare);

      card.addEventListener('mousemove', (e) => onMove(e, card, glare));
      card.addEventListener('mouseleave', () => onLeave(card, glare));
    });
  }

  function onMove(e, card, glare) {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -SETTINGS.maxTilt;
    const rotateY = ((x - centerX) / centerX) * SETTINGS.maxTilt;

    card.style.transform = `perspective(${SETTINGS.perspective}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(${SETTINGS.scale},${SETTINGS.scale},${SETTINGS.scale})`;
    card.style.transition = `transform 0.1s ease`;

    // Move glare
    const glareX = (x / rect.width) * 100;
    const glareY = (y / rect.height) * 100;
    glare.style.background = `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,${SETTINGS.glareOpacity}) 0%, transparent 60%)`;
    glare.style.opacity = '1';
  }

  function onLeave(card, glare) {
    card.style.transform = `perspective(${SETTINGS.perspective}px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)`;
    card.style.transition = `transform ${SETTINGS.speed}ms ease`;
    glare.style.opacity = '0';
  }

  return { init };
})();
