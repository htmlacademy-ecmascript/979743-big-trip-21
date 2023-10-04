// import { filterFuturePoints, filterPresentPoints, filterPastPoints } from './util/filters';
import Observable from '../framework/observable';
import dayjs from 'dayjs';
import { UpdateType } from '../consts';
export default class Model extends Observable {
  #destinations;
  #offers = null;
  #points = null;
  #pointApiService = null;
  #pointsData = [];
  #destinationsData = [];
  #offersData = [];

  constructor({ destinations, offers, points, pointApiService }) {
    super();
    //сырые данные
    this.#destinations = destinations;
    this.#offers = offers;
    this.#points = points;
    this.#pointApiService = pointApiService;

    // this.#pointApiService.points.then((pointsData) => {
    //   console.log(pointsData.map(this.#adaptPointToClient));
    // });
    // this.#pointApiService.destinations.then((destinationsData) =>
    //   console.log(destinationsData.map(this.#adaptDestinationToClient))
    // );
    // this.#pointApiService.offers.then((offersData) => console.log(offersData.map(this.#adaptOfferToClient)));
  }

  //-------------вычисляем общую стоимость---------
  get totalPrice() {
    // ----- добавить еще стоимость офферов (!!!)
    // const initialCost = 0;
    // return this.#points
    //   .map((point) => point.basePrice)
    //   .reduce((accumulator, currentValue) => accumulator + currentValue, initialCost);
    return '3456';
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

  async init() {
    try {
      const serverPoints = await this.#pointApiService.points;
      this.#pointsData = serverPoints.map(this.#adaptPointToClient);
    } catch (err) {
      this.#pointsData = [];
    }

    try {
      const serverDestinations = await this.#pointApiService.destinations;
      this.#destinationsData = serverDestinations.map(this.#adaptDestinationToClient);
    } catch (err) {
      this.#destinationsData = [];
    }

    try {
      const serverOffers = await this.#pointApiService.offers;
      this.#offersData = serverOffers.map(this.#adaptOfferToClient);
    } catch (err) {
      this.#offersData = [];
    }

    this._notify(UpdateType.INIT);
  }

  updatePoint(updateType, update) {
    // update - это объект точки
    const pointIndex = this.#points.findIndex((point) => point.id === update.id);
    if (pointIndex === -1) {
      throw new Error('Cant update unexisting point');
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
      throw new Error('Cant delete unexisting point');
    }

    this.#points = [
      // исключаем элемент из массива
      ...this.#points.slice(0, pointIndex),
      ...this.#points.slice(pointIndex + 1),
    ];

    this._notify(updateType);
  }

  //------------- адаптация данных ---------------------------------------

  #adaptPointToClient(point) {
    const adaptedPoint = {
      ...point,
      basePrice: point.base_price,
      isFavorite: point.is_favorite,
      dateFrom: dayjs(point.date_from),
      dateTo: dayjs(point.date_to),
    };

    // delete adaptedPoint['base_price'];
    // delete adaptedPoint['is_favorite'];
    delete adaptedPoint.base_price;
    delete adaptedPoint.is_favorite;
    delete adaptedPoint.date_from;
    delete adaptedPoint.date_to;

    return adaptedPoint;
  }

  #adaptDestinationToClient(destination) {
    const adaptedDestination = {
      ...destination,
      photos: destination.pictures.map((picture) => ({ alt: picture.description, src: picture.src })),
    };

    delete adaptedDestination.pictures;

    return adaptedDestination;
  }

  #adaptOfferToClient(offer) {
    // адаптировать не надо, структура соответствует; на всяк случай
    const adaptedOffer = {
      ...offer,
    };

    return adaptedOffer;
  }

  //------------- отдаем сырые данные, адаптация в шаблоне ---------------------------------------
  get offers() {
    // return this.#offers;
    return this.#offersData;
  }

  get destinations() {
    // return this.#destinations;
    return this.#destinationsData;
  }

  get points() {
    // return this.#points;
    return this.#pointsData;
  }
}
