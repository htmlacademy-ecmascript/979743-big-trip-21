// одна кнопка - оффер
import { createEventEditOfferTemplate } from '../templates/event-edit-form-offer-template';
import { createElement } from '../render';

export default class EventEditOfferView {
  constructor(offer) {
    this.offer = offer;
  }

  adaptOfferData() {
    const checked = this.offer.isChecked ? 'checked' : '';
    return {
      isChecked: checked,
      title: this.offer.title,
      price: this.offer.price,
    };
  }

  getTemplate() {
    return createEventEditOfferTemplate(this.adaptOfferData());
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
