// форма редактирования точки - объединила все в одну view
import { createEventEditTemplate } from '../../templates/edit-form/form-template';
// import AbstractView from '../../framework/view/abstract-view';
import AbstractStatefulView from '../../framework/view/abstract-stateful-view';
import { getConformedOffers } from '../../model/util/updatePoint';
export default class EventEditView extends AbstractStatefulView {
  #formSubmitHandler = null;
  #offers = null;
  #destinations = null;
  // ф-я для выбора комплекта офферов при новом типе точки

  constructor({ pointData, offers, destinations, formSubmitHandler }) {
    // предусмотреть передачу данных по умолчанию для отрисовки пустой точки
    //constructor({point = BLANK_POINT, onFormSubmit})
    super();
    this._setState(EventEditView.parsePointToState(pointData)); // значение будет храниться в унаследованном поле _state
    this.#offers = offers;
    this.#destinations = destinations;
    this.#formSubmitHandler = formSubmitHandler;
    //this.#formResetHandler = formResetHandler; // ретро 10:03
    this._restoreHandlers(); // ретро 9:58
  }

  get template() {
    return createEventEditTemplate({
      pointState: this._state,
      offers: this.#offers,
      destinations: this.#destinations,
    });
  }

  _restoreHandlers = () => {
    // ретро 10:25 и 15:59
    // this.element.querySelector('event__rollup-btn').addEventListener('click', this.#onResetClick);
    this.element.querySelector('form.event').addEventListener('submit', this.#onFormSubmit);
    this.element.querySelector('.event__type-group').addEventListener('change', this.#onEventTypeChange); // это fieldset
    this.element.querySelector('.event__input--destination').addEventListener('change', this.#onDestinationChange);
    this.element.querySelector('.event__available-offers').addEventListener('change', this.#onOffersChange);
    this.element.querySelector('.event__input--price').addEventListener('change', this.#onPriceChange);

    // this.#setDatepickers();
  };

  #onFormSubmit = () => {
    this.#formSubmitHandler(EventEditView.parseStateToTask(this._state)); // сюда передаем данные для отправки на сервер, state после parse
  };

  #onEventTypeChange = (evt) => {
    this.updateElement({
      ...this._state,
      type: evt.target.value,
      offersInfo: getConformedOffers(evt.target.value, this.#offers), // подтягиваем новый комплект офферов - offersInfo, getMarkedOffers берем из модели
      offers: [], // обнуляем чекнутые офферы - offers
      // перенести желтый маркер в списке на выбранную точку
    });
  };

  #onDestinationChange = (evt) => {
    // ретро 17:31
    console.log('выбрали пункт назначения');
    console.log(this.#destinations);
    const selectedDestination = this.#destinations.find((destination) => destination.name === evt.target.value); // ПН вводится с клавиатуры, не выбирается из списка !!

    if (selectedDestination) {
      this.updateElement({
        ...this._state,
        destination: selectedDestination.id,
        destinationDescription: selectedDestination.description,
        destinationName: selectedDestination.name,
        destinationPhotos: selectedDestination.photos,
      });
    } else {
      this.updateElement({
        ...this._state,
        destination: null,
        destinationDescription: null,
        destinationName: null,
        destinationPhotos: null,
      });
    }
    // const selectedDestinationId = selectedDestination ? selectedDestination.destination : null; // обрабатывать как??
  };

  #onOffersChange = () => {
    console.log('выбрали офферы');
  };

  #onPriceChange = () => {
    console.log('изменили цену');
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
