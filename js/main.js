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
    const preloaderCounter = document.getElementById('preloaderCounter');
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.floor(Math.random() * 15) + 5;
      if (progress > 100) progress = 100;
      if (preloaderCounter) preloaderCounter.innerText = progress + '%';
      
      if (progress === 100) {
        clearInterval(interval);
        setTimeout(() => {
          const preloader = document.getElementById('preloader');
          if (preloader) preloader.classList.add('loaded');
          document.body.classList.remove('is-loading');
        }, 500);
      }
    }, 100);

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
