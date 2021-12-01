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

const toggleButtonState = (formElement, buttonElement, config) => {
  // Проверяем валидность формы
  const isFormValid = formElement.checkValidity();
  // Если форма невалидна, то присваиваем свойству disabled кнопки значение true
  buttonElement.classList.toggle(config.inactiveButtonClass, !isFormValid) //false
  buttonElement.disabled = !isFormValid; //true
}

const enableValidation = (config) => {
  // находим все поля ввода
  const formElement = document.querySelector(config.formSelector);
  formElement.addEventListener('submit', (evt) => {evt.preventDefault()});
  const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
  // находим кнопку отправки формы
  const buttonElement = formElement.querySelector(config.buttonSelector);
  toggleButtonState(formElement, buttonElement, config);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
          checkInputValidity(formElement, inputElement, config);
          toggleButtonState(formElement, buttonElement, config);
      });
  });
}
