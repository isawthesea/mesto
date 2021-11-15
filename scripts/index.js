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
const picturesList = document.querySelector('.pictures__list');
const cardTemplate = document.querySelector('#pictures').content;

const addCardForm = document.querySelector('.popup__type-photo');
const addCardSubmitBtn = addCardForm.querySelector('.popup__button');
const addCardFormName = addCardForm.querySelector('.popup__input_text_photo-name');
const addCardFormLink = addCardForm.querySelector('.popup__input_text_photo-caption');

const pictureZoomPopup = document.querySelector('.popup_zoom-picture');

//открытие второго попапа
const openPopupAdd = document.querySelector('.profile__add-button');

const addCardFormClean = () => {
  addCardFormName.value = '';
  addCardFormLink.value = '';
}

function openPopupAddHandler() {
  addCardFormClean();
  addCardForm.classList.add('popup_opened');
}

openPopupAdd.addEventListener('click', openPopupAddHandler);

//закрытие второго попапа

const closeButtonAdd = addCardForm.querySelector('.popup__close-button');

function closePopupAddHandler() {
  addCardForm.classList.remove('popup_opened');
  addCardFormClean();
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
  const backTemplate = cardTemplate.querySelector('.pictures__back').cloneNode(true);
  backTemplate.querySelector('.pictures__item').src = item.link;
  backTemplate.querySelector('.pictures__item').alt = item.name;
  backTemplate.querySelector('.pictures__title').textContent = item.name;

  const pictureDeleteBtn = backTemplate.querySelector('.pictures__trash')
  pictureDeleteBtn.addEventListener('click', () => {
  backTemplate.remove();
  });

  return backTemplate;
}



const fillAndApply = (item) => {
  // заполняем шаблон - name и link
  const picture = createPicturesDomNode(item);
  const pictureLikeBtn = picture.querySelector('.pictures__like');
  const pictureImg = picture.querySelector('.pictures__item');

  const pictureLikeDislikeHandler = () => {
    pictureLikeBtn.classList.toggle('pictures__like-active');
  }
  pictureLikeBtn.addEventListener('click', pictureLikeDislikeHandler);

  const pictureZoomHandler = () => {
    // вставить ее в картинку в попапе
    const pictureZoomPopupImg = pictureZoomPopup.querySelector('.popup__picture');
    pictureZoomPopupImg.src = pictureImg.src;

    // показать попап (добавить ему класс)
    pictureZoomPopup.classList.add('popup_opened');
  }
  pictureImg.addEventListener('click', pictureZoomHandler);

  // вставляем шаблон в верстку
  picturesList.prepend(picture);
}


function closePopupZoomHandler() {
  pictureZoomPopup.classList.remove('popup_opened');
}

const closeButtonZoom = document.querySelector('.popup__close-button_zoom-picture');
closeButtonZoom.addEventListener('click', closePopupZoomHandler);


// перебор массива
initialCards.forEach((item) => {
  fillAndApply(item);
});

// обрабатываем сабмит


const addCardSubmitHandler = (evt) => {
  evt.preventDefault();

  // данные из формы вставить в шаблон
  const item = {
    name: addCardFormName.value,
    link: addCardFormLink.value
  };
  fillAndApply(item);

  closePopupAddHandler();
};

addCardForm.addEventListener('submit', addCardSubmitHandler);
