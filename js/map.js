import {renderingOffer} from './card.js';
import {enablePage, disablePage} from './page.js';


const inputAdress = document.querySelector('#address');
const adFormReset = document.querySelector('.ad-form__reset');
const TOKIO = {
  lat: 35.67740,
  lng: 139.75422};
const zoom = 12;
const mainPinSize = [52, 52];
const pinIconSize = [40, 40];

disablePage();
inputAdress.value = `${TOKIO.lat}, ${TOKIO.lng}`;

const calculateIconAnchor = (iconSize) =>{
  const anchor = iconSize.slice();
  anchor[0] = anchor[0]/2;
};

const map = L.map('map-canvas')
  .on('load', () => {
    enablePage();
  })
  .setView({
    lat: TOKIO.lat,
    lng: TOKIO.lng,
  }, zoom);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

const mainPinIcon = L.icon({
  iconUrl: './img/main-pin.svg',
  iconSize: mainPinSize,
  iconAnchor: calculateIconAnchor(mainPinSize),
});

const mainPinMarker = L.marker(
  {
    lat: TOKIO.lat,
    lng: TOKIO.lng,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  },
);

mainPinMarker.addTo(map);

mainPinMarker.on('moveend', (evt) => {
  const latLngMarker = evt.target.getLatLng();
  inputAdress.value = `${latLngMarker.lat.toFixed(5)}, ${latLngMarker.lng.toFixed(5)}`;
});

adFormReset.addEventListener('click', () => {
  mainPinMarker.setLatLng({
    lat: TOKIO.lat,
    lng: TOKIO.lng,
  });

  map.setView({
    lat: TOKIO.lat,
    lng: TOKIO.lng,
  }, zoom);
});


const generatePoint = (offer) => {
  const icon = L.icon({
    iconUrl: './img/pin.svg',
    iconSize: pinIconSize,
    iconAnchor: calculateIconAnchor(pinIconSize),
  });

  const lat = offer.location.lat;
  const lng = offer.location.lng;
  const marker = L.marker({
    lat,
    lng},
  {
    icon: icon,
  });

  marker
    .addTo(map)
    .bindPopup(
      renderingOffer(offer),
      {
        keepInView: true});
};

export {generatePoint};
