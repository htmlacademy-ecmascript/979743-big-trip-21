// секция, делатли в форме, контейнер для офферов и пункта назначения
import { createEventEditDetailsTemplate } from '../templates/event-edit-form-details-templates';
import AbstractView from '../framework/view/abstract-view';

export default class EventEditDetailsView extends AbstractView {
  get template() {
    return createEventEditDetailsTemplate();
  }
}
