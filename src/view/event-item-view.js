// элемент списка точек
import { createEventItemTemplate } from '../templates/event-item-template';
import AbstractView from '../framework/view/abstract-view';
import dayjs from 'dayjs';
import { getPointDuration } from '../util';

export default class EventItemView extends AbstractView {
  #pointInfo;
  #onEditClick = null;

  constructor(pointInfo, onEditClick) {
    // предусмотреть передачу данных по умолчанию для отрисовки пустой точки
    super();
    this.#pointInfo = pointInfo;
    this.#onEditClick = onEditClick;
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#onEditClick);
  }

  #adaptPointData() {
    return {
      type: this.#pointInfo.type,
      destinationName: this.#pointInfo.destinationName,
      date: dayjs(this.#pointInfo.dateFrom).format('MMM DD'), // пока это возьмем в ка-ве даты события
      timeStart: dayjs(this.#pointInfo.dateFrom).format('HH:mm'),
      timeEnd: dayjs(this.#pointInfo.dateTo).format('HH:mm'),
      duration: getPointDuration(this.#pointInfo.dateFrom, this.#pointInfo.dateTo),
      basePrice: this.#pointInfo.basePrice,
      checkedOffersInfo: this.#pointInfo.checkedOffersInfo,
      isFavorite: this.#pointInfo.isFavorite,
    };
  }

  get template() {
    // console.log('Item ', this.#adaptPointData());
    return createEventItemTemplate(this.#adaptPointData());
  }
}
