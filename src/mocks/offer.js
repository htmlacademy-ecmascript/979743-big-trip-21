import { getRandomInteger } from '../util';
import { PRICE } from './const';

function generateOffer(type) {
  return {
    id: crypto.randomUUID(),
    title: `Offer ${type}`, // правильнее было бы выбирать случайно из массива офферов
    price: getRandomInteger(PRICE.min, PRICE.max / 10),
  };
}

export { generateOffer };
