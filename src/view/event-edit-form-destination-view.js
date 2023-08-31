import { createEventEditDestinationTemplate } from '../templates/event-edit-form-destination-templates';
import AbstractView from '../framework/view/abstract-view';

export default class EventEditDestinationView extends AbstractView {
  constructor(point) {
    super();
    this.point = point;
  }

  get template() {
    return createEventEditDestinationTemplate(this.point);
  }
}
