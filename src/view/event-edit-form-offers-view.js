// находятся в детялях формы
// контейнер для кнопок-офферов
import { createEventEditOffersTemplate } from '../templates/event-edit-form-offers-templates';
import AbstractView from '../framework/view/abstract-view';

export default class EventEditOffersView extends AbstractView {
  constructor(offersInfo) {
    super();
    this.offersInfo = offersInfo;
  }

  get template() {
    return createEventEditOffersTemplate(this.offersInfo);
  }
}
