import {renderingOffer} from './card.js';
import {enablePage} from './form.js';


const inputAdress = document.querySelector('#address');
const adFormReset = document.querySelector('.ad-form__reset');


const map = L.map('map-canvas')
  .on('load', () => {
    enablePage();
  })
  .setView({
    lat: 35.677402,
    lng: 139.754221,
  }, 11);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

const mainPinIcon = L.icon({
  iconUrl: './img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const mainPinMarker = L.marker(
  {
    lat: 35.677402,
    lng: 139.754221,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  },
);

mainPinMarker.addTo(map);

mainPinMarker.on('moveend', (evt) => {
  const latLngMarker = evt.target.getLatLng();
  inputAdress.value = `${latLngMarker.lat}, ${latLngMarker.lng}`;
});

adFormReset.addEventListener('click', () => {
  mainPinMarker.setLatLng({
    lat: 35.677402,
    lng: 139.754221,
  });

  map.setView({
    lat: 35.677402,
    lng: 139.754221,
  }, 11);
});


function generatePoint (offer) {
  const icon = L.icon({
    iconUrl: './img/pin.svg',
    iconSize: [40, 40],
    iconAnchor: [20, 40],
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
}

export {generatePoint};
