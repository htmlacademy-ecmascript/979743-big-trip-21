// import { filterFuturePoints, filterPresentPoints, filterPastPoints } from './util/filters';
// import { getConformedOffers } from './util/data-adapters';
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

  //-------------вычисляем общую стоимость---------
  get totalPrice() {
    // ----- добавить еще стоимость офферов (!!!)
    const initialCost = 0;
    return this.#points
      .map((point) => point.basePrice)
      .reduce((accumulator, currentValue) => accumulator + currentValue, initialCost);
  }

  //-------------фильтры - возвращают отфильтроанный массив точек----------------------------------------------------
  // переделать, чтобы принимали сырые данные на вход, не адаптированные
  // get futurePoints() {
  //   return filterFuturePoints(this.#points).map((point) => this.#adaptPointData(point));
  // }

  // get presentPoints() {
  //   return filterPresentPoints(this.#points).map((point) => this.#adaptPointData(point));
  // }

  // get pastPoints() {
  //   return filterPastPoints(this.#points).map((point) => this.#adaptPointData(point));
  // }

  //------------- отдаем сырые данные, адаптация в шаблоне ---------------------------------------
  get offers() {
    return this.#offers;
  }

  get destinations() {
    return this.#destinations;
  }

  get points() {
    return this.#points;
  }
}
