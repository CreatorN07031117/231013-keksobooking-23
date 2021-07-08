const adForm = document.querySelector('.ad-form');
const fieldsetAdForm = adForm.querySelectorAll('fieldset');
const mapFilters = document.querySelector('.map__filters');
const mapFilter = mapFilters.querySelectorAll('.map__filter');
const mapFilterFieldset = mapFilters.querySelector('fieldset');
const adTimeIn = adForm.querySelector('#timein');
const adTimeOut = adForm.querySelector('#timeout');

const addClassToElement = (element, className) => {
  element.classList.add(className);
};

const removeClassToElement = (element, className) => {
  element.classList.remove(className);
};

const toggleAttributeDisabled = (element, value) => {
  element.disabled = value;
};

const disablePage = () => {
  addClassToElement (adForm, 'ad-form--disabled');
  fieldsetAdForm.forEach((field) => {
    toggleAttributeDisabled (field, true);
  });

  addClassToElement (mapFilters, 'map__filters--disabled');
  mapFilter.forEach((field) => {
    toggleAttributeDisabled (field, true);
  });
  toggleAttributeDisabled (mapFilterFieldset, true);
};

const enablePage = () => {
  removeClassToElement (adForm, 'ad-form--disabled');
  fieldsetAdForm.forEach((field) => {
    toggleAttributeDisabled (field, false);
  });

  removeClassToElement (mapFilters, 'map__filters--disabled');
  mapFilter.forEach((field) => {
    toggleAttributeDisabled (field, false);
  });
  toggleAttributeDisabled (mapFilterFieldset, false);
};

const correctTime = (selectTime, dependentTime) => {
  dependentTime.value = selectTime.value;
};

adTimeIn.addEventListener('change', () => {
  correctTime (adTimeIn, adTimeOut);
});

adTimeOut.addEventListener('change', () => {
  correctTime (adTimeOut, adTimeIn);
});

export {disablePage, enablePage};
