import { createTripTotalTemplate } from '../templates/trip-total-template';
import { createElement } from '../render';

export default class TripTotalView {
  getTemplate() {
    return createTripTotalTemplate();
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
