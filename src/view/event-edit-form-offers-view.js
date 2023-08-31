// находятся в детялях формы
// контейнер для кнопок-офферов
import { createEventEditOffersTemplate } from '../templates/event-edit-form-offers-templates';
import { createElement } from '../render';

export default class EventEditOffersView {
  constructor(offersInfo) {
    this.offersInfo = offersInfo;
  }

  getTemplate() {
    return createEventEditOffersTemplate(this.offersInfo);
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
