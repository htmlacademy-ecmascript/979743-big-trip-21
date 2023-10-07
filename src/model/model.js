import Observable from '../framework/observable';
import dayjs from 'dayjs';
import { UpdateType } from '../consts';
export default class Model extends Observable {
  #pointApiService = null;
  #pointsData = [];
  #destinationsData = [];
  #offersData = [];

  constructor({ pointApiService }) {
    super();
    this.#pointApiService = pointApiService;
  }

  get offers() {
    console.log(this.#offersData);
    return this.#offersData;
  }

  get destinations() {
    return this.#destinationsData;
  }

  get points() {
    return this.#pointsData;
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

  async init() {
    try {
      const serverPoints = await this.#pointApiService.points;
      // console.log(serverPoints);
      this.#pointsData = serverPoints.map(this.#adaptPointToClient);
      // console.log(this.#pointsData[0].dateFrom instanceof Date); // true
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

  async updatePoint(updateType, update) {
    // update - это объект точки
    const pointIndex = this.#pointsData.findIndex((point) => point.id === update.id);
    if (pointIndex === -1) {
      throw new Error('Cant update unexisting point');
    }

    try {
      const response = await this.#pointApiService.updatePoint(update);
      const updatedPoint = this.#adaptPointToClient(response);
      this.#pointsData = [
        // заменяем объект в массиве
        ...this.#pointsData.slice(0, pointIndex),
        updatedPoint,
        ...this.#pointsData.slice(pointIndex + 1),
      ];
      this._notify(updateType, update);
    } catch (err) {
      console.log(err);
      throw new Error('Cant update task');
    }
  }

  async addPoint(updateType, update) {
    try {
      const response = await this.#pointApiService.addPoint(update);
      const newPoint = this.#adaptPointToClient(response);
      this.#pointsData = [
        // добавляем объект в массив
        newPoint,
        ...this.#pointsData,
      ];
      this._notify(updateType, update);
    } catch (err) {
      console.log(err);
      throw new Error('Cant add task');
    }
  }

  async deletePoint(updateType, update) {
    const pointIndex = this.#pointsData.findIndex((point) => point.id === update.id);
    if (pointIndex === -1) {
      throw new Error('Cant delete unexisting point');
    }

    try {
      await this.#pointApiService.deletePoint(update); // метод удаления задачи на сервере ничего не возвращает
      this.#pointsData = [
        // исключаем элемент из массива
        ...this.#pointsData.slice(0, pointIndex),
        ...this.#pointsData.slice(pointIndex + 1),
      ];
      this._notify(updateType);
    } catch (err) {
      console.log(err);
      throw new Error('Cant delete task');
    }
  }

  //------------- адаптация данных ---------------------------------------

  #adaptPointToClient(point) {
    const adaptedPoint = {
      ...point,
      basePrice: point.base_price,
      isFavorite: point.is_favorite,
      dateFrom: dayjs(point.date_from).toDate(),
      dateTo: dayjs(point.date_to).toDate(),
    };

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
}
