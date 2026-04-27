/* ============================================
   ZEPTIVO Digital — Main App Initializer
   Preloader + module orchestration
   ============================================ */

(function App() {
  'use strict';

  // Show preloader
  document.body.classList.add('is-loading');

  // Initialize everything after page load
  window.addEventListener('load', () => {
    // Dismiss preloader with counter
    // Dismiss preloader with counter
    const preloaderCounter = document.getElementById('preloaderCounter');
    const preloaderBar = document.querySelector('.preloader-bar-inner');
    let start = null;
    const duration = 2500; // 2.5 seconds

    function step(timestamp) {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      const percent = Math.floor(progress * 100);
      
      if (preloaderCounter) preloaderCounter.innerText = percent + '%';
      if (preloaderBar) preloaderBar.style.width = percent + '%';
      
      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        setTimeout(() => {
          const preloader = document.getElementById('preloader');
          if (preloader) preloader.classList.add('loaded');
          document.body.classList.remove('is-loading');
        }, 500);
      }
    }
    window.requestAnimationFrame(step);

    // Init modules
    try { ThreeScene.init(); } catch (e) { console.warn('Three.js:', e); }
    try { Navigation.init(); } catch (e) { console.warn('Navigation:', e); }
    try { TiltEffect.init(); } catch (e) { console.warn('Tilt:', e); }
    try { Animations.init(); } catch (e) { console.warn('Animations:', e); }
    try { Portfolio.init(); } catch (e) { console.warn('Portfolio:', e); }
    try { Testimonials.init(); } catch (e) { console.warn('Testimonials:', e); }
    try { Contact.init(); } catch (e) { console.warn('Contact:', e); }
  });
})();
