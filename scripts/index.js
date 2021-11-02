const popupItem = document.querySelector('.popup');
const closeButton = popupItem.querySelector('.popup__close-button');
const openPopup = document.querySelector('.profile__edit-button');

const nameItem = document.querySelector('.profile__name');
const captionItem = document.querySelector('.profile__caption');

const formElement = document.querySelector('.popup__form')
const nameInput = formElement.querySelector('.popup__form-text-type-name')
const jobInput = formElement.querySelector('.popup__form-text-type-caption')

openPopup.addEventListener('click', function() {
  nameInput.value = nameItem.textContent;
  jobInput.value = captionItem.textContent;
  popupItem.classList.add('popup_opened');
})

closeButton.addEventListener('click', function() {
  popupItem.classList.remove('popup_opened');
})

function formSubmitHandler (evt) {
  evt.preventDefault();

  nameItem.textContent = nameInput.value;
  captionItem.textContent = jobInput.value;

  popupItem.classList.remove('popup_opened');
}

formElement.addEventListener('submit', formSubmitHandler);
