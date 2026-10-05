/**
 * VÉRTICE TECNOLOGIA ESTRATÉGICA - JAVASCRIPT
 * Interactions: Navbar scroll, Mobile menu, FAQ accordion, Modal, Phone mask, Form submission
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Header scroll effect
  const siteHeader = document.querySelector('.site-header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      siteHeader?.classList.add('scrolled');
    } else {
      siteHeader?.classList.remove('scrolled');
    }
  });

  // 2. Hamburger + Off-canvas Drawer
  const hamburgerBtn = document.getElementById('mobileMenuToggle');
  const navDrawer = document.getElementById('navMenu');
  const navOverlay = document.getElementById('navOverlay');
  const navDrawerClose = document.getElementById('navDrawerClose');

  const openDrawer = () => {
    navDrawer?.classList.add('open');
    navOverlay?.classList.add('open');
    hamburgerBtn?.classList.add('is-open');
    hamburgerBtn?.setAttribute('aria-expanded', 'true');
    navDrawer?.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  };

  const closeDrawer = () => {
    navDrawer?.classList.remove('open');
    navOverlay?.classList.remove('open');
    hamburgerBtn?.classList.remove('is-open');
    hamburgerBtn?.setAttribute('aria-expanded', 'false');
    navDrawer?.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  hamburgerBtn?.addEventListener('click', () => {
    const isOpen = navDrawer?.classList.contains('open');
    isOpen ? closeDrawer() : openDrawer();
  });

  navDrawerClose?.addEventListener('click', closeDrawer);
  navOverlay?.addEventListener('click', closeDrawer);

  // Close drawer when any nav link is clicked
  document.querySelectorAll('.nav-menu-list .nav-link').forEach(link => {
    link.addEventListener('click', closeDrawer);
  });

  // 3. FAQ Accordion
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');
    if (questionBtn) {
      questionBtn.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        
        // Close all other items
        faqItems.forEach(otherItem => otherItem.classList.remove('active'));
        
        // Toggle current
        if (!isActive) {
          item.classList.add('active');
        }
      });
    }
  });

  // 4. Modal Booking Management
  const modalOverlay = document.getElementById('bookingModal');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const modalTriggers = document.querySelectorAll('[data-open-modal]');

  const openModal = () => {
    if (modalOverlay) {
      modalOverlay.classList.add('open');
      document.body.style.overflow = 'hidden';
    }
  };

  const closeModal = () => {
    if (modalOverlay) {
      modalOverlay.classList.remove('open');
      document.body.style.overflow = '';
    }
  };

  modalTriggers.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openModal();
    });
  });

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeModal);
  }

  if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) {
        closeModal();
      }
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay?.classList.contains('open')) {
      closeModal();
    }
  });

  // 5. Phone / WhatsApp Input Mask (Brazil format: (XX) XXXXX-XXXX)
  const phoneInputs = document.querySelectorAll('input[type="tel"]');
  phoneInputs.forEach(input => {
    input.addEventListener('input', (e) => {
      let value = e.target.value.replace(/\D/g, '');
      if (value.length > 11) value = value.slice(0, 11);

      if (value.length > 6) {
        value = `(${value.slice(0, 2)}) ${value.slice(2, 7)}-${value.slice(7)}`;
      } else if (value.length > 2) {
        value = `(${value.slice(0, 2)}) ${value.slice(2)}`;
      } else if (value.length > 0) {
        value = `(${value}`;
      }
      e.target.value = value;
    });
  });

  // 6. Toast Notification Helper
  const showToast = (message) => {
    let toast = document.getElementById('toastNotice');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'toastNotice';
      toast.className = 'toast-notice';
      toast.innerHTML = `
        <i class="ri-checkbox-circle-fill toast-icon"></i>
        <div class="toast-text">${message}</div>
      `;
      document.body.appendChild(toast);
    } else {
      toast.querySelector('.toast-text').textContent = message;
    }

    setTimeout(() => toast.classList.add('show'), 50);
    setTimeout(() => toast.classList.remove('show'), 4500);
  };

  // 7. Form Submissions Handler
  const handleFormSubmit = (formId) => {
    const form = document.getElementById(formId);
    if (!form) return;

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const submitBtn = form.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;

      // Simple visual loading feedback
      submitBtn.disabled = true;
      submitBtn.innerHTML = `<i class="ri-loader-4-line ri-spin"></i> Processando Diagnóstico...`;

      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
        form.reset();

        if (modalOverlay?.classList.contains('open')) {
          closeModal();
        }

        showToast('Solicitação recebida com sucesso! Um consultor sênior entrará em contato em até 2 horas.');
      }, 1200);
    });
  };

  handleFormSubmit('heroLeadForm');
  handleFormSubmit('modalLeadForm');
});
