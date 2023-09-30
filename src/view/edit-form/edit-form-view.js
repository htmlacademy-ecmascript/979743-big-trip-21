// форма редактирования точки
import { createEventEditTemplate } from '../../templates/edit-form/form-template';
import AbstractView from '../../framework/view/abstract-view';
export default class EventEditView extends AbstractView {
  #onFormSubmit = null;
  constructor(onFormSubmit) {
    // предусмотреть передачу данных по умолчанию для отрисовки пустой точки
    //constructor({point = BLANK_POINT, onFormSubmit})
    super();
    this.#onFormSubmit = onFormSubmit;
    this.element.querySelector('.event').addEventListener('submit', this.#onFormSubmit);
    //для #onFormSubmit придется делать обертку, чтобы передать параметр = данные для отправки на сервер
  }

  // onFormSubmit передается из презентера в виде стрелочной ф-ии;
  // возм потом добавить здесь обертку, которой будет передаваться параметр для отправки на сервер

  get template() {
    return createEventEditTemplate();
  }
}
