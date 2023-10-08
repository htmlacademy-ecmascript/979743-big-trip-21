// элемент списка точек
import { createEventItemTemplate } from '../templates/event-item-template';
import AbstractView from '../framework/view/abstract-view';
import dayjs from 'dayjs';
import { getPointDuration } from '../util/common';
import { getDestinationByID, getCheckedOffers } from '../model/util/data-adapters';

export default class EventItemView extends AbstractView {
  #pointData = null;
  #offers = null;
  #destinations = null;
  #onEditClick = null;
  #favoriteClickHandler = null;

  constructor({ pointData, offers, destinations, onEditClick, favoriteClickHandler }) {
    super();
    this.#pointData = pointData;
    this.#offers = offers;
    this.#destinations = destinations;
    this.#onEditClick = onEditClick;
    this.#favoriteClickHandler = favoriteClickHandler;
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#onEditClick);
    this.element.querySelector('.event__favorite-btn').addEventListener('click', this.#onFavoriteClick);
  }

  #adaptPointData() {
    return {
      type: this.#pointData.type,
      destinationName: getDestinationByID(this.#pointData.destination, this.#destinations).name,
      date: dayjs(this.#pointData.dateFrom).format('MMM DD'), // пока это возьмем в ка-ве даты события
      timeStart: dayjs(this.#pointData.dateFrom).format('HH:mm'),
      timeEnd: dayjs(this.#pointData.dateTo).format('HH:mm'),
      duration: getPointDuration(this.#pointData.dateFrom, this.#pointData.dateTo),
      basePrice: this.#pointData.basePrice,
      checkedOffersInfo: getCheckedOffers(this.#pointData.type, this.#pointData.offers, this.#offers),
      isFavorite: this.#pointData.isFavorite,
    };
  }

  #onFavoriteClick = () => {
    this.#favoriteClickHandler(); // вносим изменения в данные, прилетела из презентара
    //при клике фокус на кнопке сохраняется, поэтому она не серенькая становится, а светло-желтая
  };

  get template() {
    return createEventItemTemplate(this.#adaptPointData());
  }
}
