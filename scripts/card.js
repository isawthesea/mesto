class Card {
  constructor(name, link, cardSelector) {
    this._name = name;
    this._link = link;
    this._cardSelector = cardSelector;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content
      .querySelector('.pictures__back')
      .cloneNode(true);

    return cardElement;
  }

  _renderTemplate() {
    this._element = this._getTemplate();
    this._pictureImg = this._element.querySelector('.pictures__item');
    this._pictureLikeBtn = this._element.querySelector('.pictures__like');
    this._pictureDeleteBtn = this._element.querySelector('.pictures__trash')

    this._pictureImg.src = this._link;
    this._pictureImg.alt = this._name;
    this._element.querySelector('.pictures__title').textContent = this._name;
  }

  _likeDislikeHandler(evt) {
    evt.target.classList.toggle('pictures__like-active');
  }

  _zoomHandler(evt) {
    const pictureCaption = document.querySelector('.popup__caption');
    const pictureZoomPopupImg = pictureZoomPopup.querySelector('.popup__picture');

    pictureZoomPopupImg.src = evt.target.src;
    pictureZoomPopupImg.alt = evt.target.alt;
    pictureCaption.textContent = evt.target.alt;

    openPopup(pictureZoomPopup);
  }

  _setEvents() {
    this._pictureLikeBtn.addEventListener('click', this._likeDislikeHandler);
    this._pictureImg.addEventListener('click', this._zoomHandler);

    this._pictureDeleteBtn.addEventListener('click', () => {
      this._element.remove();
      this._element = null;
    });
  }

  render() {
    this._renderTemplate();
    this._setEvents();

    return this._element;
  }

}

export default Card;
