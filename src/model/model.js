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
      offer.isChecked = checkedOfferIds.includes(offer.id);
      return offer;
    });
    return markedOffers;
  }

  adaptPointData(originalPoint) {
    // это для открытой точки
    // на входе объект, элемент из массива точек
    // на выходе тот же объект, дополненный полями с полной инфой по ПН и офферам
    return {
      // id: originalPoint.id,
      // type: capitalize(originalPoint.type),
      // typeImg: `img/icons/${originalPoint.type}.png`,
      destinationName: this.getDestinationByID(originalPoint.destination).name,
      destinationDescription: this.getDestinationByID(originalPoint.destination).description,
      destinationPhotos: this.getDestinationByID(originalPoint.destination).photos, // массив объектов
      // dateFrom: dayjs(originalPoint.dateFrom).format('DD/MM/YYTHH:mm'),
      // dateTo: dayjs(originalPoint.dateTo).format('DD/MM/YYTHH:mm'),
      offersInfo: this.getMarkedOffers(originalPoint.type, originalPoint.offers), // массив объектов
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
