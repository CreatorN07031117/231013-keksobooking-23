import {generatePoint, clearPoints, initializeMap} from './map.js';
import {setFilterChange, compareOffersWithFilters} from './filters.js';
import './card.js';
import {createSuccessMessage, createErrorsMessage, showAlert, enableMapFilter, disablePage, enableForm} from './page.js';
import {setUserFormSubmit} from './form.js';
import {getOffersData} from './fetch-data.js';
import './filters.js';
import {debounce} from  './utils/debounce.js';

const OFFERS_QUANTITY = 10;
const RERENDER_DELAY = 500;

const adFormReset = document.querySelector('.ad-form__reset');

disablePage();

initializeMap(() =>{

  enableForm();

  getOffersData((offers) => {
    offers
      .slice(0, OFFERS_QUANTITY).forEach((offer) => {
        generatePoint (offer);
      });

    enableMapFilter();

    adFormReset.addEventListener('click', () => {
      clearPoints();
      offers
        .slice(0, OFFERS_QUANTITY).forEach((offer) => {
          generatePoint (offer);
        });
    });

    const generateFilteredOffers = () => {
      const numberOffers = offers.length;
      let filteredOffersCount = 0;
      let i = 0;

      while ((filteredOffersCount < OFFERS_QUANTITY) && (i < numberOffers)) {
        if (compareOffersWithFilters(offers[i])) {
          generatePoint(offers[i]);
          filteredOffersCount++;
        }
        i++;
      }
    };

    setFilterChange(debounce(() => {
      clearPoints();
      generateFilteredOffers ();
    },
    RERENDER_DELAY));
  },
  showAlert);

});

setUserFormSubmit(createSuccessMessage, createErrorsMessage);

