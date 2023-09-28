import { createEventEditDestinationTemplate } from '../../templates/edit-form/destination-template';
import AbstractView from '../../framework/view/abstract-view';

export default class EventEditDestinationView extends AbstractView {
  #point;
  constructor(point) {
    super();
    this.#point = point;
  }

  get template() {
    return createEventEditDestinationTemplate(this.#point);
  }
}
