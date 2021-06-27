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
    if (offer.title === ''|| offer.title === undefined ) {
      offerCard.querySelector('.popup__title').classList.add('hidden');
    }

    offerCard.querySelector('.popup__text--address').textContent = offer.address;
    if (offer.address === ''|| offer.address === undefined ) {
      offerCard.querySelector('.popup__text--address').classList.add('hidden');
    }

    offerCard.querySelector('.popup__text--price').textContent = `${offer.price} ₽/ночь`;
    if (offer.price === ''|| offer.price === undefined ) {
      offerCard.querySelector('.popup__text--price').classList.add('hidden');
    }

    offerCard.querySelector('.popup__type').textContent = TYPE_VARIANT[offer.type];
    if (offer.type === ''|| offer.type === undefined ) {
      offerCard.querySelector('.popup__type').classList.add('hidden');
    }

    offerCard.querySelector('.popup__text--capacity').textContent = `${offer.rooms} комнаты для ${offer.guests} гостей`;
    if ((offer.rooms === ''|| offer.rooms === undefined) && (offer.guests === ''|| offer.guests === undefined)) {
      offerCard.querySelector('.popup__text--capacity').classList.add('hidden');
    } else if (offer.rooms === ''|| offer.rooms === undefined) {
      offerCard.querySelector('.popup__text--capacity').textContent = `Для ${offer.guests} гостей`;
    } else if (offer.guests === ''|| offer.guests === undefined) {offerCard.querySelector('.popup__text--capacity').textContent = `${offer.rooms} комнаты для гостей`;
    }

    offerCard.querySelector('.popup__text--time').textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`;
    if ((offer.checkin === ''|| offer.checkin === undefined) && (offer.checkout === ''|| offer.checkout === undefined)) {
      offerCard.querySelector('.popup__text--time').classList.add('hidden');
    } else if (offer.checkin === ''|| offer.checkin === undefined) {
      offerCard.querySelector('.popup__text--time').textContent = `Выезд до ${offer.checkout}`;
    } else if (offer.checkout === ''|| offer.checkout === undefined) {
      offerCard.querySelector('.popup__text--time').textContent = `Заезд после ${offer.checkin}`;
    }

    if (offer.features === ''|| offer.features === undefined) {
      offerCard.querySelector('.popup__features').classList.add('hidden');
    } else {
      const classModifiers = offer.features.map((feature) => `popup__feature--${feature}`);
      offerCard.querySelectorAll('.popup__feature').forEach((featureItem) => {
        const modifierItem = featureItem.classList[1];
        if (!classModifiers.includes(modifierItem)) {
          featureItem.remove();
        }
      });
    }

    offerCard.querySelector('.popup__description').textContent = offer.description;
    if (offer.description === ''|| offer.description === undefined) {
      offerCard.querySelector('.popup__description').classList.add('hidden');
    }

    if (offer.photos === ''|| offer.photos === undefined) {
      offerCard.querySelector('.popup__photos').classList.add('hidden');
    } else {
      offerCard.querySelector('.popup__photos').removeChild(offerCard.querySelector('.popup__photo'));
      for (let index=0; index < offer.photos.length; index++) {
        const photo = offerCardTemplate.querySelector('.popup__photo').cloneNode(true);
        photo.src = offer.photos[index];
        offerCard.querySelector('.popup__photos').appendChild(photo);
      }
    }

    if (offer.author === ''|| offer.author === undefined) {
      offerCard.querySelector('.popup__avatar').classList.add('hidden');
    } else {
      offerCard.querySelector('.popup__avatar').src = offer.author.avatar;
    }

    offerCardsFragment.appendChild(offerCard);
  });

  return offerCardsFragment;
}

export {renderingOfferCards};
