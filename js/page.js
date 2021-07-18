const ALERT_SHOW_TIME = 5000;
const KEY_ESC = 'Esc';
const KEY_ESCAPE = 'Escape';

const adForm = document.querySelector('.ad-form');
const fieldsetAdForm = adForm.querySelectorAll('fieldset');
const mapFilters = document.querySelector('.map__filters');
const mapFilter = mapFilters.querySelectorAll('.map__filter');
const mapFilterFieldset = mapFilters.querySelector('fieldset');
const adTimeIn = adForm.querySelector('#timein');
const adTimeOut = adForm.querySelector('#timeout');
const bodyBlock = document.querySelector('body');
const successMessageTemlate = document.querySelector ('#success');
const errorMessageTemplate = document.querySelector ('#error');


const addClassToElement = (element, className) => {
  element.classList.add(className);
};

const removeClassToElement = (element, className) => {
  element.classList.remove(className);
};

const toggleAttributeDisabled = (element, value) => {
  element.disabled = value;
};

//Блокировка и разблокировка страницы

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

//Смена времени при изменени времени заезда или времени выезда

const correctTime = (selectTime, dependentTime) => {
  dependentTime.value = selectTime.value;
};

adTimeIn.addEventListener('change', () => {
  correctTime (adTimeIn, adTimeOut);
});

adTimeOut.addEventListener('change', () => {
  correctTime (adTimeOut, adTimeIn);
});

//Открытие и закрытие поп-апа с сообщением
const createMessage = (template) => {
  const messageFragment = document.createDocumentFragment();
  const message = template.cloneNode(true).content;
  messageFragment.appendChild(message);
  return bodyBlock.appendChild(messageFragment);
};

const closeMessage = (messageClass) => {
  bodyBlock.removeChild(messageClass);
};


const createSuccessMessage = () => {
  createMessage (successMessageTemlate);

  const successClass = document.querySelector('.success');
  const onEscSuccesMessage = (evt) => {
    if (evt.key === KEY_ESC || evt.key === KEY_ESCAPE) {
      closeMessage (successClass);
      document.removeEventListener('keydown', onEscSuccesMessage);
    }
  };

  successClass.addEventListener('click', () => {
    closeMessage (successClass);
    document.removeEventListener('keydown', onEscSuccesMessage);
  });

  document.addEventListener('keydown', onEscSuccesMessage);
};

const createErrorsMessage = () => {
  createMessage(errorMessageTemplate);

  const errorClass = document.querySelector('.error');
  const onEscErrorMessage = (evt) => {
    if (evt.key === KEY_ESC || evt.key === KEY_ESCAPE) {
      closeMessage (errorClass);
      document.removeEventListener('keydown', onEscErrorMessage);
    }
  };

  errorClass.addEventListener('click', () => {
    closeMessage(errorClass);
    document.removeEventListener('keydown', onEscErrorMessage);
  });

  document.addEventListener('keydown', onEscErrorMessage);

  const errorButton = errorClass.querySelector('.error__button');
  errorButton.addEventListener('click', () => {
    closeMessage(errorClass);
    document.removeEventListener('keydown', onEscErrorMessage);
  });
};


//Сообщение об ошибке
const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = 100;
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = 0;
  alertContainer.style.top = 0;
  alertContainer.style.right = 0;
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';

  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};


export {disablePage, enablePage, createSuccessMessage, createErrorsMessage, showAlert};
