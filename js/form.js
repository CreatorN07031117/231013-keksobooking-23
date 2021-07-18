import {sendOffersData} from './fetch-data.js';
import {resetMap} from './map.js';
import {debounce} from  './utils/debounce.js';

const RERENDER_DELAY = 500;
const MIN_TITLE_LENGTH = 30;
const MAX_TITLE_LENGTH = 100;
const MAX_PRICE = 1000000;
const MIN_PRICE = {
  'bungalow': 0,
  'flat': 1000,
  'hotel': 3000,
  'house': 5000,
  'palace': 10000};
const ROOMS_NOT_FOR_GUESTS = '100';
const CAPACITY_NOT_FOR_GUESTS = '0';
const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
const PREVIEW_SIZE = '70px';
const DEFAULT_AVATAR = 'img/muffin-grey.svg';

const adForm = document.querySelector('.ad-form');
const adTitleInput = adForm.querySelector('#title');
const adPriceInput = adForm.querySelector('#price');
const adTypeList = adForm.querySelector('#type');
const adRoomsNumberList = adForm.querySelector('#room_number');
const adCapacityList = adForm.querySelector('#capacity');
const avatarChooser = adForm.querySelector('#avatar');
const avatarPreview = adForm.querySelector('.ad-form-header__preview-img');
const imageChooser = adForm.querySelector('#images');
const imagePreview = adForm.querySelector('.ad-form__photo');
const adFormReset = document.querySelector('.ad-form__reset');
const mapFilters = document.querySelector('.map__filters');


const takeCustomMessage = (element, message) => {
  element.setCustomValidity(message);
};

const checkCapacity = () => {
  const adRoomsValue = adRoomsNumberList.value;
  const adCapacityValue = adCapacityList.value;
  if(adRoomsValue === ROOMS_NOT_FOR_GUESTS && adCapacityValue === CAPACITY_NOT_FOR_GUESTS) {
    takeCustomMessage(adCapacityList, '');
  } else if (adRoomsValue === ROOMS_NOT_FOR_GUESTS) {
    takeCustomMessage (adCapacityList, 'Не подходит для размещения гостей');
  } else if (adCapacityValue === CAPACITY_NOT_FOR_GUESTS) {
    takeCustomMessage (adCapacityList, 'Укажите количество гостей');
  } else if (adRoomsValue < adCapacityValue) {
    takeCustomMessage (adCapacityList, `Не подходит для размещения ${adCapacityValue} гостей. Количество гостей должно быть не больше количества комнат `);
  } else {
    takeCustomMessage (adCapacityList, '');
  }

  return adCapacityList.reportValidity();
};

const changePlaseholder = (field, placeholder) => {
  field.placeholder = placeholder;
};

changePlaseholder(adPriceInput, MIN_PRICE[adTypeList.value]);

adCapacityList.addEventListener('change', () => {
  checkCapacity ();
});

adRoomsNumberList.addEventListener('change', () => {
  checkCapacity ();
});

adTypeList.addEventListener('change', () => {
  changePlaseholder (adPriceInput, MIN_PRICE[adTypeList.value]);
});

adTitleInput.addEventListener('input', debounce(() => {
  const valueLength = adTitleInput.value.length;

  if (valueLength < MIN_TITLE_LENGTH) {
    takeCustomMessage (adTitleInput, `Минимальная длина ${MIN_TITLE_LENGTH} симв. Введите ещё ${  MIN_TITLE_LENGTH - valueLength } симв.`);
  } else if (valueLength > MAX_TITLE_LENGTH) {
    takeCustomMessage (adTitleInput, `Максимальная длина ${MAX_TITLE_LENGTH } симв. Удалите лишние ${  valueLength - MAX_TITLE_LENGTH } симв.`);
  } else {
    takeCustomMessage (adTitleInput, '');
  }

  return adTitleInput.reportValidity();
},
RERENDER_DELAY));

adPriceInput.addEventListener('input', debounce(() => {
  const adTypeValue = adTypeList.value;
  const value = adPriceInput.value;

  if (value < MIN_PRICE[adTypeValue]) {
    takeCustomMessage (adPriceInput, `Цена должна быть больше ${MIN_PRICE[adTypeValue]}`);
  } else if (value > MAX_PRICE) {
    takeCustomMessage (adPriceInput, `Цена должна быть не больше ${MAX_PRICE}`);
  } else {
    takeCustomMessage (adPriceInput, '');
  }

  return adPriceInput.reportValidity();
}), RERENDER_DELAY);

//Выбор аватарки и фото в объявление

avatarChooser.addEventListener('change', () => {
  const file = avatarChooser.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    const reader = new FileReader();

    reader.addEventListener('load', () => {
      avatarPreview.src = reader.result;
    });

    reader.readAsDataURL(file);
  }
});

imageChooser.addEventListener('change', () => {
  const file = imageChooser.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    const reader = new FileReader();

    reader.addEventListener('load', () => {
      if (!(imagePreview.children.length === 0)) {
        const chooseImg = imagePreview.querySelector('.ad-form__photo-img');
        imagePreview.removeChild(chooseImg);
      }
      const previewImg =  document.createElement('img');
      previewImg.classList.add('ad-form__photo-img');
      previewImg.src = reader.result;
      previewImg.style.width = PREVIEW_SIZE;
      previewImg.style.height = PREVIEW_SIZE;
      imagePreview.appendChild(previewImg);
    });

    reader.readAsDataURL(file);
  }
});

const resetDownloadImage = () => {
  avatarPreview.src = DEFAULT_AVATAR;
  if (!(imagePreview.children.length === 0)) {
    const chooseImg = imagePreview.querySelector('.ad-form__photo-img');
    imagePreview.removeChild(chooseImg);
  }
};

//Сброс полей формы

adFormReset.addEventListener('click', (evt) => {
  evt.preventDefault();
  adForm.reset();
  resetDownloadImage();
  mapFilters.reset();
  resetMap();
  changePlaseholder(adPriceInput, MIN_PRICE[adTypeList.value]);
});


//Отправка формы
const setUserFormSubmit = (onSuccess, onFail) => {
  adForm.addEventListener('submit', (evt) => {
    if(!checkCapacity ()) {
      return  evt.preventDefault();
    }

    evt.preventDefault();
    sendOffersData (
      () => {
        onSuccess();
        adForm.reset();
        resetDownloadImage();
        mapFilters.reset();
        resetMap();
        changePlaseholder(adPriceInput, MIN_PRICE[adTypeList.value]);
      },
      () => onFail(),
      new FormData(evt.target));
  });
};


export {setUserFormSubmit};
