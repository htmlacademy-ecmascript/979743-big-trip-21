// секция, делатли в форме, контейнер для офферов и пункта назначения
import { createEventEditDetailsTemplate } from '../templates/event-edit-form-details-templates';
import { createElement } from '../render';

export default class EventEditDetailsView {
  getTemplate() {
    return createEventEditDetailsTemplate();
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
