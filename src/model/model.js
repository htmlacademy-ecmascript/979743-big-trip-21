// import { filterFuturePoints, filterPresentPoints, filterPastPoints } from './util/filters';
import Observable from '../framework/observable';
export default class Model extends Observable {
  #destinations;
  #offers = null;
  #points = null;
  #pointApiService = null;

  constructor({ destinations, offers, points, pointApiService }) {
    super();
    //сырые данные
    this.#destinations = destinations;
    this.#offers = offers;
    this.#points = points;
    this.#pointApiService = pointApiService;

    this.#pointApiService.points.then((pointsData) => console.log(pointsData));
    this.#pointApiService.destinations.then((destinationsData) => console.log(destinationsData));
    this.#pointApiService.offers.then((offersData) => console.log(offersData));
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

  updatePoint(updateType, update) {
    // update - это объект точки
    const pointIndex = this.#points.findIndex((point) => point.id === update.id);
    if (pointIndex === -1) {
      throw new Error("Can't update unexisting point");
    }

    this.#points = [
      // заменяем объект в массиве
      ...this.#points.slice(0, pointIndex),
      update,
      ...this.#points.slice(pointIndex + 1),
    ];

    this._notify(updateType, update);
  }

  addPoint(updateType, update) {
    this.#points = [
      // добавляем объект в массив
      update,
      ...this.#points,
    ];

    this._notify(updateType, update);
  }

  deletePoint(updateType, update) {
    const pointIndex = this.#points.findIndex((point) => point.id === update.id);
    if (pointIndex === -1) {
      throw new Error("Can't delete unexisting point");
    }

    this.#points = [
      // исключаем элемент из массива
      ...this.#points.slice(0, pointIndex),
      ...this.#points.slice(pointIndex + 1),
    ];

    this._notify(updateType);
  }

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
