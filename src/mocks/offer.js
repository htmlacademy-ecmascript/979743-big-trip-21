// возвращает данные о пунктах назначения в том виде, как они типа на сервере хранятся
// из них будет выборка и по ним потом поиск будет
import { getRandomInteger } from '../util';
import { PRICE, ALL_OFFERS } from './const';
import { POINT_TYPES } from '../consts';

let allOffers = [];

function generateOffer(offer) {
  return {
    id: crypto.randomUUID(),
    title: `${offer.name} for ${offer.pointType}`,
    price: getRandomInteger(PRICE.min, PRICE.max / 10),
    pointType: offer.pointType,
  };
}

function generateAllOffers() {
  return ALL_OFFERS.map(generateOffer);
}

function selectOffersByType(pointType) {
  const selectedOffers = allOffers.filter((offer) => offer.pointType === pointType);
  return {
    type: pointType,
    offers: selectedOffers,
  };
}

function generateOffersByType() {
  allOffers = generateAllOffers();
  return POINT_TYPES.map(selectOffersByType);
}

export { generateOffersByType };
