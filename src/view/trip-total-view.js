import { createTripTotalTemplate } from '../templates/trip-total-template';
import AbstractView from '../framework/view/abstract-view';

export default class TripTotalView extends AbstractView {
  #totalPrice;

  constructor(totalPrice) {
    super();
    this.#totalPrice = totalPrice;
  }

  get template() {
    return createTripTotalTemplate(this.#totalPrice);
  }
}
