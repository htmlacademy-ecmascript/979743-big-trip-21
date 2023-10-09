import { createTripAbouteTemplate } from '../templates/trip-aboute-template';
import AbstractView from '../framework/view/abstract-view';

export default class TripAbouteView extends AbstractView {
  #dateFrom = '';
  #dateTo = '';
  #totalStartDestionation = '';
  #totalEndDestination = '';
  #totalTransitionalDestination = '';
  constructor(
    { totalDateFrom, totalDateTo },
    { totalStartDestionation, totalEndDestination, totalTransitionalDestination }
  ) {
    super();
    this.#dateFrom = totalDateFrom;
    this.#dateTo = totalDateTo;
    this.#totalStartDestionation = totalStartDestionation;
    this.#totalEndDestination = totalEndDestination;
    this.#totalTransitionalDestination = totalTransitionalDestination;
  }

  get template() {
    return createTripAbouteTemplate({
      dateFrom: this.#dateFrom,
      dateTo: this.#dateTo,
      totalStartDestionation: this.#totalStartDestionation,
      totalEndDestination: this.#totalEndDestination,
      totalTransitionalDestination: this.#totalTransitionalDestination,
    });
  }
}
