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

  // 4. Global Validation Helpers & Form Validation Engine
  function showError(inputEl, errorEl, message, groupEl = null) {
    if (inputEl) {
      inputEl.classList.add('is-invalid');
      inputEl.classList.remove('is-valid');
    }
    if (groupEl) {
      groupEl.classList.add('is-invalid');
      groupEl.classList.remove('is-valid');
    }
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
      groupEl.classList.add('is-valid');
    }
    if (errorEl) {
      errorEl.textContent = '';
      errorEl.classList.remove('visible');
    }
  }

  // Common Field Validators
  function validateFieldText(inputId, errorId, fieldName, minLen = 2) {
    const input = document.getElementById(inputId);
    const error = document.getElementById(errorId);
    if (!input) return true;
    const val = input.value.trim();
    if (!val) {
      showError(input, error, `${fieldName} is required`);
      return false;
    } else if (val.length < minLen) {
      showError(input, error, `${fieldName} must be at least ${minLen} characters`);
      return false;
    } else {
      clearError(input, error);
      return true;
    }
  }

  function validateNameOnly(inputId, errorId, fieldName, isRequired = true) {
    const input = document.getElementById(inputId);
    const error = document.getElementById(errorId);
    if (!input) return true;
    const val = input.value.trim();
    if (!val) {
      if (isRequired) {
        showError(input, error, `${fieldName} is required`);
        return false;
      }
      clearError(input, error);
      return true;
    } else if (val.length < 2) {
      showError(input, error, `${fieldName} must be at least 2 characters`);
      return false;
    } else if (!/^[A-Za-z\s\.\']+$/.test(val)) {
      showError(input, error, `${fieldName} must contain only letters`);
      return false;
    } else {
      clearError(input, error);
      return true;
    }
  }

  function validateMobileField(inputId = 'mobile', errorId = 'mobileError', groupId = 'mobileInputWrap') {
    const input = document.getElementById(inputId);
    const error = document.getElementById(errorId);
    const group = document.getElementById(groupId) || (input ? input.closest('.phone-input-wrap, .navy-phone-wrap') : null);
    if (!input) return true;

    // Sanitize to digits only
    let val = input.value.replace(/\D/g, '');
    if (val.length === 12 && val.startsWith('91')) {
      val = val.slice(2);
    }
    if (val.length > 10) {
      val = val.slice(0, 10);
    }
    input.value = val;

    if (!val) {
      showError(input, error, 'Mobile number is required', group);
      return false;
    } else if (val.length < 10) {
      showError(input, error, `Please enter a valid 10-digit mobile number (${val.length}/10 digits)`, group);
      return false;
    } else if (!/^[6-9]\d{9}$/.test(val)) {
      showError(input, error, 'Mobile number must start with 6, 7, 8, or 9', group);
      return false;
    } else {
      clearError(input, error, group);
      return true;
    }
  }

  function validateEmailField(inputId = 'email', errorId = 'emailError') {
    const input = document.getElementById(inputId);
    const error = document.getElementById(errorId);
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

  function validateSelectField(selectId, errorId, fieldName) {
    const select = document.getElementById(selectId);
    const error = document.getElementById(errorId);
    if (!select) return true;
    const val = select.value;
    if (!val) {
      showError(select, error, `Please select ${fieldName}`);
      return false;
    } else {
      clearError(select, error);
      return true;
    }
  }

  function validateDateField(inputId, errorId, fieldName) {
    const input = document.getElementById(inputId);
    const error = document.getElementById(errorId);
    if (!input) return true;
    const val = input.value;
    if (!val) {
      showError(input, error, `Please select ${fieldName}`);
      return false;
    } else {
      clearError(input, error);
      return true;
    }
  }

  function validateQuantityField(inputId = 'quantity', errorId = 'quantityError') {
    const input = document.getElementById(inputId);
    const error = document.getElementById(errorId);
    if (!input) return true;
    const val = input.value.trim();
    if (!val) {
      showError(input, error, 'Quantity is required');
      return false;
    } else if (!/^[1-9]\d*$/.test(val)) {
      showError(input, error, 'Please enter a valid quantity (1 or more)');
      return false;
    } else {
      clearError(input, error);
      return true;
    }
  }

  function validateCheckboxField(checkboxId, errorId, message) {
    const checkbox = document.getElementById(checkboxId);
    const error = document.getElementById(errorId);
    if (!checkbox) return true;
    if (!checkbox.checked) {
      showError(checkbox, error, message);
      return false;
    } else {
      clearError(checkbox, error);
      return true;
    }
  }

  // 5. Restrict all Mobile / Phone input fields on the site to DIGITS ONLY & Max 10 digits
  const allPhoneInputs = document.querySelectorAll('input[type="tel"], #mobile');
  allPhoneInputs.forEach(phoneEl => {
    phoneEl.addEventListener('keydown', (e) => {
      const allowedKeys = ['Backspace', 'Delete', 'Tab', 'Escape', 'Enter', 'ArrowLeft', 'ArrowRight', 'Home', 'End'];
      if (allowedKeys.includes(e.key) || e.ctrlKey || e.metaKey || e.altKey) {
        return;
      }
      if (!/^[0-9]$/.test(e.key)) {
        e.preventDefault();
      }
    });

    phoneEl.addEventListener('input', () => {
      let val = phoneEl.value.replace(/\D/g, '');
      if (val.length === 12 && val.startsWith('91')) {
        val = val.slice(2);
      }
      if (val.length > 10) {
        val = val.slice(0, 10);
      }
      phoneEl.value = val;
    });
  });

  // Restrict quantity input to positive digits only
  const qtyInput = document.getElementById('quantity');
  if (qtyInput) {
    qtyInput.addEventListener('keydown', (e) => {
      const allowedKeys = ['Backspace', 'Delete', 'Tab', 'Escape', 'Enter', 'ArrowLeft', 'ArrowRight'];
      if (allowedKeys.includes(e.key) || e.ctrlKey || e.metaKey || e.altKey) return;
      if (!/^[0-9]$/.test(e.key)) e.preventDefault();
    });
    qtyInput.addEventListener('input', () => {
      qtyInput.value = qtyInput.value.replace(/\D/g, '').slice(0, 3);
    });
  }

  // Display selected File Name on Upload buttons
  const billUploadEl = document.getElementById('billUpload');
  const billFileNameEl = document.getElementById('billFileName');
  if (billUploadEl && billFileNameEl) {
    billUploadEl.addEventListener('change', () => {
      if (billUploadEl.files && billUploadEl.files.length > 0) {
        billFileNameEl.textContent = billUploadEl.files[0].name;
        billFileNameEl.style.display = 'inline-block';
      } else {
        billFileNameEl.textContent = 'No file selected';
        billFileNameEl.style.display = 'none';
      }
    });
  }

  const chequeUploadEl = document.getElementById('chequeUpload');
  const chequeFileNameEl = document.getElementById('chequeFileName');
  if (chequeUploadEl && chequeFileNameEl) {
    chequeUploadEl.addEventListener('change', () => {
      if (chequeUploadEl.files && chequeUploadEl.files.length > 0) {
        chequeFileNameEl.textContent = chequeUploadEl.files[0].name;
        chequeFileNameEl.style.display = 'inline-block';
      } else {
        chequeFileNameEl.textContent = 'No file selected';
        chequeFileNameEl.style.display = 'none';
      }
    });
  }

  // 6. Guarantee Registration Form Engine (#guaranteeForm)
  const guaranteeForm = document.getElementById('guaranteeForm');
  if (guaranteeForm) {
    // Bind live validation listeners
    const gFirstName = document.getElementById('firstName');
    const gLastName = document.getElementById('lastName');
    const gMobile = document.getElementById('mobile');
    const gEmail = document.getElementById('email');
    const gProduct = document.getElementById('productName');
    const gFirmness = document.getElementById('firmness');
    const gDate = document.getElementById('purchaseDate');
    const gQty = document.getElementById('quantity');
    const gDealer = document.getElementById('dealerName');
    const gState = document.getElementById('dealerState');
    const gTerms = document.getElementById('terms');

    if (gFirstName) {
      gFirstName.addEventListener('blur', () => validateNameOnly('firstName', 'firstNameError', 'First name', true));
      gFirstName.addEventListener('input', () => {
        if (gFirstName.classList.contains('is-invalid')) validateNameOnly('firstName', 'firstNameError', 'First name', true);
      });
    }

    if (gLastName) {
      gLastName.addEventListener('blur', () => validateNameOnly('lastName', 'lastNameError', 'Last name', false));
      gLastName.addEventListener('input', () => {
        if (gLastName.classList.contains('is-invalid')) validateNameOnly('lastName', 'lastNameError', 'Last name', false);
      });
    }

    if (gMobile) {
      gMobile.addEventListener('blur', () => validateMobileField('mobile', 'mobileError', 'mobileInputWrap'));
      gMobile.addEventListener('input', () => {
        if (gMobile.classList.contains('is-invalid') || gMobile.value.length === 10) {
          validateMobileField('mobile', 'mobileError', 'mobileInputWrap');
        }
      });
    }

    if (gEmail) {
      gEmail.addEventListener('blur', () => validateEmailField('email', 'emailError'));
      gEmail.addEventListener('input', () => {
        if (gEmail.classList.contains('is-invalid')) validateEmailField('email', 'emailError');
      });
    }

    if (gProduct) {
      gProduct.addEventListener('change', () => validateSelectField('productName', 'productNameError', 'a product name'));
    }

    if (gFirmness) {
      gFirmness.addEventListener('change', () => validateSelectField('firmness', 'firmnessError', 'product firmness'));
    }

    if (gDate) {
      gDate.addEventListener('change', () => validateDateField('purchaseDate', 'purchaseDateError', 'purchase date'));
    }

    if (gQty) {
      gQty.addEventListener('blur', () => validateQuantityField('quantity', 'quantityError'));
      gQty.addEventListener('input', () => {
        if (gQty.classList.contains('is-invalid')) validateQuantityField('quantity', 'quantityError');
      });
    }

    if (gDealer) {
      gDealer.addEventListener('blur', () => validateFieldText('dealerName', 'dealerNameError', 'Dealer name', 2));
      gDealer.addEventListener('input', () => {
        if (gDealer.classList.contains('is-invalid')) validateFieldText('dealerName', 'dealerNameError', 'Dealer name', 2);
      });
    }

    if (gState) {
      gState.addEventListener('change', () => validateSelectField('dealerState', 'dealerStateError', 'dealer state'));
    }

    if (gTerms) {
      gTerms.addEventListener('change', () => validateCheckboxField('terms', 'termsError', 'You must accept the terms and conditions to proceed'));
    }

    guaranteeForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const v1 = validateNameOnly('firstName', 'firstNameError', 'First name', true);
      const v2 = validateNameOnly('lastName', 'lastNameError', 'Last name', false);
      const v3 = validateMobileField('mobile', 'mobileError', 'mobileInputWrap');
      const v4 = validateEmailField('email', 'emailError');
      const v5 = validateSelectField('productName', 'productNameError', 'a product name');
      const v6 = validateSelectField('firmness', 'firmnessError', 'product firmness');
      const v7 = validateDateField('purchaseDate', 'purchaseDateError', 'purchase date');
      const v8 = validateQuantityField('quantity', 'quantityError');
      const v9 = validateFieldText('dealerName', 'dealerNameError', 'Dealer name', 2);
      const v10 = validateSelectField('dealerState', 'dealerStateError', 'dealer state');
      const v11 = validateCheckboxField('terms', 'termsError', 'You must accept the terms and conditions to proceed');

      if (v1 && v2 && v3 && v4 && v5 && v6 && v7 && v8 && v9 && v10 && v11) {
        const name = document.getElementById('firstName').value.trim();
        const mob = document.getElementById('mobile').value.trim();
        const prod = document.getElementById('productName').value;

        alert(`Registration Successful! 🎉\n\nThank you ${name}.\nYour guarantee for "${prod}" has been successfully submitted.\nMobile: +91 ${mob}\n\nA confirmation record has been generated for your Indofrench warranty.`);
        guaranteeForm.reset();

        if (billFileNameEl) {
          billFileNameEl.textContent = 'No file selected';
          billFileNameEl.style.display = 'none';
        }

        document.querySelectorAll('#guaranteeForm .is-valid').forEach(el => el.classList.remove('is-valid'));
      } else {
        const firstInvalid = guaranteeForm.querySelector('.is-invalid');
        if (firstInvalid) {
          firstInvalid.scrollIntoView({ behavior: 'smooth', block: 'center' });
          firstInvalid.focus();
        }
      }
    });
  }

  // 7. Dealer Registration Form Engine (#dealerForm)
  const dealerForm = document.getElementById('dealerForm');
  if (dealerForm) {
    const dFN = document.getElementById('firstName');
    const dLN = document.getElementById('lastName');
    const dPos = document.getElementById('position');
    const dMob = document.getElementById('mobile');
    const dEm = document.getElementById('email');
    const dComp = document.getElementById('companyName');
    const dAcc = document.getElementById('accountNumber');
    const dBank = document.getElementById('bankName');
    const dBranch = document.getElementById('branch');
    const dIFSC = document.getElementById('ifscCode');
    const dTerms = document.getElementById('terms');
    const chequeFileTag = document.getElementById('chequeFileName');

    if (dFN) {
      dFN.addEventListener('blur', () => validateNameOnly('firstName', 'firstNameError', 'First name', true));
      dFN.addEventListener('input', () => {
        if (dFN.classList.contains('is-invalid')) validateNameOnly('firstName', 'firstNameError', 'First name', true);
      });
    }

    if (dLN) {
      dLN.addEventListener('blur', () => validateNameOnly('lastName', 'lastNameError', 'Last name', true));
      dLN.addEventListener('input', () => {
        if (dLN.classList.contains('is-invalid')) validateNameOnly('lastName', 'lastNameError', 'Last name', true);
      });
    }

    if (dPos) {
      dPos.addEventListener('blur', () => validateFieldText('position', 'positionError', 'Position', 2));
      dPos.addEventListener('input', () => {
        if (dPos.classList.contains('is-invalid')) validateFieldText('position', 'positionError', 'Position', 2);
      });
    }

    if (dMob) {
      dMob.addEventListener('blur', () => validateMobileField('mobile', 'mobileError', 'dealerMobileWrap'));
      dMob.addEventListener('input', () => {
        if (dMob.classList.contains('is-invalid') || dMob.value.length === 10) {
          validateMobileField('mobile', 'mobileError', 'dealerMobileWrap');
        }
      });
    }

    if (dEm) {
      dEm.addEventListener('blur', () => validateEmailField('email', 'emailError'));
      dEm.addEventListener('input', () => {
        if (dEm.classList.contains('is-invalid')) validateEmailField('email', 'emailError');
      });
    }

    if (dComp) {
      dComp.addEventListener('blur', () => validateFieldText('companyName', 'companyNameError', 'Company name', 2));
      dComp.addEventListener('input', () => {
        if (dComp.classList.contains('is-invalid')) validateFieldText('companyName', 'companyNameError', 'Company name', 2);
      });
    }

    if (dAcc) {
      dAcc.addEventListener('blur', () => validateFieldText('accountNumber', 'accountNumberError', 'Account number', 6));
      dAcc.addEventListener('input', () => {
        if (dAcc.classList.contains('is-invalid')) validateFieldText('accountNumber', 'accountNumberError', 'Account number', 6);
      });
    }

    if (dBank) {
      dBank.addEventListener('change', () => validateSelectField('bankName', 'bankNameError', 'your bank'));
    }

    if (dBranch) {
      dBranch.addEventListener('blur', () => validateFieldText('branch', 'branchError', 'Branch name', 2));
      dBranch.addEventListener('input', () => {
        if (dBranch.classList.contains('is-invalid')) validateFieldText('branch', 'branchError', 'Branch name', 2);
      });
    }

    if (dIFSC) {
      dIFSC.addEventListener('blur', () => validateFieldText('ifscCode', 'ifscCodeError', 'IFSC Code', 11));
      dIFSC.addEventListener('input', () => {
        dIFSC.value = dIFSC.value.toUpperCase();
        if (dIFSC.classList.contains('is-invalid')) validateFieldText('ifscCode', 'ifscCodeError', 'IFSC Code', 11);
      });
    }

    if (dTerms) {
      dTerms.addEventListener('change', () => validateCheckboxField('terms', 'termsError', 'You must agree to dealer terms & conditions'));
    }

    dealerForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const v1 = validateNameOnly('firstName', 'firstNameError', 'First name', true);
      const v2 = validateNameOnly('lastName', 'lastNameError', 'Last name', true);
      const v3 = validateFieldText('position', 'positionError', 'Position', 2);
      const v4 = validateMobileField('mobile', 'mobileError', 'dealerMobileWrap');
      const v5 = validateEmailField('email', 'emailError');
      const v6 = validateFieldText('companyName', 'companyNameError', 'Company name', 2);
      const v7 = validateFieldText('accountNumber', 'accountNumberError', 'Account number', 6);
      const v8 = validateSelectField('bankName', 'bankNameError', 'your bank');
      const v9 = validateFieldText('branch', 'branchError', 'Branch name', 2);
      const v10 = validateFieldText('ifscCode', 'ifscCodeError', 'IFSC Code', 11);
      const v11 = validateCheckboxField('terms', 'termsError', 'You must agree to dealer terms & conditions');

      if (v1 && v2 && v3 && v4 && v5 && v6 && v7 && v8 && v9 && v10 && v11) {
        const name = document.getElementById('firstName').value.trim();
        const comp = document.getElementById('companyName').value.trim();
        const mob = document.getElementById('mobile').value.trim();

        alert(`Application Submitted Successfully! 🤝\n\nThank you ${name}.\nYour dealer onboarding application for "${comp}" has been logged.\nMobile: +91 ${mob}\n\nOur Indofrench Business Development Team will reach out to you within 24 hours.`);
        dealerForm.reset();

        if (chequeFileTag) {
          chequeFileTag.textContent = 'No file selected';
          chequeFileTag.style.display = 'none';
        }

        document.querySelectorAll('#dealerForm .is-valid').forEach(el => el.classList.remove('is-valid'));
      } else {
        const firstInvalid = dealerForm.querySelector('.is-invalid');
        if (firstInvalid) {
          firstInvalid.scrollIntoView({ behavior: 'smooth', block: 'center' });
          firstInvalid.focus();
        }
      }
    });
  }

  // 8. Contact & Enquiry Forms Validation Integrations (#contactEnquiryForm)
  const enquiryForm = document.getElementById('contactEnquiryForm');
  if (enquiryForm) {
    const cFN = document.getElementById('firstName');
    const cLN = document.getElementById('lastName');
    const cMob = document.getElementById('mobile');
    const cEm = document.getElementById('email');
    const cCity = document.getElementById('city');
    const cState = document.getElementById('state');
    const cProd = document.getElementById('chooseProduct');
    const cTerms = document.getElementById('terms');

    if (cFN) {
      cFN.addEventListener('blur', () => validateNameOnly('firstName', 'firstNameError', 'First name', true));
      cFN.addEventListener('input', () => { if (cFN.classList.contains('is-invalid')) validateNameOnly('firstName', 'firstNameError', 'First name', true); });
    }
    if (cLN) {
      cLN.addEventListener('blur', () => validateNameOnly('lastName', 'lastNameError', 'Last name', true));
      cLN.addEventListener('input', () => { if (cLN.classList.contains('is-invalid')) validateNameOnly('lastName', 'lastNameError', 'Last name', true); });
    }
    if (cMob) {
      cMob.addEventListener('blur', () => validateMobileField('mobile', 'mobileError', 'mobileInputGroup'));
      cMob.addEventListener('input', () => { if (cMob.classList.contains('is-invalid') || cMob.value.length === 10) validateMobileField('mobile', 'mobileError', 'mobileInputGroup'); });
    }
    if (cEm) {
      cEm.addEventListener('blur', () => validateEmailField('email', 'emailError'));
      cEm.addEventListener('input', () => { if (cEm.classList.contains('is-invalid')) validateEmailField('email', 'emailError'); });
    }
    if (cCity) {
      cCity.addEventListener('blur', () => validateFieldText('city', 'cityError', 'City name', 2));
      cCity.addEventListener('input', () => { if (cCity.classList.contains('is-invalid')) validateFieldText('city', 'cityError', 'City name', 2); });
    }
    if (cState) {
      cState.addEventListener('change', () => validateSelectField('state', 'stateError', 'your state'));
    }
    if (cProd) {
      cProd.addEventListener('change', () => validateSelectField('chooseProduct', 'chooseProductError', 'a product'));
    }
    if (cTerms) {
      cTerms.addEventListener('change', () => validateCheckboxField('terms', 'termsError', 'You must accept the terms and conditions'));
    }

    enquiryForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const v1 = validateNameOnly('firstName', 'firstNameError', 'First name', true);
      const v2 = validateNameOnly('lastName', 'lastNameError', 'Last name', true);
      const v3 = validateMobileField('mobile', 'mobileError', 'mobileInputGroup');
      const v4 = validateEmailField('email', 'emailError');
      const v5 = validateFieldText('city', 'cityError', 'City name', 2);
      const v6 = validateSelectField('state', 'stateError', 'your state');
      const v7 = validateSelectField('chooseProduct', 'chooseProductError', 'a product');
      const v8 = validateCheckboxField('terms', 'termsError', 'You must accept the terms and conditions');

      if (v1 && v2 && v3 && v4 && v5 && v6 && v7 && v8) {
        const name = document.getElementById('firstName').value.trim();
        const mob = document.getElementById('mobile').value.trim();
        const prod = document.getElementById('chooseProduct').value;
        alert(`Thank you, ${name}! 🎉\n\nYour enquiry for "${prod}" has been received.\nMobile: +91 ${mob}\n\nOur Indofrench sleep specialist will contact you within 24 hours.`);
        enquiryForm.reset();
        document.querySelectorAll('#contactEnquiryForm .is-valid').forEach(el => el.classList.remove('is-valid'));
      } else {
        const invalidEl = enquiryForm.querySelector('.is-invalid');
        if (invalidEl) {
          invalidEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
          invalidEl.focus();
        }
      }
    });
  }

  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const mobVal = document.getElementById('mobile') ? document.getElementById('mobile').value.trim() : '';
      if (!/^[6-9]\d{9}$/.test(mobVal)) {
        alert('Please enter a valid 10-digit mobile number starting with 6-9.');
        document.getElementById('mobile').focus();
        return;
      }
      alert('Thank you for reaching out! We will contact you shortly.');
      contactForm.reset();
    });
  }

  // 8. Warranty Form
  const warrantyForm = document.getElementById('warrantyRegistrationForm');
  if (warrantyForm) {
    warrantyForm.addEventListener('submit', (e) => {
      e.preventDefault();
      alert('Your 10-Year Piece-to-Piece Replacement Guarantee has been successfully registered! A confirmation has been logged.');
      closeModal('guaranteeModal');
      warrantyForm.reset();
    });
  }

  // 9. Odor Guide Alert
  window.showOdorTips = function() {
    alert('Care Tip for New Natural Latex Mattresses:\n\n1. Natural rubber latex has a pleasant, mild vanilla-rubber organic scent.\n2. Keep your bedroom well ventilated with open windows for 24 to 48 hours.\n3. The scent is completely non-toxic (zero petroleum VOCs) and dissipates naturally with use.');
  };

  // 10. Continuous Smooth Marquee Auto-Play Engine
  // Managed smoothly via hardware-accelerated CSS @keyframes tickerAutoScroll on #topbarTrack
  const marqueeTrack = document.getElementById('topbarTrack');
  if (marqueeTrack) {
    marqueeTrack.style.animationPlayState = 'running';
  }

  // 11. Hero 3-Slide Carousel Engine
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

  // 12. Gallery Lightbox Modal Viewer Engine
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
