const RECEIVING_SERVER_URL = 'https://23.javascript.pages.academy/keksobooking/data';
const SENGING_SERVER_URL = 'https://23.javascript.pages.academy/keksobooking';


const getOffersData = (onSuccess, onFail) => {
  fetch(RECEIVING_SERVER_URL)
    .then((response) => response.json())
    .then((offers) => onSuccess (offers))
    .catch(() => {
      onFail ('При загрузке данных с сервера произошла ошибка. Попробуйте еще раз');
    });
};

const sendOffersData = (onSuccess, onFail, newOffer) => {
  fetch(
    SENGING_SERVER_URL,
    {
      method: 'POST',
      body: newOffer,
    },
  ).then((response) => {
    if (response.ok) {
      onSuccess();
    } else {
      onFail();
    }
  })
    .catch(() => onFail());
};


export {getOffersData, sendOffersData};
