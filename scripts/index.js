import Card from './Card.js';
import { pictureZoomPopup, openPopup, closePopup } from './Popup.js';
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

const addCardForm = document.querySelector('.popup__form_type-add');
const addCardFormName = addCardForm.querySelector('.popup__input_text_photo-name');
const addCardFormLink = addCardForm.querySelector('.popup__input_text_photo-caption');

const validationConfig = {
  inputSelector: '.popup__input',
  buttonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputElementClass: 'popup__input_type-error',
  errorElementClass: 'popup__input-error'
}

const profileEditValidator = new FormValidator(validationConfig, profileEditForm);
profileEditValidator.enableValidation();

const addCardValidator = new FormValidator(validationConfig, addCardForm);
addCardValidator.enableValidation();

// Обработчик события открытия попапа редактирования профиля
function openPopupHandler() {
  // Убираем информацию об ошибках
  [nameInput, jobInput].forEach((inputElement) => {
    profileEditValidator.hideInputError(inputElement);
  });

  // Предзаполняем данные
  nameInput.value = nameItem.textContent;
  jobInput.value = captionItem.textContent;

  profileEditValidator.enableSubmitButton();
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

  profileEditValidator.disableSubmitButton();
}

profileEditForm.addEventListener('submit', handleFormSubmit);


// открытие попапа для карточек
const picturesList = document.querySelector('.pictures__list');

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

  addCardValidator.disableSubmitButton();
};

addCardForm.addEventListener('submit', handleSubmitAddCard);
