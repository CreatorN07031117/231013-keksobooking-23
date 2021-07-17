import {generatePoint, clearPoints} from './map.js';
import {setFilterChange, compareOffersWithFilters} from './filters.js';
import './card.js';
import {createSuccessMessage, createErrorsMessage, showAlert} from './page.js';
import {setUserFormSubmit} from './form.js';
import {getOffersData} from './fetch-data.js';
import './filters.js';
import {debounce} from  './utils/debounce.js';


const OFFERS_QUANTITY = 10;
const RERENDER_DELAY = 500;
const adFormReset = document.querySelector('.ad-form__reset');


getOffersData((offers) => {

  offers
    .slice(0, OFFERS_QUANTITY).forEach((offer) => {
      generatePoint (offer);
    });

  const generateFilteredOffers = () => {
    offers
      .filter(compareOffersWithFilters)
      .slice(0, OFFERS_QUANTITY).forEach((offer) => {
        generatePoint (offer);
      });
  };

  adFormReset.addEventListener('click', () => {
    clearPoints();
    offers
      .slice(0, OFFERS_QUANTITY).forEach((offer) => {
        generatePoint (offer);
      });
  });

  setFilterChange(debounce(() => {
    clearPoints();
    generateFilteredOffers ();
  },
  RERENDER_DELAY));
},
showAlert);


setUserFormSubmit(createSuccessMessage, createErrorsMessage);

