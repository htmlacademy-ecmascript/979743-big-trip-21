import { filterFuturePoints, filterPresentPoints, filterPastPoints } from './util/filters';
import { getConformedOffers } from './util/updatePoint';
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
    const conformedOffers = getConformedOffers(type, this.#offers); // выбрали все офферы по типу
    const markedOffers = conformedOffers.map((offer) => {
      // отметили чекнутые
      offer.isChecked = checkedOfferIds.includes(offer.id);
      return offer;
    });
    // const markedOffers = conformedOffers;
    return markedOffers;
  }

  #getCheckedOffers(type, checkedOfferIds) {
    // возвр массив объектов чекнутых офферов
    const conformedOffers = getConformedOffers(type, this.#offers); // выбрали все офферы по типу
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
    // return []; // для проверки заглушки
  }

  //-------------вычисляем общую стоимость---------
  get totalPrice() {
    // ----- добавить еще стоимость офферов (!!!)
    const initialCost = 0;
    return this.#points
      .map((point) => point.basePrice)
      .reduce((accumulator, currentValue) => accumulator + currentValue, initialCost);
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

  //-------------возвращаем все офферы по типам для выбора их в форме редактирования точки ---------------------------------------
  get offers() {
    return this.#offers;
  }

  get destinations() {
    return this.#destinations;
  }
}
