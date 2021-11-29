const hideInputError = (formElement, inputElement) => {
  // Находим блок, в котором отображается ошибка.
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove('popup__input_type-error');
  errorElement.classList.remove('popup__input-error');
  //удаляем текст ошибки
  errorElement.textContent = '';
};

const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.add('popup__input_type-error');
  //записываем текст ошибки в блок отображения ошибки
  errorElement.textContent = errorMessage;
  errorElement.classList.add('popup__input-error');
};

const checkInputValidity = (formElement, inputElement) => {
  if (inputElement.validity.valid) {
    hideInputError(formElement, inputElement)
  } else {
    showInputError(formElement, inputElement, inputElement.validationMessage)
  }
}

const toggleButtonState = (formElement, buttonElement) => {
  // Проверяем валидность формы
  const isFormValid = formElement.checkValidity();
  // Если форма невалидна, то присваиваем свойству disabled кнопки значение true
  buttonElement.classList.toggle('popup__button_disabled', !isFormValid) //false
  buttonElement.disabled = !isFormValid; //true
}

const setEventListeners = () => {
  // находим все поля ввода
  const formElement = document.querySelector('.popup__form_type-add');
  formElement.addEventListener('submit', (evt) => {evt.preventDefault()});
  const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
  // находим кнопку отправки формы
  const buttonElement = formElement.querySelector('.popup__button');
  toggleButtonState(formElement, buttonElement);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
          checkInputValidity(formElement, inputElement);
          toggleButtonState(formElement, buttonElement);
      });
  });
}
setEventListeners();

