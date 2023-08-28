// heder формы
import { createEventEditHeaderTemplate } from '../templates/event-edit-form-header-template';
import { createElement } from '../render';

export default class EventEditHeaderView {
  constructor(destinations, points) {
    this.destinations = destinations;
    this.points = points;
  }

  getTemplate() {
    console.log('from view ', this.points);
    return createEventEditHeaderTemplate(this.points[0]); // передаем объект открытой точки
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
