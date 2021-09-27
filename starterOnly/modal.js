function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// launch modal form
function launchModal() {
  modalbg.style.display = "block";
  showModalForm();// Reset form display
}

/**
 * Close Modal listener
 */
 document.querySelectorAll(".modal-close").forEach(
  (el) => el.addEventListener("click", 
    (e) => modalbg.style.display = ''
));

/**
 * Form data validation
 */
function validate() {
  const form = document.forms["reserve"];
  let formErrors = 0;
  // Field firstname must have a minimum 2 characters and can not be empty
  const firstName = form.querySelectorAll('input[name="first"]')[0];
  if (firstName.value.length <= 1) {
    showFieldError(firstName);
    formErrors++;
  } else {
    hideFieldError(firstName);
  }
  // Field lastname must have a minimum 2 characters and can not be empty
  const lastName = form.querySelectorAll('input[name="last"]')[0];
  if (lastName.value.length <= 1) {
    showFieldError(lastName);
    formErrors++;
  } else {
    hideFieldError(lastName);
  }
  // Field email must be a valid email
  const email = form.querySelectorAll('input[name="email"]')[0];
  const mailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (!email.value.match(mailRegex)) {
    showFieldError(email);
    formErrors++;
  } else {
    hideFieldError(email);
  }
  // Field quantity must be not empty, numeric and integer
  const quantity = form.querySelectorAll('input[name="quantity"]')[0];
  if (!(quantity.value != '' && !isNaN(quantity.value) && Number.isInteger(Number(quantity.value)))) {
    showFieldError(quantity);
    formErrors++;
  } else {
    hideFieldError(quantity);
  }
  // One of fields location must be selected
  const radioList = form.querySelectorAll('input[name="location"]');
  let radioValue;
  radioList.forEach((el) => {
      if (el.checked) radioValue = el.value;
    }
  );
  if (!radioValue) {
    showFieldError(radioList[0]);
    formErrors++;
  } else {
    hideFieldError(radioList[0]);
  }
  // Field terms must be checked
  const terms = form.querySelectorAll('input[name="terms"]')[0];
  if (!terms.checked) {
    showFieldError(terms);
    formErrors++;
  } else {
    hideFieldError(terms);
  }
  // Check validation errors
  if (formErrors > 0) {
    return false;
  } else {
    // Do something with data
    form.reset();// Reset form data
    showModalThanks();
  }
  return false;
}
/**
 * Show field error
 * @param {HTMLElement} el
 */
function showFieldError(el) {
  el.closest('.formData').dataset.errorVisible = 'true';
}
/**
 * Hide field error
 * @param el
 */
function hideFieldError(el) {
  el.closest('.formData').dataset.errorVisible = null;
}
/**
 * Show Modal thanks
 */
function showModalThanks() {
  document.forms["reserve"].style.display = 'none';
  document.getElementById("booking-thanks").style.display = '';
}
/**
 * Show Modal form
 */
function showModalForm() {
  document.getElementById("booking-thanks").style.display = 'none';
  document.forms["reserve"].style.display = '';
}
