// форма редактирования точки - объединила все в одну view
import { createEventEditTemplate } from '../../templates/edit-form/form-template';
import AbstractStatefulView from '../../framework/view/abstract-stateful-view';
import { getConformedOffers, getDestinationByID, getMarkedOffers } from '../../model/util/data-adapters';
export default class EventEditView extends AbstractStatefulView {
  #formSubmitHandler = null;
  #resetClickHandler = null;
  #pointData = null;
  #offers = null;
  #destinations = null;

  constructor({ pointData, offers, destinations, formSubmitHandler, resetClickHandler }) {
    // предусмотреть передачу данных по умолчанию для отрисовки пустой точки
    //constructor({point = BLANK_POINT, onFormSubmit})
    super();
    this._setState(EventEditView.parsePointToState(pointData, offers, destinations)); // значение будет храниться в унаследованном поле _state
    // this.#pointData = pointData;
    // this.#offers = offers;
    // this.#destinations = destinations;
    this.#formSubmitHandler = formSubmitHandler;
    this.#resetClickHandler = resetClickHandler; // ретро 10:03
    this._restoreHandlers(); // ретро 9:58
  }

  get template() {
    return createEventEditTemplate({
      pointState: this._state,
    });
  }

  reset = (point) => {
    //ретро 22:05 и в презентере ретро 22:52
    this.updateElement({ point });
    this.element.querySelector('form.event').reset(); // - ???
  };

  _restoreHandlers = () => {
    // ретро 10:25 и 15:59
    // this.element.querySelector('event__rollup-btn').addEventListener('click', this.#onResetClick);
    this.element.querySelector('form.event').addEventListener('submit', this.#onFormSubmit);
    this.element.querySelector('.event__type-group').addEventListener('change', this.#onEventTypeChange); // это fieldset
    this.element.querySelector('.event__input--destination').addEventListener('change', this.#onDestinationChange);
    this.element.querySelector('.event__available-offers').addEventListener('change', this.#onOffersChange);
    this.element.querySelector('.event__input--price').addEventListener('change', this.#onPriceChange);
    this.element.querySelector('.event__reset-btn').addEventListener('click', this.#resetClickHandler);

    // this.#setDatepickers();
  };

  #onFormSubmit = () => {
    this.#formSubmitHandler(EventEditView.parseStateToTask(this._state)); // сюда передаем данные для отправки на сервер, state после parse
  };

  #onEventTypeChange = (evt) => {
    this.updateElement({
      ...this._state,
      type: evt.target.value,
      offersInfo: getConformedOffers(evt.target.value, this.#offers).map((offer) => ({ isChecked: false, ...offer })), // подтягиваем новый комплект офферов, без поля isChecked
      offers: [], // обнуляем чекнутые офферы - offers
    });
  };

  #onDestinationChange = (evt) => {
    // ретро 17:31
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
    //ретро 18:20
    const checkedOffers = Array.from(this.element.querySelectorAll('event__offer-checkbox:checked'));
  };

  #onPriceChange = () => {
    console.log('изменили цену');
  };

  static parsePointToState(pointData, offers, destinations) {
    return {
      destinationName: getDestinationByID(pointData.destination, destinations).name,
      destinationDescription: getDestinationByID(pointData.destination, destinations).description,
      destinationPhotos: getDestinationByID(pointData.destination, destinations).photos,
      offersInfo: getMarkedOffers(pointData.type, pointData.offers, offers),
      ...pointData,
    };
  }

  static parseStateToPoint(state) {
    // ретро 7:24
    const pointData = { ...state };
    //обратное преобразование к формату данных, удаляем лишние поля

    // delete task.isDueDate;
    // delete task.isRepeating;

    return pointData;
  }
}
