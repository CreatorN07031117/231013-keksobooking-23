const getOffersData = (onSuccess, onFail) => {
  fetch('https://23.javascript.pages.academy/keksobooking/data')
    .then((response) => response.json())
    .then((offers) => onSuccess (offers))
    .catch(() => {
      onFail ('При загрузке данных с сервера произошла ошибка. Попробуйте еще раз');
    });
};

const sendOffersData = (onSuccess, onFail, newOffer) => {
  fetch(
    'https://23.javascript.pages.academy/keksobooking',
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
