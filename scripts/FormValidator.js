class FormValidator {
  constructor(config, formElement) {
    this._config = config;
    this._formElement = formElement;
  }

  enableValidation() {
    // находим все поля ввода
    this._formElement.addEventListener('submit', (evt) => {evt.preventDefault()});
    const inputList = Array.from(this._formElement.querySelectorAll(this._config.inputSelector));
    // находим кнопку отправки формы
    this._toggleButtonState();
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
            this._checkInputValidity(inputElement);
            this._toggleButtonState();
        });
    });
  }

  _toggleButtonState() {
    const isFormValid = this._formElement.checkValidity();
    // Если форма невалидна, то присваиваем свойству disabled кнопки значение true
    const buttonElement = this._formElement.querySelector(this._config.buttonSelector);
    buttonElement.classList.toggle(this._config.inactiveButtonClass, !isFormValid) //false
    buttonElement.disabled = !isFormValid; //true
  }

  _checkInputValidity(inputElement) {
    if (inputElement.validity.valid) {
      this._hideInputError(inputElement);
    } else {
      this._showInputError(inputElement, inputElement.validationMessage);
    }
  }

  _hideInputError(inputElement) {
    const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(this._config.inputElementClass);
    errorElement.classList.remove(this._config.errorElementClass);
    //удаляем текст ошибки
    errorElement.textContent = '';
  }

  _showInputError(inputElement, errorMessage) {
    const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(this._config.inputElementClass);
    //записываем текст ошибки в блок отображения ошибки
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._config.errorElementClass);
  }

}

export default FormValidator;
