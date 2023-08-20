import { createTripInfoTemplate } from '../templates/trip-info-template';
import { createElement } from '../render';

export default class TripInfoView {
  getTemplate() {
    return createTripInfoTemplate();
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
