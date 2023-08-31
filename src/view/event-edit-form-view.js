// форма редактирования точки
import { createEventEditTemplate } from '../templates/event-edit-form-template';
import AbstractView from '../framework/view/abstract-view';
export default class EventEditView extends AbstractView {
  get template() {
    return createEventEditTemplate();
  }
}
