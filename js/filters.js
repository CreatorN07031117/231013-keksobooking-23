const HOUSING_PRICE_MAX = {
  low: 10000,
  middle: 50000,
  high: 1000000};
const HOUSING_PRICE_MIN = {
  low: 0,
  middle: 10000,
  high: 50000};
const ANY_VALUE = 'any';

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


  if (!(selectType === ANY_VALUE || offerItem.offer.type === selectType)) {
    return false;
  }

  if (!(selectPrice === ANY_VALUE || (offerItem.offer.price >= HOUSING_PRICE_MIN[selectPrice]) && (offerItem.offer.price <= HOUSING_PRICE_MAX[selectPrice]))) {
    return false;
  }

  if (!(selectRooms === ANY_VALUE || offerItem.offer.rooms === Number(selectRooms))) {
    return false;
  }

  if (!(selectGuests === ANY_VALUE || offerItem.offer.guests === Number(selectGuests))) {
    return false;
  }

  if (offerItem.offer.features) {
    const itemFeatures = [];
    selectFeatures.forEach((item) => {
      if(offerItem.offer.features.includes(item)) {
        itemFeatures.push(item);
      }});

    if (!(selectFeatures.join() === itemFeatures.join())) {
      return false;
    }
  }

  return true;
};


const setFilterChange = (cb) => {
  mapFilters.addEventListener('change', () => {
    cb ();
  });
};


export {setFilterChange, compareOffersWithFilters};
