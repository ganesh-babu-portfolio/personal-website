/* ==========================================================================
   Ganesh Babu Dushyendiran - Senior Marketing Operations Architect Portfolio
   Refactored Interactive Engine & Formspree Integration
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Mobile Menu Drawer Toggle
  const mobileToggle = document.getElementById('mobileToggle');
  const mobileMenu = document.getElementById('mobileMenu');

  if (mobileToggle && mobileMenu) {
    mobileToggle.addEventListener('click', () => {
      mobileMenu.classList.toggle('open');
    });

    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
      });
    });
  }

  // 2. Scroll Reveal Observer for Cards & Sections
  const revealElements = document.querySelectorAll('.reveal-item, .project-card, .expertise-card, .service-box, .cert-card, .timeline-item');

  revealElements.forEach(el => {
    if (!el.classList.contains('reveal-item')) {
      el.classList.add('reveal-item');
    }
  });

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));

  // 3. Active Scroll-Spy for Header Navigation Links
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  function scrollSpy() {
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', scrollSpy);

  // 4. Category Filter Tabs for Merged Capabilities & Tech Stack Section
  const tabBtns = document.querySelectorAll('.tab-btn');
  const expertiseCards = document.querySelectorAll('.expertise-card');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterCategory = btn.getAttribute('data-filter');

      expertiseCards.forEach(card => {
        const cardCat = card.getAttribute('data-category');

        if (filterCategory === 'all' || cardCat === filterCategory) {
          card.style.display = 'flex';
          setTimeout(() => card.classList.add('revealed'), 50);
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // 5. Collapsible 16-Phase Pardot Blueprint Drawer Toggle
  const blueprintToggleBtn = document.getElementById('blueprintToggleBtn');
  const blueprintDrawer = document.getElementById('blueprintDrawer');

  if (blueprintToggleBtn && blueprintDrawer) {
    blueprintToggleBtn.addEventListener('click', () => {
      const isOpen = blueprintDrawer.classList.contains('open');
      if (isOpen) {
        blueprintDrawer.classList.remove('open');
        blueprintToggleBtn.querySelector('.toggle-icon').textContent = '+';
      } else {
        blueprintDrawer.classList.add('open');
        blueprintToggleBtn.querySelector('.toggle-icon').textContent = '−';
      }
    });
  }

  // 6. Interactive Client FAQ Accordion
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const trigger = item.querySelector('.faq-trigger');

    trigger.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      faqItems.forEach(i => i.classList.remove('active'));

      if (!isActive) {
        item.classList.add('active');
      }
    });
  });

  // 7. Discovery Call Modal Controls & Formspree Handler
  const modalOverlay = document.getElementById('discoveryModal');
  const openModalBtns = document.querySelectorAll('.open-modal');
  const closeModalBtn = document.getElementById('closeModal');
  const discoveryForm = document.getElementById('discoveryForm');

  openModalBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      if (modalOverlay) {
        modalOverlay.classList.add('open');
      }
    });
  });

  if (closeModalBtn && modalOverlay) {
    closeModalBtn.addEventListener('click', () => {
      modalOverlay.classList.remove('open');
    });

    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) {
        modalOverlay.classList.remove('open');
      }
    });
  }

  // Formspree Asynchronous Form Submission
  if (discoveryForm) {
    discoveryForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const submitBtn = discoveryForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;

      submitBtn.textContent = 'Sending Request...';
      submitBtn.disabled = true;

      const formData = new FormData(discoveryForm);

      try {
        const response = await fetch(discoveryForm.action, {
          method: 'POST',
          body: formData,
          headers: {
            'Accept': 'application/json'
          }
        });

        if (response.ok) {
          alert('Thank you! Your strategy call request has been sent to Ganesh. He will review your notes and reach out to you shortly.');
          discoveryForm.reset();
          if (modalOverlay) {
            modalOverlay.classList.remove('open');
          }
        } else {
          alert('Oops! There was a problem submitting your request. Please try emailing directly at ganeshbabu.dushy@gmail.com.');
        }
      } catch (error) {
        alert('Oops! Network error. Please try emailing directly at ganeshbabu.dushy@gmail.com.');
      } finally {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
      }
    });
  }

  // 8. Blog Carousel Interactive Controls (Prev/Next buttons & Drag-to-Scroll)
  const carouselWrapper = document.querySelector('.blog-carousel-wrapper');
  const prevBtn = document.getElementById('blogCarouselPrev');
  const nextBtn = document.getElementById('blogCarouselNext');

  if (carouselWrapper) {
    const scrollAmount = 340;

    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        carouselWrapper.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        carouselWrapper.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      });
    }

    // Mouse Drag to Scroll Capability
    let isDown = false;
    let startX;
    let scrollLeft;

    carouselWrapper.addEventListener('mousedown', (e) => {
      isDown = true;
      carouselWrapper.classList.add('active-drag');
      startX = e.pageX - carouselWrapper.offsetLeft;
      scrollLeft = carouselWrapper.scrollLeft;
    });

    carouselWrapper.addEventListener('mouseleave', () => {
      isDown = false;
      carouselWrapper.classList.remove('active-drag');
    });

    carouselWrapper.addEventListener('mouseup', () => {
      isDown = false;
      carouselWrapper.classList.remove('active-drag');
    });

    carouselWrapper.addEventListener('mousemove', (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - carouselWrapper.offsetLeft;
      const walk = (x - startX) * 1.5;
      carouselWrapper.scrollLeft = scrollLeft - walk;
    });
  }
});
