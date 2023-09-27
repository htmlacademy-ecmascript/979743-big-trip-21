import { filterFuturePoints, filterPresentPoints, filterPastPoints } from './filters';

import { FILTER_TYPES, SORT_TYPES } from '../consts';
export default class Model {
  #destinations;
  #offers;
  #points;

  constructor({ destinations, offers, points }) {
    //сырые данные
    this.#destinations = destinations;
    this.#offers = offers;
    this.#points = points;
  }

  #getDestinationByID(id) {
    return this.#destinations.find((dest) => dest.id === id);
  }

  #getMarkedOffers(type, checkedOfferIds) {
    // возвр массив объектов офферов, помечает чекнутые
    const conformedOffers = this.#offers.find((offer) => offer.type === type).offers; // выбрали все офферы по типу
    const markedOffers = conformedOffers.map((offer) => {
      // отметили чекнутые
      offer.isChecked = checkedOfferIds.includes(offer.id);
      return offer;
    });
    return markedOffers;
  }

  #getCheckedOffers(type, checkedOfferIds) {
    const conformedOffers = this.#offers.find((offer) => offer.type === type).offers; // выбрали все офферы по типу
    const checkedOffers = conformedOffers.filter((offer) => checkedOfferIds.includes(offer.id));
    return checkedOffers;
  }

  #adaptPointData(originalPoint) {
    // на входе объект, элемент из массива точек
    // на выходе тот же объект, дополненный полями с полной инфой по ПН и офферам
    return {
      destinationName: this.#getDestinationByID(originalPoint.destination).name,
      destinationDescription: this.#getDestinationByID(originalPoint.destination).description,
      destinationPhotos: this.#getDestinationByID(originalPoint.destination).photos, // массив объектов
      offersInfo: this.#getMarkedOffers(originalPoint.type, originalPoint.offers), // массив объектов всех офферов для данного типа
      checkedOffersInfo: this.#getCheckedOffers(originalPoint.type, originalPoint.offers),
      ...originalPoint,
    };
  }

  get allAdaptedPoints() {
    // возвращает адаптированными все точки
    return this.#points.map((point) => this.#adaptPointData(point));
  }

  // ------------ преобразуем массив фильтров в массив объектов, чтобы потом добавить к нему функц-обработчики
  get filters() {
    const filters = FILTER_TYPES.map((filter) => ({ filterName: filter, isChecked: false }));
    filters[0].isChecked = true; // фильтр, чекнутый по умолчанию
    return filters;
  }

  //-------------фильтры - возвращают отфильтроанный массив точек----------------------------------------------------
  get futurePoints() {
    return filterFuturePoints(this.#points).map((point) => this.#adaptPointData(point));
  }

  get presentPoints() {
    return filterPresentPoints(this.#points).map((point) => this.#adaptPointData(point));
  }

  get pastPoints() {
    return filterPastPoints(this.#points).map((point) => this.#adaptPointData(point));
  }
  // ------------ преобразуем массив сорировок в массив объектов, чтобы потом добавить к нему функц-обработчики
  // get sortings() {
  //   return SORT_TYPES.map((sorting) => ({ sortType: sorting }));
  // }
}
