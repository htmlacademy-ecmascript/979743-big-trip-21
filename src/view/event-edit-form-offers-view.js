import { createEventEditOffersTemplate } from '../templates/event-edit-form-offers-templates';
import { createElement } from '../render';

export default class EventEditOffersView {
  getTemplate() {
    return createEventEditOffersTemplate();
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
