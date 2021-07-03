const MIN_TITLE_LENGTH = 30;
const MAX_TITLE_LENGTH = 100;
const MAX_PRICE = 1000000;
const MIN_PRICE = {
  'bungalow': 0,
  'flat': 1000,
  'hotel': 3000,
  'house': 5000,
  'palace': 10000};
const adForm = document.querySelector('.ad-form');
const adTitleInput = adForm.querySelector('#title');
const adPriceInput = adForm.querySelector('#price');
const adTypeList = adForm.querySelector('#type');
let adTypeValue = adTypeList.options[adTypeList.selectedIndex].value;
const adRoomsNumberList = adForm.querySelector('#room_number');
let adRoomsValue = adRoomsNumberList.options[adRoomsNumberList.selectedIndex].value;
const adCapacityList = adForm.querySelector('#capacity');
let adCapacityValue = adCapacityList.options[adCapacityList.selectedIndex].value;

function takeCustomMessage (element, message) {
  element.setCustomValidity(message);
}

function checkingCapacity () {
  if(adRoomsValue === '100' && adCapacityValue === '0') {
    takeCustomMessage(adCapacityList, '');
  } else if (adRoomsValue === '100') {
    takeCustomMessage(adCapacityList, 'Не подходит для размещения гостей');
  } else if (adCapacityValue === '0') {
    takeCustomMessage(adCapacityList, 'Укажите количество гостей');
  } else if (adRoomsValue < adCapacityValue) {
    takeCustomMessage(adCapacityList, `Не подходит для размещения ${adCapacityValue} гостей. Количество гостей должно быть не больше количества комнат `);
  } else {
    takeCustomMessage(adCapacityList, '');
  }

  return adCapacityList.reportValidity();
}

adTypeList.addEventListener('change', () => {
  adTypeValue = adTypeList.options[adTypeList.selectedIndex].value;
});

adCapacityList.addEventListener('change', () => {
  adCapacityValue = adCapacityList.options[adCapacityList.selectedIndex].value;
  checkingCapacity ();
});

adRoomsNumberList.addEventListener('change', () => {
  adRoomsValue = adRoomsNumberList.options[adRoomsNumberList.selectedIndex].value;
  checkingCapacity ();
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
