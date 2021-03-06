import {renderOffer} from './card.js';

const CENTER_TOKIO = {
  lat: 35.67740,
  lng: 139.75422};
const ZOOM = 13;
const MAIN_PIN_SIZES = [52, 52];
const PIN_ICON_SIZES = [40, 40];
const ROUNDING_ACCURACY = 5;

const inputAdress = document.querySelector('#address');

const map = L.map('map-canvas');

inputAdress.value = `${CENTER_TOKIO.lat}, ${CENTER_TOKIO.lng}`;

const calculateIconAnchor = (iconSize) =>{
  const anchor = iconSize.slice();
  anchor[0] = anchor[0]/2;
  return anchor;
};


const initializeMap = (onLoad) => {
  map
    .on('load', onLoad)
    .setView({
      lat: CENTER_TOKIO.lat,
      lng: CENTER_TOKIO.lng,
    }, ZOOM);

  L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    })
    .addTo(map);
};

const mainPinIcon = L.icon({
  iconUrl: './img/main-pin.svg',
  iconSize: MAIN_PIN_SIZES,
  iconAnchor: calculateIconAnchor(MAIN_PIN_SIZES),
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

mainPinMarker.on('drag', (evt) => {
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
    iconSize: PIN_ICON_SIZES,
    iconAnchor: calculateIconAnchor(PIN_ICON_SIZES),
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
      renderOffer(offer),
      {keepInView: true});
};

const clearPoints = () => {
  markerGroup.clearLayers();
};


export {generatePoint, resetMap, clearPoints, initializeMap};
