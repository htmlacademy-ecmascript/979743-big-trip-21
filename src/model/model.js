import dayjs from 'dayjs';
import { capitalize } from '../util';
import MockModel from './mock-model';
export default class Model {
  //-----получаем данные-------------
  data = new MockModel();

  destinations = this.data.getDestinations();
  offers = this.data.getOffers();
  points = this.data.generatePoints();

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

  adaptOpenPointData(index) {
    return {
      type: capitalize(this.points[index].type),
      typeImg: `img/icons/${this.points[index].type}.png`,
      // destinationId: this.points[0].destination, // ID!!
      destination: this.getDestinationByID(this.points[index].destination).name,
      destinationDescription: this.getDestinationByID(this.points[index].destination).description,
      descriptionPhotos: this.getDestinationByID(this.points[index].destination).photos, // массив объектов
      dateFrom: dayjs(this.points[index].dateFrom).format('DD/MM/YYTHH:mm'),
      dateTo: dayjs(this.points[index].dateTo).format('DD/MM/YYTHH:mm'),
      offers: this.getMarkedOffers(this.points[index].type, this.points[index].offers), // массив объектов
    };
  }
}
