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
const adForm = document.querySelector('.ad-form');
const adTitleInput = adForm.querySelector('#title');
const adPriceInput = adForm.querySelector('#price');
const adTypeList = adForm.querySelector('#type');
const adRoomsNumberList = adForm.querySelector('#room_number');
const adCapacityList = adForm.querySelector('#capacity');

function takeCustomMessage (element, message) {
  element.setCustomValidity(message);
}

function checkingCapacity () {
  const adRoomsValue = adRoomsNumberList.value;
  const adCapacityValue = adCapacityList.value;
  if(adRoomsValue === ROOMS_NOT_FOR_GUESTS && adCapacityValue === CAPACITY_NOT_FOR_GUESTS) {
    takeCustomMessage(adCapacityList, '');
  } else if (adRoomsValue === ROOMS_NOT_FOR_GUESTS) {
    takeCustomMessage(adCapacityList, 'Не подходит для размещения гостей');
  } else if (adCapacityValue === CAPACITY_NOT_FOR_GUESTS) {
    takeCustomMessage(adCapacityList, 'Укажите количество гостей');
  } else if (adRoomsValue < adCapacityValue) {
    takeCustomMessage(adCapacityList, `Не подходит для размещения ${adCapacityValue} гостей. Количество гостей должно быть не больше количества комнат `);
  } else {
    takeCustomMessage(adCapacityList, '');
  }

  return adCapacityList.reportValidity();
}

function changePlaseholder (field, placeholder) {
  field.setAttribute('placeholder', placeholder);
}

changePlaseholder(adPriceInput, MIN_PRICE[adTypeList.value]);

adCapacityList.addEventListener('change', () => {
  checkingCapacity ();
});

adRoomsNumberList.addEventListener('change', () => {
  checkingCapacity ();
});

adTypeList.addEventListener('change', () => {
  changePlaseholder(adPriceInput, MIN_PRICE[adTypeList.value]);
});

adTitleInput.addEventListener('input', () => {
  const valueLength = adTitleInput.value.length;

  if (valueLength < MIN_TITLE_LENGTH) {
    takeCustomMessage(adTitleInput, `Минимальная длина ${MIN_TITLE_LENGTH} симв. Введите ещё ${  MIN_TITLE_LENGTH - valueLength } симв.`);
  } else if (valueLength > MAX_TITLE_LENGTH) {
    takeCustomMessage(adTitleInput, `Максимальная длина ${MAX_TITLE_LENGTH } симв. Удалите лишние ${  valueLength - MAX_TITLE_LENGTH } симв.`);
  } else {
    takeCustomMessage(adTitleInput, '');
  }

  return adTitleInput.reportValidity();
});

adPriceInput.addEventListener('input', () => {
  const adTypeValue = adTypeList.value;
  const value = adPriceInput.value;

  if (value < MIN_PRICE[adTypeValue]) {
    takeCustomMessage(adPriceInput, `Цена должна быть больше ${MIN_PRICE[adTypeValue]}`);
  } else if (value > MAX_PRICE) {
    takeCustomMessage(adPriceInput, `Цена должна быть не больше ${MAX_PRICE}`);
  } else {
    takeCustomMessage(adPriceInput, '');
  }

  return adPriceInput.reportValidity();
});

adForm.addEventListener('submit', (evt) => {
  if(!checkingCapacity ()) {
    evt.preventDefault();
  }
});
