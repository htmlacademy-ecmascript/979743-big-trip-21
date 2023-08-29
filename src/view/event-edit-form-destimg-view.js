import { createEventEditDestImgTemplate } from '../templates/event-edit-form-destimg-template';
import { createElement } from '../render';

export default class EventEditDestImgView {
  constructor(photo) {
    this.photo = photo;
  }

  getTemplate() {
    return createEventEditDestImgTemplate(this.photo);
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
