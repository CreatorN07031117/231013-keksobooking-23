const ERROR_MESSAGE = 'Значения должны быть больше 0';
const TYPE_VARIANT = ['palace', 'flat', 'house', 'bungalow', 'hotel'];
const CHECKIN_CHECKOUT_TIME = ['12:00', '13:00', '14:00'];
const FEATURES_VARIANT = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
const PHOTOS_VARIANT = ['https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg', 'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg', 'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg'];
const TYPE_TITLE = {
  'palace': 'Дворец',
  'flat': 'Квартира',
  'house': 'Дом',
  'bungalow': 'Бунгало',
  'hotel':'Номер в отеле'};
const TYPE_DESCRIPTION = {
  'palace': 'Мы всегда рады гостям в нашем двореце. У нас есть все удобства для комфортного отдыха.',
  'flat': 'Квартира с прекрасным видом из окна. Хорошее расположение и транспортная развязка.',
  'house': 'Прекрасный дом для выших прекрасных выходных.',
  'bungalow': 'Красивое бунгало. Здесь вы сможете позабыть о реальности и окунуться в мир расслабления и умиротворения.',
  'hotel':'Отель с комфоортабельными номерами и прекрасным расположением.'};
const COORDINATE_ROUNDING = 5;
const MAX_ROOMS = 5;
const MAX_GUESTS = 5;
const MAX_PRICE =  1000000;
const OFFERS_QUANTITY = 10;

//Функция, возвращающая случайное целое число из переданного диапазона включительно. Диапазон может быть только положительный, включая ноль
// Источник: https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Math/random

function getRandomNumber (min, max) {
  if (min < 0 || max < 0) {
    return ERROR_MESSAGE;
  }
  if (min > max) {
    return Math.round(Math.random() * (min - max) + max);
  }

  if (min === max) {
    return max;
  }

  return Math.round(Math.random() * (max - min) + min);
}

//Функция, возвращающая случайное число с плавающей точкой из переданного диапазона включительно. Будет использоваться для генерации временных географических координат в следующем задании. Пример использования функции:
// Источник: https://habr.com/ru/post/312880/#s2_11
function genarateMapCoordinate (min, max, rounding) {
  const ROUND = Math.pow(10, rounding);
  let coordinate;
  if (min < 0 || max < 0) {
    return ERROR_MESSAGE;
  }
  if (min === max) {
    return Math.trunc(max * ROUND) / ROUND;
  }
  if (min > max) {
    coordinate = Math.random() * (min - max) + max;
    return Math.trunc(coordinate * ROUND) / ROUND;
  }
  coordinate = Math.random() * (max - min) + min;
  return Math.trunc(coordinate * ROUND) / ROUND;
}

let generatedType = '';

function generateType () {
  return TYPE_VARIANT[getRandomNumber (0, TYPE_VARIANT.length - 1)];
}
let features = [];

function generateFeatures () {
  const quantityFeatures = getRandomNumber (1, FEATURES_VARIANT.length);
  for (let index = 0; index < quantityFeatures; index++) {
    const newFeature = FEATURES_VARIANT[getRandomNumber (0, FEATURES_VARIANT.length - 1)];
    if (!features.includes(newFeature)) {
      features[index] = newFeature;
    }
  }
  features = features.filter((word) => word.length > 0);
  return features;
}

const photos = [];

function generatePhotos () {
  const quantityPhotos = getRandomNumber (1, PHOTOS_VARIANT.length);
  for (let index = 0; index < quantityPhotos; index++) {
    photos[index] = PHOTOS_VARIANT[getRandomNumber (0, PHOTOS_VARIANT.length - 1)];
  }
  return photos;
}

function generateAvatar () {
  const avatarIndex = getRandomNumber (1, 10);
  if (avatarIndex === 10) {
    return  `img/avatars/user${avatarIndex}.png` ;
  }
  return `img/avatars/user0${avatarIndex}.png`;
}

const offers = [];

function generateOffers () {
  for (let index = 0; index < OFFERS_QUANTITY; index++) {
    generatedType = generateType ();
    const latCoordinate = genarateMapCoordinate (35.65000, 35.70000, COORDINATE_ROUNDING);
    const lngCoordinate = genarateMapCoordinate (139.70000, 139.80000, COORDINATE_ROUNDING);
    offers[index] = {
      author: {
        avatar: generateAvatar (),
      },
      type: generatedType,
      title: TYPE_TITLE[generatedType],
      address: `${latCoordinate}, ${lngCoordinate}`,
      price: getRandomNumber (0, MAX_PRICE),
      rooms: getRandomNumber (0, MAX_ROOMS),
      guests: getRandomNumber (0, MAX_GUESTS),
      features: generateFeatures (),
      photos: generatePhotos (),
      checkin: CHECKIN_CHECKOUT_TIME[getRandomNumber (0, CHECKIN_CHECKOUT_TIME.length - 1)],
      checkout: CHECKIN_CHECKOUT_TIME[getRandomNumber (0, CHECKIN_CHECKOUT_TIME.length - 1)],
      description: TYPE_DESCRIPTION[generatedType],
      location: {
        lat: latCoordinate,
        lng: lngCoordinate,
      },
    };
  }
  return offers;
}
generateOffers ();
