// элемент списка точек
import { createEventItemTemplate } from '../templates/event-item-template';
import { createElement } from '../render';
import dayjs from 'dayjs';
import { getPointDuration } from '../util';

export default class EventItemView {
  constructor(pointInfo) {
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

  getTemplate() {
    return createEventItemTemplate(this.adaptPointData());
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }
    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
