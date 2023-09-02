// открытая точка, heder формы
import { createEventEditHeaderTemplate } from '../templates/event-edit-form-header-template';
import AbstractView from '../framework/view/abstract-view';
import dayjs from 'dayjs';

export default class EventEditHeaderView extends AbstractView {
  #point;
  constructor(point) {
    super();
    //destinations будут нужны для выпадающего списка, потом сделаю; возм в модели сделать ф-ю, которая выдернет только названия
    this.#point = point; // это адаптированный в модели объект, один элемент массива точек
  }

  #getAdaptPointData() {
    return {
      type: this.#point.type,
      destinationName: this.#point.destinationName,
      dateFrom: dayjs(this.#point.dateFrom).format('DD/MM/YY'),
      dateTo: dayjs(this.#point.dateTo).format('DD/MM/YY'),
      basePrice: this.#point.basePrice,
    };
  }

  get template() {
    return createEventEditHeaderTemplate(this.#getAdaptPointData()); // передаем объект открытой точки
  }
}
