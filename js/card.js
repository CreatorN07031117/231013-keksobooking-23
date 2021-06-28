const offerCardTemplate = document.querySelector('#card').content;
const offerPhotoItemTemplate = offerCardTemplate.querySelector('.popup__photo');
const TYPE_VARIANT = {
  'palace': 'Дворец',
  'flat': 'Квартира',
  'house': 'Дом',
  'bungalow': 'Бунгало',
  'hotel':'Номер в отеле'};

function addText (element, itemClass) {
  itemClass.textContent = element;
}

function addHiddenClass (element, itemClass) {
  if (!element) {
    itemClass.classList.add('hidden');
  }
}

function renderingOfferCards (cards) {
  const offerCardsFragment = document.createDocumentFragment();
  cards.forEach((offer) => {
    const offerCard = offerCardTemplate.cloneNode(true);
    const offerTitle = offerCard.querySelector('.popup__title');
    const offerAdress = offerCard.querySelector('.popup__text--address');
    const offerPrice = offerCard.querySelector('.popup__text--price');
    const offerType = offerCard.querySelector('.popup__type');
    const offerCapacity = offerCard.querySelector('.popup__text--capacity');
    const offerTime = offerCard.querySelector('.popup__text--time');
    const offerFeatures = offerCard.querySelector('.popup__features');
    const offerFeatureItem = offerCard.querySelectorAll('.popup__feature');
    const offerDescription = offerCard.querySelector('.popup__description');
    const offerPhotos = offerCard.querySelector('.popup__photos');
    const offerPhotoItem = offerCard.querySelector('.popup__photo');
    const offerAvatar = offerCard.querySelector('.popup__avatar');

    addText (offer.title, offerTitle);
    addHiddenClass (offer.title, offerTitle);

    addText (offer.address, offerAdress);
    addHiddenClass (offer.address, offerAdress);

    offerPrice.textContent = `${offer.price} ₽/ночь`;
    addHiddenClass (offer.price, offerPrice);

    offerType.textContent = TYPE_VARIANT[offer.type];
    addHiddenClass (offer.type, offerType);

    offerCapacity.textContent = `${offer.rooms} комнаты для ${offer.guests} гостей`;
    if (!offer.rooms && !offer.guests) {
      offerCapacity.classList.add('hidden');
    } else if (!offer.rooms) {
      offerCapacity.textContent = `Для ${offer.guests} гостей`;
    } else if (!offer.guests) {
      offerCapacity.textContent = `${offer.rooms} комнаты для гостей`;
    }

    offerTime.textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`;
    if (!offer.checkin && !offer.checkout) {
      offerTime.classList.add('hidden');
    } else if (!offer.checkin) {
      offerTime.textContent = `Выезд до ${offer.checkout}`;
    } else if (!offer.checkout) {
      offerTime.textContent = `Заезд после ${offer.checkin}`;
    }

    if (!offer.features) {
      offerFeatures .classList.add('hidden');
    } else {
      const classModifiers = offer.features.map((feature) => `popup__feature--${feature}`);
      offerFeatureItem.forEach((featureItem) => {
        const modifierItem = featureItem.classList[1];
        if (!classModifiers.includes(modifierItem)) {
          featureItem.remove();
        }
      });
    }

    addText (offer.description, offerDescription);
    addHiddenClass (offer.description, offerDescription);

    offerPhotos.removeChild(offerPhotoItem);
    if (!offer.photos) {
      offerPhotos.classList.add('hidden');
    } else {
      offer.photos.forEach((photoUrl) => {
        const photo = offerPhotoItemTemplate.cloneNode(true);
        photo.src = photoUrl;
        offerPhotos.appendChild(photo);
      });
    }

    if (!offer.author) {
      offerAvatar.classList.add('hidden');
    } else {
      offerAvatar.src = offer.author.avatar;
    }

    offerCardsFragment.appendChild(offerCard);
  });

  return offerCardsFragment;
}

export {renderingOfferCards};
