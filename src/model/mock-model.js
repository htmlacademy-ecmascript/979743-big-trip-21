// возвращает данные - массив точек в той структуре, как приходит с сервера
// и возвращает сгенерированные данные о пунктах назнач и офферах, чтобы потом можно было делать поиск
import { generateOffersByType } from '../mocks/offer';
import { generateAllDestinations } from '../mocks/destination';
import { generatePoint } from '../mocks/point';
import { getRandomArrayElement, getRandomInteger } from '../util/common';
import { POINTS_COUNT, POINT_TYPES } from '../consts';

export default class MockModel {
  destinations = generateAllDestinations();
  offers = generateOffersByType();

  getDestinations() {
    return this.destinations;
  }

  getOffers() {
    return this.offers;
  }

  generateOnePoint() {
    // генерирует массив данных со структурой, которая приходит с сервера
    const type = getRandomArrayElement(POINT_TYPES); // выбираем случайный тип точки
    const destination = getRandomArrayElement(this.destinations); //выбираем случайный пункт назначения
    // выбираем массив оферов, соотв-й типу точки
    const conformingOffers = this.offers.find((offer) => offer.type === type); //один объект
    // выбрать случ несколько из них
    const checkedOffersCount = getRandomInteger(0, conformingOffers.offers.length);
    const checkedOffers = conformingOffers.offers.slice(0, checkedOffersCount);
    const checkedOfferIds = checkedOffers.map((offer) => offer.id); // slice??
    return generatePoint(type, destination.id, checkedOfferIds);
  }

  generatePoints() {
    // возвращает итоговый массив данных, как-будто с сервера
    const pointsCount = getRandomInteger(1, POINTS_COUNT);
    return Array.from({ length: pointsCount }, () => this.generateOnePoint());
  }
}
