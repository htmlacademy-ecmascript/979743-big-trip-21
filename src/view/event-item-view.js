// элемент списка точек
import { createEventItemTemplate } from '../templates/event-item-template';
import { createElement } from '../render';

export default class EventItemView {
  constructor(pointInfo) {
    this.pointInfo = pointInfo;
  }

  getTemplate() {
    return createEventItemTemplate(this.pointInfo);
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
