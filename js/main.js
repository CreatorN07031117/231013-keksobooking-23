import {generatePoint} from './map.js';
import {generateOffers} from './data.js';
import {} from './card.js';
import {} from './form.js';
import {} from './validation.js';


const OFFERS_QUANTITY = 10;
const offerCards = generateOffers(OFFERS_QUANTITY);

offerCards.forEach((offer) => {
  generatePoint (offer);
});

