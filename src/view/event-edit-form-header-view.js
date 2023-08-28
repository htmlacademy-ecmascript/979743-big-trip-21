// открытая точка, heder формы
import { createEventEditHeaderTemplate } from '../templates/event-edit-form-header-template';
import { createElement } from '../render';
import dayjs from 'dayjs';

export default class EventEditHeaderView {
  constructor(destinations, point) {
    this.destinations = destinations;
    this.point = point; // это адаптированный в модели объект, один элемент массива точек
  }

  getAdaptPointData() {
    return {
      type: this.point.type,
      destinationName: this.point.destinationName,
      dateFrom: dayjs(this.point.dateFrom).format('DD/MM/YY'),
      dateTo: dayjs(this.point.dateTo).format('DD/MM/YY'),
    };
  }

  getTemplate() {
    console.log('from view ', this.point);
    console.log('from view adapted', this.getAdaptPointData());
    return createEventEditHeaderTemplate(this.getAdaptPointData()); // передаем объект открытой точки
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
