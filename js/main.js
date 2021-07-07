import {generateOffers} from './data.js';
import {renderingOffer} from './card.js';
import {disablePage, enablePage} from './form.js';
import {} from './validation.js';
import {generatePoint} from './map.js'

const OFFERS_QUANTITY = 10;
const offerCards = generateOffers(OFFERS_QUANTITY);

disablePage();

offerCards.forEach((offer) => {
    generatePoint (offer)
})

