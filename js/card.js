const offerCardTemplate = document.querySelector('#card').content;
const offerPhotoItemTemplate = offerCardTemplate.querySelector('.popup__photo');
const TYPE_VARIANT = {
  'palace': 'Дворец',
  'flat': 'Квартира',
  'house': 'Дом',
  'bungalow': 'Бунгало',
  'hotel':'Номер в отеле'};
const ANY_VALUE = 'any';

const addText = (element, itemClass) => {
  itemClass.textContent = element;
};

const addHiddenClass = (element, itemClass) => {
  if (!element || element === ANY_VALUE) {
    itemClass.classList.add('hidden');
  }
};

const renderingOffer = (offerData) => {
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

  addText (offerData.offer.title, offerTitle);
  addHiddenClass (offerData.offer.title, offerTitle);

  addText (offerData.offer.address, offerAdress);
  addHiddenClass (offerData.offer.address, offerAdress);

  addText (`${offerData.offer.price} ₽/ночь`, offerPrice);
  addHiddenClass (offerData.offer.price, offerPrice);

  addText (TYPE_VARIANT[offerData.offer.type], offerType);
  addHiddenClass (offerData.offer.type, offerType);

  addText (`${offerData.offer.rooms} комнаты для ${offerData.offer.guests} гостей`, offerCapacity);
  if (!offerData.offer.rooms && !offerData.offer.guests) {
    addHiddenClass (false, offerCapacity);
  } else if (offerData.offer.rooms === ANY_VALUE && offerData.offer.guests === ANY_VALUE ){
    addHiddenClass (false, offerCapacity);
  } else if (!offerData.offer.rooms || offerData.offer.rooms === ANY_VALUE) {
    addText (`Для ${offerData.offer.guests} гостей`, offerCapacity);
  } else if (!offerData.offer.guests || offerData.offer.guests === ANY_VALUE) {
    addText (`${offerData.offer.rooms} комнаты для гостей`, offerCapacity);
  }

  addText (`Заезд после ${offerData.offer.checkin}, выезд до ${offerData.offer.checkout}`, offerTime);
  if (!offerData.offer.checkin && !offerData.offer.checkout) {
    addHiddenClass (false, offerTime);
  } else if (!offerData.offer.checkin) {
    addText (`Выезд до ${offerData.offer.checkout}`, offerTime);
  } else if (!offerData.offer.checkout) {
    addText (`Заезд после ${offerData.offer.checkin}`, offerTime);
  }

  if (!offerData.offer.features || offerData.offer.features.length === 0) {
    addHiddenClass (false, offerFeatures);
  } else {
    const classModifiers = offerData.offer.features.map((feature) => `popup__feature--${feature}`);
    offerFeatureItem.forEach((featureItem) => {
      const modifierItem = featureItem.classList[1];
      if (!classModifiers.includes(modifierItem)) {
        featureItem.remove();
      }
    });
  }

  addText (offerData.offer.description, offerDescription);
  addHiddenClass (offerData.offer.description, offerDescription);

  if (offerData.offer.photos === ''|| offerData.offer.photos === undefined) {
    addHiddenClass (offerData.offer.photos, offerPhotos);
  } else {
    offerPhotos.removeChild(offerPhotoItem);
    offerData.offer.photos.forEach((photoUrl) => {
      const photo = offerPhotoItemTemplate.cloneNode(true);
      photo.src = photoUrl;
      offerPhotos.appendChild(photo);
    });
  }

  offerAvatar.src = offerData.author.avatar;
  addHiddenClass (offerData.author, offerAvatar);

  offerCardsFragment.appendChild(offerCard);

  return offerCardsFragment;
};


export {renderingOffer};
