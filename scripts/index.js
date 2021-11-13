const popupItem = document.querySelector('.popup');
const closeButton = popupItem.querySelector('.popup__close-button');
const openPopup = document.querySelector('.profile__edit-button');

const nameItem = document.querySelector('.profile__name');
const captionItem = document.querySelector('.profile__caption');

const formElement = document.querySelector('.popup__form')
const nameInput = formElement.querySelector('.popup__input_text_name')
const jobInput = formElement.querySelector('.popup__input_text_caption')

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


// открытие попапа для карточек

//открытие второго попапа
const popupAddItem = document.querySelector('.popup__type-photo');
const openPopupAdd = document.querySelector('.profile__add-button');

function openPopupAddHandler() {
  popupAddItem.classList.add('popup_opened');
}

openPopupAdd.addEventListener('click', openPopupAddHandler);

//закрытие второго попапа

const closeButtonAdd = popupAddItem.querySelector('.popup__close-button');

function closePopupAddHandler() {
  popupAddItem.classList.remove('popup_opened');
}

closeButtonAdd.addEventListener('click', closePopupAddHandler);


//добавление карточек

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

// ДОБАВЛЕНИЕ КАРТОЧЕК
//получаем элемент и доступ к его содержимому
const photoTemplate = document.querySelector('#pictures').content;
// клонируем
const userElement = photoTemplate.querySelector('.pictures__back').cloneNode(true);
// наполняем содержимым
userElement.querySelector('.pictures__item').src = initialCards.link;
userElement.querySelector('.pictures__title').textContent = initialCards.name;
//отображаем на странице
const usersOnline = document.querySelector('.users-online');

usersOnline.append(userElement);


