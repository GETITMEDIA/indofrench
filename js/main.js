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

  // 4. Contact / Enquiry Form Validation Engine
  const enquiryForm = document.getElementById('contactEnquiryForm');
  const mobileInput = document.getElementById('mobile');
  const mobileInputGroup = document.getElementById('mobileInputGroup');

  function showError(inputEl, errorEl, message, groupEl = null) {
    if (inputEl) {
      inputEl.classList.add('is-invalid');
      inputEl.classList.remove('is-valid');
    }
    if (groupEl) groupEl.classList.add('is-invalid');
    if (errorEl) {
      errorEl.textContent = message;
      errorEl.classList.add('visible');
    }
  }

  function clearError(inputEl, errorEl, groupEl = null) {
    if (inputEl) {
      inputEl.classList.remove('is-invalid');
      inputEl.classList.add('is-valid');
    }
    if (groupEl) {
      groupEl.classList.remove('is-invalid');
    }
    if (errorEl) {
      errorEl.textContent = '';
      errorEl.classList.remove('visible');
    }
  }

  function validateFirstName() {
    const input = document.getElementById('firstName');
    const error = document.getElementById('firstNameError');
    if (!input) return true;
    const val = input.value.trim();
    if (!val) {
      showError(input, error, 'First name is required');
      return false;
    } else if (val.length < 2) {
      showError(input, error, 'First name must be at least 2 characters');
      return false;
    } else if (!/^[A-Za-z\s]+$/.test(val)) {
      showError(input, error, 'First name must contain only letters');
      return false;
    } else {
      clearError(input, error);
      return true;
    }
  }

  function validateLastName() {
    const input = document.getElementById('lastName');
    const error = document.getElementById('lastNameError');
    if (!input) return true;
    const val = input.value.trim();
    if (!val) {
      showError(input, error, 'Last name is required');
      return false;
    } else if (!/^[A-Za-z\s]+$/.test(val)) {
      showError(input, error, 'Last name must contain only letters');
      return false;
    } else {
      clearError(input, error);
      return true;
    }
  }

  function validateMobile() {
    const input = document.getElementById('mobile');
    const error = document.getElementById('mobileError');
    const group = document.getElementById('mobileInputGroup');
    if (!input) return true;
    const val = input.value.trim();
    if (!val) {
      showError(input, error, 'Mobile number is required', group);
      return false;
    } else if (!/^\d{10}$/.test(val)) {
      showError(input, error, `Mobile number must be exactly 10 digits (${val.length}/10 entered)`, group);
      return false;
    } else {
      clearError(input, error, group);
      return true;
    }
  }

  function validateEmail() {
    const input = document.getElementById('email');
    const error = document.getElementById('emailError');
    if (!input) return true;
    const val = input.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!val) {
      showError(input, error, 'Email address is required');
      return false;
    } else if (!emailRegex.test(val)) {
      showError(input, error, 'Please enter a valid email address (e.g. name@example.com)');
      return false;
    } else {
      clearError(input, error);
      return true;
    }
  }

  function validateCity() {
    const input = document.getElementById('city');
    const error = document.getElementById('cityError');
    if (!input) return true;
    const val = input.value.trim();
    if (!val) {
      showError(input, error, 'City is required');
      return false;
    } else if (val.length < 2) {
      showError(input, error, 'Please enter a valid city name');
      return false;
    } else {
      clearError(input, error);
      return true;
    }
  }

  function validateState() {
    const input = document.getElementById('state');
    const error = document.getElementById('stateError');
    if (!input) return true;
    const val = input.value.trim();
    if (!val) {
      showError(input, error, 'State is required');
      return false;
    } else if (val.length < 2) {
      showError(input, error, 'Please enter a valid state name');
      return false;
    } else {
      clearError(input, error);
      return true;
    }
  }

  function validateProductSelect() {
    const input = document.getElementById('productSelect');
    const error = document.getElementById('productSelectError');
    if (!input) return true;
    const val = input.value;
    if (!val) {
      showError(input, error, 'Please choose a product');
      return false;
    } else {
      clearError(input, error);
      return true;
    }
  }

  // Mobile Input: Restrict to numbers only & max 10 digits
  if (mobileInput) {
    mobileInput.addEventListener('keydown', (e) => {
      const allowedKeys = ['Backspace', 'Delete', 'Tab', 'Escape', 'Enter', 'ArrowLeft', 'ArrowRight', 'Home', 'End'];
      if (allowedKeys.includes(e.key) || e.ctrlKey || e.metaKey || e.altKey) {
        return;
      }
      if (!/^[0-9]$/.test(e.key)) {
        e.preventDefault();
      }
    });

    mobileInput.addEventListener('input', () => {
      let val = mobileInput.value.replace(/\D/g, '');
      if (val.length === 12 && val.startsWith('91')) {
        val = val.slice(2);
      }
      if (val.length > 10) {
        val = val.slice(0, 10);
      }
      mobileInput.value = val;
      if (mobileInput.classList.contains('is-invalid') || val.length === 10) {
        validateMobile();
      }
    });

    mobileInput.addEventListener('blur', validateMobile);
  }

  // Bind live validation event listeners
  const fieldValidationMap = {
    'firstName': validateFirstName,
    'lastName': validateLastName,
    'email': validateEmail,
    'city': validateCity,
    'state': validateState
  };

  Object.keys(fieldValidationMap).forEach(id => {
    const el = document.getElementById(id);
    if (el) {
      el.addEventListener('blur', fieldValidationMap[id]);
      el.addEventListener('input', () => {
        if (el.classList.contains('is-invalid')) {
          fieldValidationMap[id]();
        }
      });
    }
  });

  const productSelectEl = document.getElementById('productSelect');
  if (productSelectEl) {
    productSelectEl.addEventListener('change', validateProductSelect);
    productSelectEl.addEventListener('blur', validateProductSelect);
  }

  if (enquiryForm) {
    enquiryForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const isFNValid = validateFirstName();
      const isLNValid = validateLastName();
      const isMobValid = validateMobile();
      const isEmailValid = validateEmail();
      const isCityValid = validateCity();
      const isStateValid = validateState();
      const isProdValid = validateProductSelect();

      if (isFNValid && isLNValid && isMobValid && isEmailValid && isCityValid && isStateValid && isProdValid) {
        const firstName = document.getElementById('firstName').value.trim();
        const mobile = document.getElementById('mobile').value.trim();
        const product = document.getElementById('productSelect').value;

        alert(`Thank you, ${firstName}!\n\nYour enquiry for "${product}" has been received successfully.\nMobile: +91 ${mobile}\n\nOur Indofrench sleep specialist will contact you shortly.`);
        enquiryForm.reset();
        
        document.querySelectorAll('#contactEnquiryForm .is-valid').forEach(el => el.classList.remove('is-valid'));
      } else {
        const firstInvalid = enquiryForm.querySelector('.is-invalid');
        if (firstInvalid) {
          firstInvalid.focus();
        }
      }
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

  // 9. Gallery Lightbox Modal Viewer Engine
  const galleryItems = document.querySelectorAll('.gallery-item');
  let lightbox = document.getElementById('galleryLightbox');

  if (galleryItems.length > 0) {
    // If Lightbox HTML does not exist dynamically in page, build it on-the-fly!
    if (!lightbox) {
      lightbox = document.createElement('div');
      lightbox.className = 'lightbox-modal';
      lightbox.id = 'galleryLightbox';
      lightbox.setAttribute('role', 'dialog');
      lightbox.setAttribute('aria-modal', 'true');
      lightbox.innerHTML = `
        <button class="lightbox-close" id="lightboxClose" aria-label="Close image view">&times;</button>
        <button class="lightbox-nav prev" id="lightboxPrev" aria-label="Previous image"><i class="fa-solid fa-chevron-left"></i></button>
        <button class="lightbox-nav next" id="lightboxNext" aria-label="Next image"><i class="fa-solid fa-chevron-right"></i></button>
        <div class="lightbox-content">
          <img src="" alt="Indofrench Gallery View" id="lightboxImg">
          <div class="lightbox-caption" id="lightboxCaption"></div>
        </div>
      `;
      document.body.appendChild(lightbox);
    }

    const lightboxImg = document.getElementById('lightboxImg');
    const lightboxCaption = document.getElementById('lightboxCaption');
    const lightboxClose = document.getElementById('lightboxClose');
    const lightboxPrev = document.getElementById('lightboxPrev');
    const lightboxNext = document.getElementById('lightboxNext');

    let currentIndex = 0;
    const imagesList = [];

    galleryItems.forEach((item, index) => {
      const img = item.querySelector('img');
      if (img) {
        imagesList.push({
          src: img.src,
          alt: img.alt || `Indofrench Gallery Photo ${index + 1}`
        });

        item.addEventListener('click', () => {
          openLightbox(index);
        });
      }
    });

    function openLightbox(index) {
      currentIndex = index;
      updateLightboxContent();
      lightbox.classList.add('active');
      document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
      lightbox.classList.remove('active');
      document.body.style.overflow = '';
    }

    function updateLightboxContent() {
      if (imagesList[currentIndex]) {
        lightboxImg.src = imagesList[currentIndex].src;
        lightboxCaption.textContent = imagesList[currentIndex].alt;
      }
    }

    function prevImage() {
      currentIndex = (currentIndex - 1 + imagesList.length) % imagesList.length;
      updateLightboxContent();
    }

    function nextImage() {
      currentIndex = (currentIndex + 1) % imagesList.length;
      updateLightboxContent();
    }

    if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
    if (lightboxPrev) lightboxPrev.addEventListener('click', prevImage);
    if (lightboxNext) lightboxNext.addEventListener('click', nextImage);

    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) closeLightbox();
    });

    document.addEventListener('keydown', (e) => {
      if (!lightbox.classList.contains('active')) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') prevImage();
      if (e.key === 'ArrowRight') nextImage();
    });
  }
});
