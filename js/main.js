/* ============================================
   ZEPTIVO Digital — Main App Initializer
   Preloader + module orchestration
   ============================================ */

(function App() {
  'use strict';

  // Initialize preloader immediately
  document.addEventListener('DOMContentLoaded', () => {
    initPreloader();
  });

  function initPreloader() {
    const counter = document.getElementById('preloaderCounter');
    const bar = document.querySelector('.preloader-bar-inner');
    const preloader = document.getElementById('preloader');
    
    let start = null;
    const duration = 2500; // 2.5 seconds

    function animate(timestamp) {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      const percent = Math.floor(progress * 100);
      
      if (counter) counter.innerText = percent + '%';
      if (bar) bar.style.width = percent + '%';
      
      if (progress < 1) {
        window.requestAnimationFrame(animate);
      } else {
        setTimeout(() => {
          if (preloader) preloader.classList.add('loaded');
          document.body.style.overflow = 'auto';
          
          // Init modules after preloader
          initModules();
        }, 300);
      }
    }
    window.requestAnimationFrame(animate);
  }

  function initModules() {
    try { ThreeScene.init(); } catch (e) { console.warn('ThreeScene:', e); }
    try { Navigation.init(); } catch (e) { console.warn('Navigation:', e); }
    try { Animations.init(); } catch (e) { console.warn('Animations:', e); }
    try { Contact.init(); } catch (e) { console.warn('Contact:', e); }
  }
})();
