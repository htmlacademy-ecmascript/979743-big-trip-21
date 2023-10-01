// форма редактирования точки - объединила все в одну view
import { createEventEditTemplate } from '../../templates/edit-form/form-template';
// import AbstractView from '../../framework/view/abstract-view';
import AbstractStatefulView from '../../framework/view/abstract-stateful-view';
export default class EventEditView extends AbstractStatefulView {
  #formSubmitHandler = null;
  #offers = null;
  #destnations = null;

  constructor({ pointData, offers, destnations, formSubmitHandler }) {
    // предусмотреть передачу данных по умолчанию для отрисовки пустой точки
    //constructor({point = BLANK_POINT, onFormSubmit})
    super();
    this._setState(EventEditView.parsePointToState(pointData));
    this.#offers = offers;
    this.#destnations = destnations;
    this.#formSubmitHandler = formSubmitHandler;
    //this.#formResetHandler = formResetHandler; // ретро 10:03
    this._restoreHandlers(); // ретро 9:58

    // this.element.querySelector('.event').addEventListener('submit', this.#onFormSubmit);

    // this.element.querySelector('.event__type-group').addEventListener('click', this.#onEventTypeClick); // это fieldset
    // this.element.querySelector('.event__input--destination').addEventListener('change', this.#onDestinationChange);
  }

  get template() {
    return createEventEditTemplate({
      pointState: this._state,
      offers: this.#offers,
      destnations: this.#destnations,
    });
  }

  _restoreHandlers = () => {
    // ретро 10:25
    // this.element.querySelector('event__rollup-btn').addEventListener('click', this.#onResetClick);
    this.element.querySelector('form.event').addEventListener('submit', this.#onFormSubmit);
    this.element.querySelector('.event__type-group').addEventListener('change', this.#onEventTypeChange); // это fieldset
    this.element.querySelector('.event__input--destination').addEventListener('change', this.#onDestinationChange);
    this.element.querySelector('.event__available-offers').addEventListener('change', this.#onOffersChange);
    this.element.querySelector('.event__input--price').addEventListener('change', this.#onPriceChange);

    // this.#setDatepickers();
    // еще 2 обаботчика
  };

  #onFormSubmit = () => {
    this.#formSubmitHandler(EventEditView.parseStateToTask(this._state)); // сюда передаем данные для отправки на сервер, state после parse
  };

  #onEventTypeChange = (evt) => {
    console.log('выбрали тип точки');
    console.log(evt.target);
  };

  #onDestinationChange = () => {
    console.log('выбрали пункт назначения');
  };

  #onOffersChange = () => {
    console.log('выбрали офферы');
  };

  #onPriceChange = () => {
    console.log('выбрали офферы');
  };

  static parsePointToState(pointData) {
    return { ...pointData }; // потом подумаю, нужно ли что-то сюда добавлять
  }

  static parseStateToTask(state) {
    // ретро 7:24
    const pointData = { ...state };
    //обратное преобразование к формату данных, удаляем лишние поля
    // у меня пока point и state одинаковые

    // delete task.isDueDate;
    // delete task.isRepeating;

    return pointData;
  }
}
