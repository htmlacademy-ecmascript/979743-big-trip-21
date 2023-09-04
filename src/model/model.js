import dayjs from 'dayjs';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
export default class Model {
  #destinations;
  #offers;
  #points;

  constructor({ destinations, offers, points }) {
    this.#destinations = destinations;
    this.#offers = offers;
    this.#points = points;
  }

  //-------------фильтры
  getFuturePoints() {
    // возвращает сырые данные!!
    // дата начала события больше текущей даты
    const currentDate = dayjs();
    return this.#points.filter((point) => currentDate.isBefore(point.dateFrom, 'date'));
  }

  getPresentPoints() {
    // возвращает сырые данные!!
    // дата начала события меньше (или равна) текущей даты, а дата окончания больше (или равна) текущей даты
    const currentDate = dayjs();
    dayjs.extend(isSameOrAfter);
    dayjs.extend(isSameOrBefore);
    return this.#points.filter(
      (point) => currentDate.isSameOrAfter(point.dateFrom, 'date') && currentDate.isSameOrBefore(point.dateTo, 'date')
    );
  }

  getPastPoints() {
    // возвращает сырые данные!!
    // дата окончания маршрута меньше, чем текущая
    const currentDate = dayjs();
    return this.#points.filter((point) => currentDate.isAfter(point.dateTo, 'date'));
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

  get destinations() {
    return this.#destinations;
  }

  get offers() {
    return this.#offers;
  }

  get points() {
    // сырые данные
    return this.#points;
  }

  get adaptedPoints() {
    console.log(this.#points);
    return this.#points.map((point) => this.#adaptPointData(point));
  }
}
