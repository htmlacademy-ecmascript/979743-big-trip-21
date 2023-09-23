// форма редактирования точки
import { createEventEditTemplate } from '../../templates/edit-form/form-template';
import AbstractView from '../../framework/view/abstract-view';
export default class EventEditView extends AbstractView {
  #onFormSubmit = null;
  constructor(onFormSubmit) {
    // предусмотреть передачу данных по умолчанию для отрисовки пустой точки
    super();
    this.#onFormSubmit = onFormSubmit;
    this.element
      .querySelector('.event')
      .addEventListener('submit', this.#onFormSubmit);
  }

  get template() {
    return createEventEditTemplate();
  }
}
