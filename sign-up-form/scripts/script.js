document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('signup-form');
  const inputs = document.querySelectorAll('.form__input');
  const passwordInput = document.getElementById('password');
  const confirmPasswordInput = document.getElementById('confirm_password');

  // Helper to show error message
  function showError(input) {
    const errorSpan = input.parentElement.querySelector('.error-message');
    if (errorSpan) {
      // Check for specific validity states to show helpful custom messages
      if (input.validity.patternMismatch) {
        if (input.id === 'password') {
          errorSpan.textContent = 'Must contain at least 8 characters, one uppercase, one lowercase, and one number.';
        } else if (input.id === 'phone') {
          errorSpan.textContent = 'Please enter a valid phone number (e.g. 123-456-7890).';
        } else if (input.id === 'first_name' || input.id === 'last_name') {
          errorSpan.textContent = 'Please use letters only.';
        } else {
          errorSpan.textContent = input.validationMessage;
        }
      } else if (input.validity.valueMissing) {
        errorSpan.textContent = 'This field is required.';
      } else if (input.validity.tooShort) {
        errorSpan.textContent = `Must be at least ${input.minLength} characters.`;
      } else {
        // Fallback to native validationMessage
        errorSpan.textContent = input.validationMessage;
      }
    }
  }

  // Password matching validation
  function checkPasswords() {
    if (passwordInput.value !== confirmPasswordInput.value) {
      confirmPasswordInput.setCustomValidity('Passwords do not match');
    } else {
      confirmPasswordInput.setCustomValidity('');
    }
  }

  // Password Complexity Hints
  const requirementList = {
    length: (val) => val.length >= 8,
    upper: (val) => /[A-Z]/.test(val),
    lower: (val) => /[a-z]/.test(val),
    number: (val) => /\d/.test(val)
  };

  const hintItems = document.querySelectorAll('.password-hints li');

  function updateHints() {
    const val = passwordInput.value;
    hintItems.forEach((item) => {
      const requirement = item.dataset.requirement;
      const isValid = requirementList[requirement](val);
      if (isValid) {
        item.classList.add('valid');
        item.classList.remove('invalid');
      } else {
        item.classList.add('invalid');
        item.classList.remove('valid');
      }
    });
  }

  // Input Event Listeners
  inputs.forEach((input) => {
    // Blur: Mark visited and update error text
    input.addEventListener('blur', () => {
      input.classList.add('visited');
      showError(input);
    });

    // Real-time validation
    input.addEventListener('input', () => {
      // Special check for password fields
      if (input === passwordInput || input === confirmPasswordInput) {
        checkPasswords();
      }
      // Update error message text (CSS controls visibility based on .visited class)
      showError(input);
    });
  });

  passwordInput.addEventListener('input', updateHints);

  // Form Submit Handler
  form.addEventListener('submit', (event) => {
    if (!form.checkValidity()) {
      event.preventDefault(); // Stop submission

      // Mark all as visited to show errors immediately
      inputs.forEach((input) => {
        input.classList.add('visited');
        showError(input);
      });
    }
  });
});
