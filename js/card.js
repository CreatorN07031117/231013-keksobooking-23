const offerCardTemplate = document.querySelector('#card').content;
const TYPE_VARIANT = {
  'palace': 'Дворец',
  'flat': 'Квартира',
  'house': 'Дом',
  'bungalow': 'Бунгало',
  'hotel':'Номер в отеле'};

function renderingOfferCards (cards) {
  const offerCardsFragment = document.createDocumentFragment();
  cards.forEach((offer) => {
    const offerCard = offerCardTemplate.cloneNode(true);
    offerCard.querySelector('.popup__title').textContent = offer.title;
    offerCard.querySelector('.popup__text--address').textContent = offer.address;
    offerCard.querySelector('.popup__text--price').textContent = `${offer.price} ₽/ночь`;
    offerCard.querySelector('.popup__type').textContent = TYPE_VARIANT[offer.type];
    offerCard.querySelector('.popup__text--capacity').textContent = `${offer.rooms} комнаты для ${offer.guests} гостей`;
    offerCard.querySelector('.popup__text--time').textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`;
    const classModifiers = offer.features.map((feature) => `popup__feature--${feature}`);
    offerCard.querySelectorAll('.popup__feature').forEach((featureItem) => {
      const modifierItem = featureItem.classList[1];
      if (!classModifiers.includes(modifierItem)) {
        featureItem.remove();
      }
    });
    offerCard.querySelector('.popup__description').textContent = offer.description;
    offerCard.querySelector('.popup__photos').removeChild(offerCard.querySelector('.popup__photo'));
    for (let index=0; index < offer.photos.length; index++) {
      const photo = offerCardTemplate.querySelector('.popup__photo').cloneNode(true);
      photo.src = offer.photos[index];
      offerCard.querySelector('.popup__photos').appendChild(photo);
    }
    offerCard.querySelector('.popup__avatar').src = offer.author.avatar;
    offerCardsFragment.appendChild(offerCard);
  });
  return offerCardsFragment;
}

export {renderingOfferCards};
