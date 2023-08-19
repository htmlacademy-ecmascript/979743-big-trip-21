// форма
import { createFiltersTemplate } from '../templates/filters-temlate';
import { createElement } from '../render';

export default class TripFiltersView {
  getTemplate() {
    return createFiltersTemplate();
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
