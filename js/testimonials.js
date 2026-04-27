/* ============================================
   ZEPTIVO Digital — Testimonial Carousel
   Auto-rotating with dots navigation
   ============================================ */

const Testimonials = (() => {
  const track = document.getElementById('testimonialTrack');
  const dotsContainer = document.getElementById('testimonialDots');
  if (!track || !dotsContainer) return { init() {} };

  const cards = track.querySelectorAll('.testimonial-card');
  let current = 0;
  let interval;
  const INTERVAL_MS = 5000;

  function init() {
    if (cards.length === 0) return;
    createDots();
    goTo(0);
    startAuto();

    // Pause on hover
    track.closest('.testimonial-slider').addEventListener('mouseenter', () => clearInterval(interval));
    track.closest('.testimonial-slider').addEventListener('mouseleave', startAuto);
  }

  function createDots() {
    cards.forEach((_, i) => {
      const dot = document.createElement('button');
      dot.className = 'testimonial-dot' + (i === 0 ? ' active' : '');
      dot.setAttribute('aria-label', 'Testimonial ' + (i + 1));
      dot.addEventListener('click', () => { goTo(i); resetAuto(); });
      dotsContainer.appendChild(dot);
    });
  }

  function goTo(index) {
    current = index;
    track.style.transform = `translateX(-${current * 100}%)`;
    dotsContainer.querySelectorAll('.testimonial-dot').forEach((d, i) => {
      d.classList.toggle('active', i === current);
    });
  }

  function next() {
    goTo((current + 1) % cards.length);
  }

  function startAuto() {
    clearInterval(interval);
    interval = setInterval(next, INTERVAL_MS);
  }

  function resetAuto() {
    clearInterval(interval);
    startAuto();
  }

  return { init };
})();
