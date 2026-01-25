document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('signup-form');
  const inputs = document.querySelectorAll('.form__input');

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

  // Input Event Listeners
  inputs.forEach((input) => {
    // Blur: Mark visited and update error text
    input.addEventListener('blur', () => {
      input.classList.add('visited');
      showError(input);
    });

    // Real-time validation
    input.addEventListener('input', () => {
      // Update error message text (CSS controls visibility based on .visited class)
      showError(input);
    });
  });

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
