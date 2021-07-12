import {generatePoint} from './map.js';
import './card.js';
import {createSuccessMessage, closeSuccessMessage, createErrorsMessage, closeErrorMessage, showAlert} from './page.js';
import {setUserFormSubmit} from './form.js';
import {getOffersData} from './fetch-data.js';


const OFFERS_QUANTITY = 10;

getOffersData((offers) => {
  offers.slice(0, OFFERS_QUANTITY).forEach((offer) => {
    generatePoint (offer);
  });},
showAlert);


setUserFormSubmit(createSuccessMessage, createErrorsMessage);
