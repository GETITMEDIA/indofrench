/**
 * INDOFRENCH Sleep Products - Homepage Engine
 * 100% Natural Latex | Dunlop Process | Made in India Since 1979
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Mobile Menu Toggle
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const navMenu = document.getElementById('navMenu');

  if (hamburgerBtn && navMenu) {
    hamburgerBtn.addEventListener('click', () => {
      navMenu.classList.toggle('open');
      const isOpen = navMenu.classList.contains('open');
      hamburgerBtn.setAttribute('aria-expanded', isOpen);
    });

    // Close when clicking nav links
    navMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
      });
    });
  }

  // 2. FAQ Accordion Logic
  const faqItems = document.querySelectorAll('.faq-accordion-item');
  faqItems.forEach(item => {
    const trigger = item.querySelector('.faq-header-trigger');
    if (trigger) {
      trigger.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        // Close others
        faqItems.forEach(f => f.classList.remove('active'));
        if (!isActive) {
          item.classList.add('active');
        }
      });
    }
  });

  // 3. Modal Controls
  window.openModal = function(id) {
    const modal = document.getElementById(id);
    if (modal) {
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  };

  window.closeModal = function(id) {
    const modal = document.getElementById(id);
    if (modal) {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    }
  };

  // Close modal when clicking outside box
  document.querySelectorAll('.modal-overlay').forEach(overlay => {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        overlay.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  });

  // 4. Contact / Enquiry Form
  const enquiryForm = document.getElementById('contactEnquiryForm');
  if (enquiryForm) {
    enquiryForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('firstName').value;
      const product = document.getElementById('productSelect').value;
      alert(`Thank you, ${name}! Your enquiry for ${product} has been received. An Indofrench sleep specialist will contact you shortly.`);
      enquiryForm.reset();
    });
  }

  // 5. Warranty Form
  const warrantyForm = document.getElementById('warrantyRegistrationForm');
  if (warrantyForm) {
    warrantyForm.addEventListener('submit', (e) => {
      e.preventDefault();
      alert('Your 10-Year Piece-to-Piece Replacement Guarantee has been successfully registered! A confirmation has been logged.');
      closeModal('guaranteeModal');
      warrantyForm.reset();
    });
  }

  // 6. Odor Guide Alert
  window.showOdorTips = function() {
    alert('Care Tip for New Natural Latex Mattresses:\n\n1. Natural rubber latex has a pleasant, mild vanilla-rubber organic scent.\n2. Keep your bedroom well ventilated with open windows for 24 to 48 hours.\n3. The scent is completely non-toxic (zero petroleum VOCs) and dissipates naturally with use.');
  };

  // 7. Continuous Smooth Marquee Auto-Play Engine
  // Managed smoothly via hardware-accelerated CSS @keyframes tickerAutoScroll on #topbarTrack
  const marqueeTrack = document.getElementById('topbarTrack');
  if (marqueeTrack) {
    marqueeTrack.style.animationPlayState = 'running';
  }

  // 8. Hero 3-Slide Carousel Engine
  const heroCarousel = document.getElementById('heroCarousel');
  if (heroCarousel) {
    const slides = heroCarousel.querySelectorAll('.hero-slide');
    const dots = document.querySelectorAll('.carousel-dot-btn');
    const prevBtn = document.getElementById('heroPrevBtn');
    const nextBtn = document.getElementById('heroNextBtn');
    let currentSlide = 0;
    let autoPlayTimer = null;

    function goToSlide(index) {
      if (index < 0) index = slides.length - 1;
      if (index >= slides.length) index = 0;
      currentSlide = index;

      slides.forEach((slide, i) => {
        slide.classList.toggle('active', i === currentSlide);
      });

      dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === currentSlide);
      });
    }

    function startAutoPlay() {
      stopAutoPlay();
      autoPlayTimer = setInterval(() => {
        goToSlide(currentSlide + 1);
      }, 4000);
    }

    function stopAutoPlay() {
      if (autoPlayTimer) {
        clearInterval(autoPlayTimer);
        autoPlayTimer = null;
      }
    }

    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        goToSlide(currentSlide - 1);
        startAutoPlay();
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        goToSlide(currentSlide + 1);
        startAutoPlay();
      });
    }

    dots.forEach((dot, i) => {
      dot.addEventListener('click', () => {
        goToSlide(i);
        startAutoPlay();
      });
    });

    heroCarousel.addEventListener('mouseenter', stopAutoPlay);
    heroCarousel.addEventListener('mouseleave', startAutoPlay);

    // Mobile touch swipe support
    let touchStartX = 0;
    heroCarousel.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
      stopAutoPlay();
    }, { passive: true });

    heroCarousel.addEventListener('touchend', (e) => {
      const touchEndX = e.changedTouches[0].screenX;
      const diff = touchStartX - touchEndX;
      if (Math.abs(diff) > 40) {
        if (diff > 0) {
          goToSlide(currentSlide + 1);
        } else {
          goToSlide(currentSlide - 1);
        }
      }
      startAutoPlay();
    }, { passive: true });

    // Start auto rotation
    startAutoPlay();
  }
});
