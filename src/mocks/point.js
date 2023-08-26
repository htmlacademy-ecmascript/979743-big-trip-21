// генерирует объект для одной точки
import { getRandomInteger } from '../util';
import { PRICE } from './const';
import { getDate } from './util';

function generatePoint(type, destinationID, offerIds) {
  return {
    id: crypto.randomUUID(),
    basePrice: getRandomInteger(PRICE.min, PRICE.max),
    dateFrom: getDate({ next: false }),
    dateTo: getDate({ next: true }),
    destination: destinationID,
    isFavorite: !!getRandomInteger(0, 1),
    offers: offerIds,
    type,
  };
}

export { generatePoint };
