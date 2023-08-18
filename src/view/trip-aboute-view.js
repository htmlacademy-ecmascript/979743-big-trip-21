import { createTripAbouteTemplate } from '../templates/trip-aboute-template';
import { createElement } from '../render';

export default class TripAboutelView {
  getTemplate() {
    return createTripAbouteTemplate();
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
