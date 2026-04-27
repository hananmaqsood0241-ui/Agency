/* ============================================
   ZEPTIVO Digital — Contact Form & WhatsApp
   ============================================ */

const Contact = (() => {
  const form = document.getElementById('contactForm');
  const whatsapp = document.getElementById('whatsappFab');

  function init() {
    if (form) setupForm();
    if (whatsapp) setupWhatsApp();
  }

  function setupForm() {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = form.querySelector('#name').value.trim();
      const email = form.querySelector('#email').value.trim();
      const service = form.querySelector('#service').value;
      const message = form.querySelector('#message').value.trim();

      if (!name || !email || !service || !message) {
        shakeForm();
        return;
      }

      // Success animation
      const btn = form.querySelector('#submitBtn');
      const successMsg = document.getElementById('formSuccess');
      
      btn.classList.add('loading');
      btn.disabled = true;

      // Simulate a network request
      setTimeout(() => {
        btn.classList.remove('loading');
        successMsg.classList.add('show');
        form.reset();

        setTimeout(() => {
          successMsg.classList.remove('show');
          btn.disabled = false;
        }, 5000);
      }, 2000);
    });

    // Focus glow on inputs
    form.querySelectorAll('input, select, textarea').forEach(input => {
      input.addEventListener('focus', () => {
        input.parentElement.style.transform = 'scale(1.01)';
      });
      input.addEventListener('blur', () => {
        input.parentElement.style.transform = '';
      });
    });
  }

  function shakeForm() {
    form.style.animation = 'shake 0.5s';
    setTimeout(() => { form.style.animation = ''; }, 500);
  }

  function setupWhatsApp() {
    // Show after scroll
    whatsapp.style.opacity = '0';
    whatsapp.style.transform = 'scale(0)';
    whatsapp.style.transition = 'opacity 0.4s, transform 0.4s';

    window.addEventListener('scroll', () => {
      if (window.scrollY > 400) {
        whatsapp.style.opacity = '1';
        whatsapp.style.transform = 'scale(1)';
      } else {
        whatsapp.style.opacity = '0';
        whatsapp.style.transform = 'scale(0)';
      }
    }, { passive: true });
  }

  return { init };
})();

// Shake keyframe (injected once)
const shakeStyle = document.createElement('style');
shakeStyle.textContent = `@keyframes shake{0%,100%{transform:translateX(0)}20%,60%{transform:translateX(-6px)}40%,80%{transform:translateX(6px)}}`;
document.head.appendChild(shakeStyle);
