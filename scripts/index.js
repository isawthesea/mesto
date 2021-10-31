const popupItem = document.querySelector('.popup');
const closeButton = popupItem.querySelector('.popup__close-button');
const openPopup = document.querySelector('.profile__edit-button');

openPopup.addEventListener('click', function() {
  popupItem.classList.add('popup_opened');
})

closeButton.addEventListener('click', function() {
  popupItem.classList.remove('popup_opened');
})


// Находим форму в DOM
let formElement = document.querySelector('.popup__form')
// Находим поля формы в DOM
let nameInput = formElement.querySelector('.form__text_type_name')
let jobInput = formElement.querySelector('.form__text_type_caption')

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function formSubmitHandler (evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
                                              // Так мы можем определить свою логику отправки.
                                              // О том, как это делать, расскажем позже.


  const nameItem = document.querySelector('.profile__name');
  const captionItem = document.querySelector('.profile__caption');
  // Вставьте новые значения с помощью textContent
  nameItem.textContent = nameInput.value;
  captionItem.textContent = jobInput.value;

  popupItem.classList.remove('popup_opened');
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', formSubmitHandler);
