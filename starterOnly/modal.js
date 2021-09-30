/**
 * Project GameOn
 * https://github.com/yanntouil/YannTouil_4_27092021
 */





/**
 * Dom ref
 */
const modal = document.getElementById("modal");
const openModal = document.querySelectorAll(".openModal");
const closeModal = document.querySelectorAll(".closeModal");
const toggleMenu = document.querySelectorAll(".toggleMenu");
const form = document.forms["reserve"];
const modalThanks = document.getElementById("booking-thanks");


/**
 * Open Modal listener
 */
openModal.forEach(
  (el) => el.addEventListener("click", 
    (e) => {
      document.body.classList.add('modal-open');
      window.scrollTo(0, 0);
      modal.scrollTo(0, 0);
      document.body.style.overflow = 'hidden';
    }
));
/**
 * Close Modal listener
 */
closeModal.forEach(
  (el) => el.addEventListener("click", 
    (e) => {
      document.body.classList.remove('modal-open');
      document.body.style.overflow = '';
      showModalForm();
    }
));
/**
 * Toggle menu
 */
toggleMenu.forEach(
  (el) => el.addEventListener("click", 
    (e) => {
      document.body.classList.toggle('menu-open');
    }
));

/**
 * Data validation
 */
form.addEventListener("submit", 
  (e) => {
    e.preventDefault();
    let formErrors = 0;
  
    // Field firstname must have a minimum 2 characters and can not be empty
    const firstName = form.querySelectorAll('input[name="first"]')[0];
    const nameRegex = /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]{2,}$/;// european convention 
    if (!firstName.value.match(nameRegex)) {//
      showFieldError(firstName);
      formErrors++;
    } else {
      hideFieldError(firstName);
    }
  
    // Field lastname must have a minimum 2 characters and can not be empty
    const lastName = form.querySelectorAll('input[name="last"]')[0];
    if (!lastName.value.match(nameRegex)) {
      showFieldError(lastName);
      formErrors++;
    } else {
      hideFieldError(lastName);
    }
    
    // Field email must be a valid email
    const email = form.querySelectorAll('input[name="email"]')[0];
    const mailRegex = /^([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22))*\x40([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d))*$/;// RFC2822
    if (!email.value.match(mailRegex)) {
      showFieldError(email);
      formErrors++;
    } else {
      hideFieldError(email);
    }
  
    // Field birthdate must be a valid yyyy-mm-dd
    /*const birthdate = form.querySelectorAll('input[name="birthdate"]')[0];
    const dateRegex = /^(\d{4})(-)(((0)[0-9])|((1)[0-2]))(-)([0-2][0-9]|(3)[0-1])$/;// yyyy-mm-dd
    if (!birthdate.value.match(dateRegex)) {
      // Age validation
      //const birthdateDate = new Date(birthdate.value.replace(/-/g, "/"));
      //const currentDate = new Date().toJSON().slice(0,10)+' 01:00:00';
      //const ageYear = ~~((Date.now(currentDate) - birthdateDate) / (31557600000));
      //if (ageYear > 1) {}
      showFieldError(birthdate);
      formErrors++;
    } else {
      hideFieldError(birthdate);
    }*/

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
    }

    // Do something with data
    form.reset();// Reset form data
    showModalThanks();
    return false;

});

/**
 * Show field error
 * @param {HTMLElement} el
 */
function showFieldError(el) {
  el.closest('.form-group').dataset.errorVisible = 'true';
}

/**
 * Hide field error
 * @param {HTMLElement} el
 */
 function hideFieldError(el) {
  el.closest('.form-group').dataset.errorVisible = null;
}

/**
 * Show Modal thanks
 */
function showModalThanks() {
  form.style.display = 'none';
  modalThanks.style.display = '';
}

/**
 * Show Modal form
 */
function showModalForm() {
  modalThanks.style.display = 'none';
  form.style.display = '';
}
