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
    // console.log(this.#offersInfo);
    return createEventEditOffersTemplate(this.#offersInfo);
  }
}
