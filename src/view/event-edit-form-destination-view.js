import { createEventEditDestinationTemplate } from '../templates/event-edit-form-destination-templates';
import { createElement } from '../render';

export default class EventEditDestinationView {
  constructor(point) {
    this.point = point;
  }

  getTemplate() {
    return createEventEditDestinationTemplate(this.point);
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
