import { createTotalTemplate } from '../templates/total-template';
import { createElement } from '../render';

export default class TotalView {
  getTemplate() {
    return createTotalTemplate();
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
