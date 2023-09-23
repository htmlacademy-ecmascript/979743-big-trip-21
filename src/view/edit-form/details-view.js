// секция, делатли в форме, контейнер для офферов и пункта назначения
import { createEventEditDetailsTemplate } from '../../templates/edit-form/details-template';
import AbstractView from '../../framework/view/abstract-view';

export default class EventEditDetailsView extends AbstractView {
  get template() {
    return createEventEditDetailsTemplate();
  }
}
