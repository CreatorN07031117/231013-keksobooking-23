const adForm = document.querySelector('.ad-form');
const fieldsetAdForm = adForm.querySelectorAll('fieldset');
const mapFilters = document.querySelector('.map__filters');
const mapFilter = mapFilters.querySelectorAll('.map__filter');
const mapFilterFieldset = mapFilters.querySelector('fieldset');

function addClassToElement (element, className) {
  element.classList.add(className);
}

function removeClassToElement (element, className) {
  element.classList.remove(className);
}

function addAttributeDisabled (element) {
  element.setAttribute('disabled', 'disabled');
}

function removeAttributeDisabled (element) {
  element.removeAttribute('disabled');
}

function disablingPage () {
  addClassToElement (adForm, 'ad-form--disabled');
  fieldsetAdForm.forEach((field) => {
    addAttributeDisabled (field);
  });

  addClassToElement (mapFilters, 'map__filters--disabled');
  mapFilter.forEach((field) => {
    addAttributeDisabled (field);
  });
  addAttributeDisabled (mapFilterFieldset);
}

function anablingPage () {
  removeClassToElement (adForm, 'ad-form--disabled');
  fieldsetAdForm.forEach((field) => {
    removeAttributeDisabled (field);
  });

  removeClassToElement (mapFilters, 'map__filters--disabled');
  mapFilter.forEach((field) => {
    removeAttributeDisabled (field);
  });
  removeAttributeDisabled (mapFilterFieldset);
}

export {disablingPage, anablingPage};
