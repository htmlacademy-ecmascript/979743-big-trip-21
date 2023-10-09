import { createTripAbouteTemplate } from '../templates/trip-aboute-template';
import AbstractView from '../framework/view/abstract-view';

export default class TripAbouteView extends AbstractView {
  #dateFrom = '';
  #dateTo = '';
  constructor({ totalDateFrom, totalDateTo }) {
    super();
    this.#dateFrom = totalDateFrom;
    this.#dateTo = totalDateTo;
  }

  get template() {
    return createTripAbouteTemplate({
      dateFrom: this.#dateFrom,
      dateTo: this.#dateTo,
    });
  }
}
