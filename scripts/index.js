import Card from './Card.js'
import FormValidator from './FormValidator.js'
import initialCards from './InitialCards.js';

const popupItem = document.querySelector('.popup');
const closeButton = popupItem.querySelector('.popup__close-button');
const profileEditPopup = document.querySelector('.profile__edit-button');

const addCardPopup = document.querySelector('.popup_type-photo');

const nameItem = document.querySelector('.profile__name');
const captionItem = document.querySelector('.profile__caption');

const profileEditForm = document.querySelector('.popup__form_type-edit')
const nameInput = profileEditForm.querySelector('.popup__input_text_name')
const jobInput = profileEditForm.querySelector('.popup__input_text_caption')

function openPopup(popup) {
  popup.addEventListener('mousedown', clickOverlay);
  document.addEventListener('keydown', clickEsc);
  popup.classList.add('popup_opened');
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', clickEsc);
  popup.removeEventListener('mousedown', clickOverlay);
}

function clickOverlay(evt) {
  if (evt.target.classList.contains('popup_opened')) {
    closeOpenedPopup();
  }
}

function closeOpenedPopup() {
  const openedPopup = document.querySelector('.popup_opened');
  closePopup(openedPopup);
}

function clickEsc(evt) {
  if (evt.key == 'Escape') {
    closeOpenedPopup();
  }
}

// Обработчик события открытия попапа редактирования профиля
function openPopupHandler() {
  // Убираем информацию об ошибках
  const validator = new FormValidator(validationConfig, profileEditForm);

  [nameInput, jobInput].forEach((inputElement) => {
    validator.hideInputError(inputElement);
  });

  // Предзаполняем данные
  nameInput.value = nameItem.textContent;
  jobInput.value = captionItem.textContent;
  openPopup(popupItem);
}

function closePopupHandler() {
  closePopup(popupItem);
}

// Навешиваем обработчики событий
profileEditPopup.addEventListener('click', openPopupHandler);
closeButton.addEventListener('click', closePopupHandler);

// Обработчик события сабмита формы редактирования профиля
function handleFormSubmit() {
  // Вставляем значения из полей формы на страницу в блок профиля
  nameItem.textContent = nameInput.value;
  captionItem.textContent = jobInput.value;

  closePopup(popupItem);
  profileEditForm.reset();

  const validator = new FormValidator(validationConfig, profileEditForm);
  validator.toggleButtonState();
}

profileEditForm.addEventListener('submit', handleFormSubmit);


// открытие попапа для карточек
const picturesList = document.querySelector('.pictures__list');

const addCardForm = document.querySelector('.popup__form_type-add');
const addCardFormName = addCardForm.querySelector('.popup__input_text_photo-name');
const addCardFormLink = addCardForm.querySelector('.popup__input_text_photo-caption');

const pictureZoomPopup = document.querySelector('.popup_zoom-picture');

//открытие второго попапа
const openPopupAdd = document.querySelector('.profile__add-button');

function openPopupAddHandler() {
  openPopup(addCardPopup);
}

openPopupAdd.addEventListener('click', openPopupAddHandler);

//закрытие второго попапа

const closeButtonAdd = addCardForm.querySelector('.popup__close-button');

function closePopupAddHandler() {
  closePopup(addCardPopup);
}

closeButtonAdd.addEventListener('click', closePopupAddHandler);


const renderCard = (item) => {
  const card = new Card(item.name, item.link, '#pictures');
  return card.render();
}

const insertCard = (card) => {
  // вставляем шаблон в верстку
  picturesList.prepend(card);
}

function closePopupZoomHandler() {
  closePopup(pictureZoomPopup);
}

const closeButtonZoom = document.querySelector('.popup__close-button_zoom-picture');
closeButtonZoom.addEventListener('click', closePopupZoomHandler);


// перебор массива
initialCards.reverse().forEach((item) => {
  const card = renderCard(item);
  insertCard(card);
});

// обрабатываем сабмит
const handleSubmitAddCard = () => {
  // данные из формы вставить в шаблон
  const item = {
    name: addCardFormName.value,
    link: addCardFormLink.value
  };
  const card = renderCard(item);
  insertCard(card);

  closePopup(addCardPopup);
  addCardForm.reset();

  const validator = new FormValidator(validationConfig, addCardForm);
  validator.toggleButtonState();
};

addCardForm.addEventListener('submit', handleSubmitAddCard);

const enableValidation = (formElement, config) => {
  const validator = new FormValidator(config, formElement);
  validator.enableValidation();
}

const validationConfig = {
  inputSelector: '.popup__input',
  buttonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputElementClass: 'popup__input_type-error',
  errorElementClass: 'popup__input-error'
}

enableValidation(addCardForm, validationConfig);
enableValidation(profileEditForm, validationConfig);
