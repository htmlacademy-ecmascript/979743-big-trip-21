// находятся в детялях формы
import { createEventEditOffersTemplate } from '../templates/event-edit-form-offers-templates';
import AbstractView from '../framework/view/abstract-view';

export default class EventEditOffersView extends AbstractView {
  #offersInfo;
  constructor(offersInfo) {
    //на входе масси объектов офферов
    super();
    this.#offersInfo = offersInfo;
  }

  get template() {
    return createEventEditOffersTemplate(this.#offersInfo);
  }
}
