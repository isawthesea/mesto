const hideInputError = (formElement, inputElement, config) => {
  // Находим блок, в котором отображается ошибка.
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove(config.inputElementClass);
  errorElement.classList.remove(config.errorElementClass);
  //удаляем текст ошибки
  errorElement.textContent = '';
};

const showInputError = (formElement, inputElement, errorMessage, config) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.add(config.inputElementClass);
  //записываем текст ошибки в блок отображения ошибки
  errorElement.textContent = errorMessage;
  errorElement.classList.add(config.errorElementClass);
};

const checkInputValidity = (formElement, inputElement, config) => {
  if (inputElement.validity.valid) {
    hideInputError(formElement, inputElement, config)
  } else {
    showInputError(formElement, inputElement, inputElement.validationMessage, config)
  }
}

const toggleButtonState = (formElement, config) => {
  // Проверяем валидность формы
  const isFormValid = formElement.checkValidity();
  // Если форма невалидна, то присваиваем свойству disabled кнопки значение true
  const buttonElement = formElement.querySelector(config.buttonSelector);
  buttonElement.classList.toggle(config.inactiveButtonClass, !isFormValid) //false
  buttonElement.disabled = !isFormValid; //true
}

const enableValidation = (config) => {
  // находим все поля ввода
  const formElements = document.querySelectorAll(config.formSelector);
  formElements.forEach(function(formElement) {
    formElement.addEventListener('submit', (evt) => {evt.preventDefault()});
    const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
    // находим кнопку отправки формы
    toggleButtonState(formElement, config);
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
            checkInputValidity(formElement, inputElement, config);
            toggleButtonState(formElement, config);
        });
    });
  });
}

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  buttonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputElementClass: 'popup__input_type-error',
  errorElementClass: 'popup__input-error'
}

enableValidation(validationConfig);
