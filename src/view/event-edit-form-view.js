// форма
import { createEventEditTemplate } from '../templates/event-edit-form-template';
import { createElement } from '../render';

export default class EventEditView {
  getTemplate() {
    return createEventEditTemplate();
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
