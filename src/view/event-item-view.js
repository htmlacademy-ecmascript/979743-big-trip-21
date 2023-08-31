// элемент списка точек
import { createEventItemTemplate } from '../templates/event-item-template';
import AbstractView from '../framework/view/abstract-view';
import dayjs from 'dayjs';
import { getPointDuration } from '../util';

export default class EventItemView extends AbstractView {
  constructor(pointInfo) {
    super();
    this.pointInfo = pointInfo;
  }

  adaptPointData() {
    return {
      type: this.pointInfo.type,
      destinationName: this.pointInfo.destinationName,
      date: dayjs(this.pointInfo.dateFrom).format('MMM DD'), // пока это возьмем в ка-ве даты события
      timeStart: dayjs(this.pointInfo.dateFrom).format('HH:mm'),
      timeEnd: dayjs(this.pointInfo.dateTo).format('HH:mm'),
      duration: getPointDuration(this.pointInfo.dateFrom, this.pointInfo.dateTo),
      basePrice: this.pointInfo.basePrice,
      checkedOffersInfo: this.pointInfo.checkedOffersInfo,
      isFavorite: this.pointInfo.isFavorite,
    };
  }

  get template() {
    return createEventItemTemplate(this.adaptPointData());
  }
}
