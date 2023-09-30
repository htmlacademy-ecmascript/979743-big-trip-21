// форма редактирования точки - объединила все в одну view
import { createEventEditTemplate } from '../../templates/edit-form/form-template';
// import AbstractView from '../../framework/view/abstract-view';
import AbstractStatefulView from '../../framework/view/abstract-stateful-view';
export default class EventEditView extends AbstractStatefulView {
  #formSubmitHandler = null;
  constructor({ pointData, formSubmitHandler }) {
    // предусмотреть передачу данных по умолчанию для отрисовки пустой точки
    //constructor({point = BLANK_POINT, onFormSubmit})
    super();
    this._setState(EventEditView.parsePointToState(pointData));
    this.#formSubmitHandler = formSubmitHandler;
    this.element.querySelector('.event').addEventListener('submit', this.#onFormSubmit);
  }

  get template() {
    console.log(this._state);
    return createEventEditTemplate(this._state);
  }

  #onFormSubmit = () => {
    this.#formSubmitHandler(EventEditView.parseStateToTask(this._state)); // сюда передаем данные для отправки на сервер, state после parse
  };

  static parsePointToState(pointData) {
    return { ...pointData }; // потом подумаю, нужно ли что-то сюда добавлять
  }

  static parseStateToTask(state) {
    const pointData = { ...state };
    //обратное преобразование к формату данных, удаляем лишние поля
    // у меня пока point и state одинаковые

    // delete task.isDueDate;
    // delete task.isRepeating;

    return pointData;
  }
}
