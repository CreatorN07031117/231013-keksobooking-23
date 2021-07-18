import {renderingOffer} from './card.js';
import {enablePage, disablePage} from './page.js';

const CENTER_TOKIO = {
  lat: 35.67740,
  lng: 139.75422};
const ZOOM = 13;
const MAIN_PIN_SIZE = [52, 52];
const PIN_ICON_SIZE = [40, 40];
const ROUNDING_ACCURACY = 5;

const inputAdress = document.querySelector('#address');


disablePage();
inputAdress.value = `${CENTER_TOKIO.lat}, ${CENTER_TOKIO.lng}`;

const calculateIconAnchor = (iconSize) =>{
  const anchor = iconSize.slice();
  anchor[0] = anchor[0]/2;
  return anchor;
};


const map = L.map('map-canvas')
  .on('load', () => {
    enablePage();
  })
  .setView({
    lat: CENTER_TOKIO.lat,
    lng: CENTER_TOKIO.lng,
  }, ZOOM);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

const mainPinIcon = L.icon({
  iconUrl: './img/main-pin.svg',
  iconSize: MAIN_PIN_SIZE,
  iconAnchor: calculateIconAnchor(MAIN_PIN_SIZE),
});


const mainPinMarker = L.marker(
  {
    lat: CENTER_TOKIO.lat,
    lng: CENTER_TOKIO.lng,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  },
);

mainPinMarker.addTo(map);

mainPinMarker.on('moveend', (evt) => {
  const latLngMarker = evt.target.getLatLng();
  inputAdress.value = `${latLngMarker.lat.toFixed(ROUNDING_ACCURACY)}, ${latLngMarker.lng.toFixed(ROUNDING_ACCURACY)}`;
});


const resetMap = () => {
  mainPinMarker.setLatLng({
    lat: CENTER_TOKIO.lat,
    lng: CENTER_TOKIO.lng,
  });

  map.setView({
    lat: CENTER_TOKIO.lat,
    lng: CENTER_TOKIO.lng,
  }, ZOOM);

  inputAdress.value = `${CENTER_TOKIO.lat}, ${CENTER_TOKIO.lng}`;
};


const markerGroup = L.layerGroup().addTo(map);

const generatePoint = (offer) => {
  const icon = L.icon({
    iconUrl: './img/pin.svg',
    iconSize: PIN_ICON_SIZE,
    iconAnchor: calculateIconAnchor(PIN_ICON_SIZE),
  });

  const lat = offer.location.lat;
  const lng = offer.location.lng;
  const marker = L.marker({
    lat,
    lng},
  {
    icon: icon,
  });

  marker.remove();

  marker
    .addTo(markerGroup)
    .bindPopup(
      renderingOffer(offer),
      {
        keepInView: true});
};

const clearPoints = () => {
  markerGroup.clearLayers();
};


export {generatePoint, resetMap, clearPoints};
