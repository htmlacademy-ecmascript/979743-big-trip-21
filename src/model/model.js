import dayjs from 'dayjs';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
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

  // #adaptPoints(pointsArray) { // поднадобится для сортировки
  //   // на входе массив сырых точек, на выходе массив тех же точек адаптированных
  //   return pointsArray.map((point) => this.#adaptPointData(point));
  // }

  get allAdaptedPoints() {
    // возвращает адаптированными все точки
    return this.#points.map((point) => this.#adaptPointData(point));
  }

  //-------------фильтры-----------------------------------------------------
  get futurePoints() {
    // дата начала события больше текущей даты
    const currentDate = dayjs();
    const filterdPoints = this.#points.filter((point) => currentDate.isBefore(point.dateFrom, 'date'));
    return filterdPoints.map((point) => this.#adaptPointData(point));
  }

  get presentPoints() {
    // дата начала события меньше (или равна) текущей даты, а дата окончания больше (или равна) текущей даты
    const currentDate = dayjs();
    dayjs.extend(isSameOrAfter);
    dayjs.extend(isSameOrBefore);
    const filterdPoints = this.#points.filter(
      (point) => currentDate.isSameOrAfter(point.dateFrom, 'date') && currentDate.isSameOrBefore(point.dateTo, 'date')
    );
    return filterdPoints.map((point) => this.#adaptPointData(point));
  }

  get pastPoints() {
    // дата окончания маршрута меньше, чем текущая
    const currentDate = dayjs();
    const filterdPoints = this.#points.filter((point) => currentDate.isAfter(point.dateTo, 'date'));
    return filterdPoints.map((point) => this.#adaptPointData(point));
  }

  // ----------- возвращаем сырые данные - надо ли?-----------------------------
  get destinations() {
    return this.#destinations;
  }

  get offers() {
    return this.#offers;
  }

  get points() {
    return this.#points;
  }
}
