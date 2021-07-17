/* eslint-disable eqeqeq */
const HOUSING_PRICE_MAX = {
  low: 10000,
  middle: 50000,
  high: 1000000};
const HOUSING_PRICE_MIN = {
  low: 0,
  middle: 10000,
  high: 50000};
const mapFilters = document.querySelector('.map__filters');
const housingType = mapFilters.querySelector('#housing-type');
const housingPrice = mapFilters.querySelector('#housing-price');
const housingRooms = mapFilters.querySelector('#housing-rooms');
const housingGuests = mapFilters.querySelector('#housing-guests');
const housingFeatures = mapFilters.querySelectorAll('.map__checkbox');


const compareOffersWithFilters = (offerItem) => {
  const selectType = housingType.value;
  const selectPrice = housingPrice.value;
  const selectRooms = housingRooms.value;
  const selectGuests = housingGuests.value;
  const selectFeatures = [];

  housingFeatures.forEach((feature) => {
    if (feature.checked) {
      selectFeatures.push(feature.value);
    }
  });

  const requiredQuality  = ['typeTrue', 'priceTrue', 'roomsTrue', 'guestsTrue', 'featuresTrue'];

  const itemQuality = [];

  if (selectType === 'any') {
    itemQuality.push('typeTrue');
  } else if (offerItem.offer.type === selectType) {
    itemQuality.push('typeTrue');
  } else {itemQuality.push('false');}

  if (selectPrice === 'any') {
    itemQuality.push('priceTrue');
  } else if ((offerItem.offer.price >= HOUSING_PRICE_MIN[selectPrice]) && (offerItem.offer.price <= HOUSING_PRICE_MAX[selectPrice])) {
    itemQuality.push('priceTrue');
  } else {itemQuality.push('false');}

  if (selectRooms === 'any') {
    itemQuality.push('roomsTrue');
  } else if (offerItem.offer.rooms == selectRooms) {
    itemQuality.push('roomsTrue');
  } else {itemQuality.push('false');}

  if (selectGuests === 'any') {
    itemQuality.push('guestsTrue');
  } else if(offerItem.offer.guests == selectGuests) {
    itemQuality.push('guestsTrue');
  } else {itemQuality.push('false');}

  if (offerItem.offer.features) {
    const itemFeatures = [];
    selectFeatures.forEach((item) => {
      if(offerItem.offer.features.includes(item)) {
        itemFeatures.push(item);
      }});

    if (selectFeatures.join() === itemFeatures.join()) {
      itemQuality.push('featuresTrue');
    } else {
      itemQuality.push('false');
    }
  }


  if (itemQuality.join() === requiredQuality.join()) {
    return true;
  } else {
    return false;
  }
};


const setFilterChange = (cb) => {
  mapFilters.addEventListener('change', () => {
    cb ();
  });
};


export {setFilterChange, compareOffersWithFilters};
