const pictureZoomPopup = document.querySelector('.popup_zoom-picture');
const pictureCaption = pictureZoomPopup.querySelector('.popup__caption');
const pictureZoomPopupImg = pictureZoomPopup.querySelector('.popup__picture');

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

export { pictureZoomPopup, pictureCaption, pictureZoomPopupImg, openPopup, closePopup };
