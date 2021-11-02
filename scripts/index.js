const popupItem = document.querySelector('.popup');
const closeButton = popupItem.querySelector('.popup__close-button');
const openPopup = document.querySelector('.profile__edit-button');

const nameItem = document.querySelector('.profile__name');
const captionItem = document.querySelector('.profile__caption');

const formElement = document.querySelector('.popup__form')
const nameInput = formElement.querySelector('.popup__input_text-name')
const jobInput = formElement.querySelector('.popup__input_text-caption')

function openPopupHandler() {
  nameInput.value = nameItem.textContent;
  jobInput.value = captionItem.textContent;
  popupItem.classList.add('popup_opened');
}

function closePopupHandler() {
  popupItem.classList.remove('popup_opened');
}

openPopup.addEventListener('click', openPopupHandler);
closeButton.addEventListener('click', closePopupHandler);

function formSubmitHandler(evt) {
  evt.preventDefault();

  nameItem.textContent = nameInput.value;
  captionItem.textContent = jobInput.value;

  closePopupHandler();
}

formElement.addEventListener('submit', formSubmitHandler);
