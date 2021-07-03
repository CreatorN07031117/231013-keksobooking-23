import {generateOffers} from './data.js';
import {renderingOfferCards} from './card.js';
import {disablePage, enablePage} from './form.js';
import {} from './validation.js';

const OFFERS_QUANTITY = 10;
const offerCards = generateOffers(OFFERS_QUANTITY);
const renderedСards = renderingOfferCards(offerCards);
const mapCanvasBlock = document.querySelector('#map-canvas');
mapCanvasBlock.appendChild(renderedСards.children[0]);

disablePage();
enablePage();
