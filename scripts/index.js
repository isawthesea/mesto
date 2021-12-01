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
  [nameInput, jobInput].forEach((inputElement) => {
    hideInputError(profileEditForm, inputElement, validationConfig);
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
function handleFormSubmit(evt) {
  // Отменяем поведение по умолчанию
  evt.preventDefault();

  // Вставляем значения из полей формы на страницу в блок профиля
  nameItem.textContent = nameInput.value;
  captionItem.textContent = jobInput.value;

  closePopup(popupItem);
  profileEditForm.reset();
  toggleButtonState(profileEditForm, validationConfig);
}

profileEditForm.addEventListener('submit', handleFormSubmit);


// открытие попапа для карточек
const picturesList = document.querySelector('.pictures__list');
const cardTemplate = document.querySelector('#pictures').content;

const addCardForm = document.querySelector('.popup__form_type-add');
const addCardSubmitBtn = addCardForm.querySelector('.popup__button');
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


const createPicturesDomNode = (item) => {
  // Заполняем шаблон и навешиваем обработчики событий
  const backTemplate = cardTemplate.querySelector('.pictures__back').cloneNode(true);
  const pictureImg = backTemplate.querySelector('.pictures__item');
  const pictureLikeBtn = backTemplate.querySelector('.pictures__like');
  const pictureDeleteBtn = backTemplate.querySelector('.pictures__trash')

  pictureImg.src = item.link;
  pictureImg.alt = item.name;
  backTemplate.querySelector('.pictures__title').textContent = item.name;

  pictureLikeBtn.addEventListener('click', pictureLikeDislikeHandler);
  pictureImg.addEventListener('click', pictureZoomHandler);

  pictureDeleteBtn.addEventListener('click', () => {
    backTemplate.remove();
  });

  return backTemplate;
}

const pictureLikeDislikeHandler = (evt) => {
  // evt.target - элемент, на котором произошло событие
  evt.target.classList.toggle('pictures__like-active');
}

const pictureZoomHandler = (evt) => {
  const pictureCaption = document.querySelector('.popup__caption');
  const pictureZoomPopupImg = pictureZoomPopup.querySelector('.popup__picture');

  // Заполняем данные для большого попапа из маленькой карточки,
  // которая приходит в evt.target
  pictureZoomPopupImg.src = evt.target.src;
  pictureZoomPopupImg.alt = evt.target.alt;
  pictureCaption.textContent = evt.target.alt;

  // показать попап
  openPopup(pictureZoomPopup);
}


const renderCard = (item) => {
  // заполняем шаблон - name и link
  const picture = createPicturesDomNode(item);

  // вставляем шаблон в верстку
  picturesList.prepend(picture);
}


function closePopupZoomHandler() {
  closePopup(pictureZoomPopup);
}

const closeButtonZoom = document.querySelector('.popup__close-button_zoom-picture');
closeButtonZoom.addEventListener('click', closePopupZoomHandler);


// перебор массива
initialCards.reverse().forEach((item) => {
  renderCard(item);
});

// обрабатываем сабмит
const handleSubmitAddCard = (evt) => {
  evt.preventDefault();

  // данные из формы вставить в шаблон
  const item = {
    name: addCardFormName.value,
    link: addCardFormLink.value
  };
  renderCard(item);

  closePopup(addCardPopup);
  addCardForm.reset();
  toggleButtonState(addCardForm, validationConfig);
};

addCardForm.addEventListener('submit', handleSubmitAddCard);
