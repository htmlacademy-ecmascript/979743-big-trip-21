// форма, все ее внутренности отрисовываются здесь
import { createEventEditTemplate } from '../templates/event-edit-form-template';
import { createElement, render } from '../render';
export default class EventEditView {
  constructor(pointInfo) {
    this.pointInfo = pointInfo;
  }

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
