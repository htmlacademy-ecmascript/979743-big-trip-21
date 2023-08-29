// import dayjs from 'dayjs';
// import { capitalize } from '../util';
// import MockModel from './mock-model';
export default class Model {
  constructor(data) {
    this.destinations = data.getDestinations();
    this.offers = data.getOffers();
    this.points = data.generatePoints();
  }

  getDestinationByID(id) {
    return this.destinations.find((dest) => dest.id === id);
  }

  getMarkedOffers(type, checkedOfferIds) {
    // возвр массив объектов офферов, помечает чекнутые
    const conformedOffers = this.offers.find((offer) => offer.type === type).offers; // выбрали все офферы по типу
    const markedOffers = conformedOffers.map((offer) => {
      // отметили чекнутые
      offer.isChecked = checkedOfferIds.includes(offer.id);
      return offer;
    });
    return markedOffers;
  }

  getCheckedOffers(type, checkedOfferIds) {
    const conformedOffers = this.offers.find((offer) => offer.type === type).offers; // выбрали все офферы по типу
    const checkedOffers = conformedOffers.filter((offer) => checkedOfferIds.includes(offer.id));
    return checkedOffers;
  }

  adaptPointData(originalPoint) {
    // на входе объект, элемент из массива точек
    // на выходе тот же объект, дополненный полями с полной инфой по ПН и офферам
    return {
      destinationName: this.getDestinationByID(originalPoint.destination).name,
      destinationDescription: this.getDestinationByID(originalPoint.destination).description,
      destinationPhotos: this.getDestinationByID(originalPoint.destination).photos, // массив объектов
      offersInfo: this.getMarkedOffers(originalPoint.type, originalPoint.offers), // массив объектов всех офферов для данного типа
      checkedOffersInfo: this.getCheckedOffers(originalPoint.type, originalPoint.offers),
      ...originalPoint,
    };
  }

  getPointTypeList() {}

  getDestinations() {
    return this.destinations;
  }

  getOffers() {
    return this.offers;
  }

  getPoints() {
    // сырые данные
    return this.points;
  }
}
