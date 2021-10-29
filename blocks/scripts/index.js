const popupItem = document.querySelector('.popup');
const closeButton = popupItem.querySelector('.popup__close-button');
const openPopup = document.querySelector('.profile__edit-button');

openPopup.addEventListener('click', () => {
  popupItem.classList.remove('hidden');
})

closeButton.addEventListener('click', () => {
  popupItem.classList.add('hidden');
})
