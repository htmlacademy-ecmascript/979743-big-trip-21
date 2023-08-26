import dayjs from 'dayjs';
import { capitalize } from '../util';
import MockModel from './mock-model';
export default class Model {
  //-----получаем данные-------------
  data = new MockModel();

  destinations = this.data.getDestinations();
  offers = this.data.getOffers();
  points = this.data.generatePoints();
  //---------------------------------

  getDestinationByID(id) {
    return this.destinations.find((dest) => dest.id === id);
  }

  // getOfferById (id, offersArray) { // ищет один офер в массиве объектов по id, возвращает объект
  //   return offersArray.find((offer) => offer.id === id);
  // } // не придумала, как передать второй параметр - другой массив для поиска

  getMarkedOffers(type, checkedOfferIds) {
    // возвр массив объектов офферов, помечает чекнутые
    const conformedOffers = this.offers.find((offer) => offer.type === type).offers; // выбрали все офферы по типу
    const markedOffers = conformedOffers.map((offer) => {
      offer.isChecked = checkedOfferIds.includes(offer.id);
      return offer;
    });
    // return conformedOffers;
    return markedOffers;
  }

  // getOffersByIds(type, ids) {
  //   // получает массив id, возвращает массив объектов coond офферов
  //   // const conformedOffers = this.offers.find((offer) => offer.type === type).offers; // нашли объект с офферами, соотв-ми типу точки
  //   const conformedOffers = this.getOffersByType(type);
  //   const checkedOffers = [];
  //   for (let i = 0; i < ids.length; i++) {
  //     // не придумала, как передать второй параметр - другой массив для поиска в find
  //     const selectedOffer = conformedOffers.find((offer) => offer.id === ids[i]);
  //     checkedOffers.push(selectedOffer);
  //   }
  //   return checkedOffers;
  // }

  adaptOpenPointData() {
    return {
      type: capitalize(this.points[0].type),
      typeImg: `img/icons/${this.points[0].type}.png`,
      // destinationId: this.points[0].destination, // ID!!
      destination: this.getDestinationByID(this.points[0].destination).name,
      destinationDescription: this.getDestinationByID(this.points[0].destination).description,
      descriptionPhotos: this.getDestinationByID(this.points[0].destination).photos, // массив объектов
      dateFrom: dayjs(this.points[0].dateFrom).format('DD/MM/YYTHH:mm'),
      dateTo: dayjs(this.points[0].dateTo).format('DD/MM/YYTHH:mm'),
      offers: this.getMarkedOffers(this.points[0].type, this.points[0].offers), // массив объектов
    };
  }
}
