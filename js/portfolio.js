/* ============================================
   ZEPTIVO Digital — Portfolio
   Drag-to-scroll gallery + filter buttons
   ============================================ */

const Portfolio = (() => {
  const track = document.getElementById('portfolioTrack');
  const filterBtns = document.querySelectorAll('.filter-btn');
  const cards = track ? track.querySelectorAll('.portfolio-card') : [];

  function init() {
    if (!track) return;
    setupDrag();
    setupFilters();
  }

  /* ----- Drag scroll ----- */
  function setupDrag() {
    let isDown = false, startX, scrollLeft;

    track.addEventListener('mousedown', (e) => {
      isDown = true;
      track.classList.add('grabbing');
      startX = e.pageX - track.offsetLeft;
      scrollLeft = track.parentElement.scrollLeft;
    });

    track.addEventListener('mouseleave', () => { isDown = false; });
    track.addEventListener('mouseup', () => { isDown = false; });

    track.addEventListener('mousemove', (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - track.offsetLeft;
      const walk = (x - startX) * 1.5;
      track.parentElement.scrollLeft = scrollLeft - walk;
    });

    // Touch support
    let touchStartX;
    track.addEventListener('touchstart', (e) => {
      touchStartX = e.touches[0].pageX;
      scrollLeft = track.parentElement.scrollLeft;
    }, { passive: true });

    track.addEventListener('touchmove', (e) => {
      const x = e.touches[0].pageX;
      const walk = (touchStartX - x) * 1.2;
      track.parentElement.scrollLeft = scrollLeft + walk;
    }, { passive: true });
  }

  /* ----- Filter ----- */
  function setupFilters() {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const filter = btn.dataset.filter;

        cards.forEach(card => {
          const cat = card.dataset.category;
          const isMatch = filter === 'all' || cat === filter;

          if (isMatch) {
            card.style.display = 'block';
            gsap.fromTo(card, 
              { opacity: 0, scale: 0.8 }, 
              { opacity: 1, scale: 1, duration: 0.5, ease: 'power2.out', clearProps: 'all' }
            );
          } else {
            gsap.to(card, {
              opacity: 0,
              scale: 0.8,
              duration: 0.4,
              ease: 'power2.in',
              onComplete: () => {
                card.style.display = 'none';
              }
            });
          }
        });
      });
    });
  }

  return { init };
})();
