import {generatePoint, resetMap} from './map.js';
import './card.js';
import {createSuccessMessage, createErrorsMessage, showAlert} from './page.js';
import {setUserFormSubmit, resetForm} from './form.js';
import {getOffersData} from './fetch-data.js';


const OFFERS_QUANTITY = 10;

const resetPage = () => {
  resetForm ();
  resetMap ();
};

getOffersData((offers) => {
  offers.slice(0, OFFERS_QUANTITY).forEach((offer) => {
    generatePoint (offer);
  });},
showAlert);

setUserFormSubmit(createSuccessMessage, createErrorsMessage);
