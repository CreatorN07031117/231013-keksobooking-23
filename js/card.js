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

function renderingOffer (offer) {
  const offerCardsFragment = document.createDocumentFragment();
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

  addText (`${offer.price} ₽/ночь`, offerPrice);
  addHiddenClass (offer.price, offerPrice);

  addText (TYPE_VARIANT[offer.type], offerType);
  addHiddenClass (offer.type, offerType);

  addText (`${offer.rooms} комнаты для ${offer.guests} гостей`, offerCapacity);
  if (!offer.rooms && !offer.guests) {
    addHiddenClass (false, offerCapacity);
  } else if (!offer.rooms) {
    addText (`Для ${offer.guests} гостей`, offerCapacity);
  } else if (!offer.guests) {
    addText (`${offer.rooms} комнаты для гостей`, offerCapacity);
  }

  addText (`Заезд после ${offer.checkin}, выезд до ${offer.checkout}`, offerTime);
  if (!offer.checkin && !offer.checkout) {
    addHiddenClass (false, offerTime);
  } else if (!offer.checkin) {
    addText (`Выезд до ${offer.checkout}`, offerTime);
  } else if (!offer.checkout) {
    addText (`Заезд после ${offer.checkin}`, offerTime);
  }

  if (!offer.features) {
    addHiddenClass (false, offerFeatures);
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
  offer.photos.forEach((photoUrl) => {
    const photo = offerPhotoItemTemplate.cloneNode(true);
    photo.src = photoUrl;
    offerPhotos.appendChild(photo);
  });
  addHiddenClass (offer.photos, offerPhotos);

  offerAvatar.src = offer.author.avatar;
  addHiddenClass (offer.author, offerAvatar);

  offerCardsFragment.appendChild(offerCard);

  return offerCardsFragment;
}


function renderingOfferCards (cards) {
  const offerCardsFragment = document.createDocumentFragment();
  cards.forEach((offer) => {
    renderingOffer(offer);
  });

  return offerCardsFragment;
}


export {renderingOfferCards, renderingOffer};
