const HOUSING_PRICE_MAX = {
  low: 10000,
  middle: 50000,
  high: 1000000};
const HOUSING_PRICE_MIN = {
  low: 0,
  middle: 10000,
  high: 50000};
const REQURED_QUALITY  = ['typeMatch', 'priceMatch', 'roomsMatch', 'guestsMatch', 'featuresMatch'];
const QUALITY_NOT_MATCH = 'notMatch';
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


  const itemQuality = [];

  if (selectType === ANY_VALUE) {
    itemQuality.push(REQURED_QUALITY[0]);
  } else if (offerItem.offer.type === selectType) {
    itemQuality.push(REQURED_QUALITY[0]);
  } else {itemQuality.push(QUALITY_NOT_MATCH);}

  if (selectPrice === ANY_VALUE) {
    itemQuality.push(REQURED_QUALITY[1]);
  } else if ((offerItem.offer.price >= HOUSING_PRICE_MIN[selectPrice]) && (offerItem.offer.price <= HOUSING_PRICE_MAX[selectPrice])) {
    itemQuality.push(REQURED_QUALITY[1]);
  } else {itemQuality.push(QUALITY_NOT_MATCH);}

  if (selectRooms === ANY_VALUE) {
    itemQuality.push(REQURED_QUALITY[2]);
  } else if (offerItem.offer.rooms === Number(selectRooms)) {
    itemQuality.push(REQURED_QUALITY[2]);
  } else {itemQuality.push(QUALITY_NOT_MATCH);}

  if (selectGuests === ANY_VALUE) {
    itemQuality.push(REQURED_QUALITY[3]);
  } else if(offerItem.offer.guests === Number(selectGuests)) {
    itemQuality.push(REQURED_QUALITY[3]);
  } else {itemQuality.push(QUALITY_NOT_MATCH);}

  if (offerItem.offer.features) {
    const itemFeatures = [];
    selectFeatures.forEach((item) => {
      if(offerItem.offer.features.includes(item)) {
        itemFeatures.push(item);
      }});

    if (selectFeatures.join() === itemFeatures.join()) {
      itemQuality.push(REQURED_QUALITY[4]);
    } else {
      itemQuality.push(QUALITY_NOT_MATCH);
    }
  }


  return itemQuality.join() === REQURED_QUALITY.join();
};


const setFilterChange = (cb) => {
  mapFilters.addEventListener('change', () => {
    cb ();
  });
};


export {setFilterChange, compareOffersWithFilters};
