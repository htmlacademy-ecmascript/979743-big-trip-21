// форма редактирования точки - объединила все в одну view
import { createEventEditTemplate } from '../../templates/edit-form/form-template';
import AbstractStatefulView from '../../framework/view/abstract-stateful-view';
import { getConformedOffers, getDestinationByID, getMarkedOffers } from '../../model/util/data-adapters';
import dayjs from 'dayjs';
import { DATA_FORMAT } from '../../consts';
import { formatDateStr } from '../../util/common';
export default class EventEditView extends AbstractStatefulView {
  #formSubmitHandler = null;
  #resetClickHandler = null;
  #offers = null;
  #destinations = null;
  #deleteClickHandler = null;

  constructor({ pointData, offers, destinations, formSubmitHandler, resetClickHandler, deleteClickHandler }) {
    // предусмотреть передачу данных по умолчанию для отрисовки пустой точки
    //constructor({point = BLANK_POINT, onFormSubmit})
    super();
    this._setState(EventEditView.parsePointToState(pointData, offers, destinations)); // значение будет храниться в унаследованном поле _state
    this.#offers = offers;
    this.#destinations = destinations;
    this.#formSubmitHandler = formSubmitHandler;
    this.#resetClickHandler = resetClickHandler; // ретро 10:03
    this.#deleteClickHandler = deleteClickHandler;
    this._restoreHandlers(); // ретро 9:58
  }

  // get destinationsList () {
  //   return this.#destinations.map((destination) => destination.name);
  // }

  get template() {
    return createEventEditTemplate({
      pointState: this._state,
      destinationNames: this.#destinations.map((destination) => destination.name), //для отрисовки выпадаюющего списка ПН
      // pointTypes: POINT_TYPES // из consts - для списка типов точек
    });
  }

  reset = (pointData, offers, destinations) => {
    //ретро 22:05 и в презентере ретро 22:52
    this.updateElement(EventEditView.parsePointToState(pointData, offers, destinations));
  };

  _restoreHandlers = () => {
    // ретро 10:25 и 15:59
    // this.element.querySelector('event__rollup-btn').addEventListener('click', this.#onResetClick); // нет этого элемента в разметке
    this.element.querySelector('form.event').addEventListener('submit', this.#onFormSubmit);
    this.element.querySelector('.event__type-group').addEventListener('change', this.#onEventTypeChange); // это fieldset
    this.element.querySelector('.event__input--destination').addEventListener('change', this.#onDestinationChange);
    this.element.querySelector('.event__available-offers').addEventListener('change', this.#onOffersChange);
    this.element.querySelector('.event__input--price').addEventListener('change', this.#onPriceChange);
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#resetClickHandler); // roll-up btn
    this.element.querySelector('.event__reset-btn').addEventListener('click', this.#onDeleteClick); // delete btn

    // this.#setDatepickers();
  };

  #onFormSubmit = (evt) => {
    evt.preventDefault(); // надо?
    this.#formSubmitHandler(EventEditView.parseStateToPoint(this._state)); // сюда передаем измененные данные для перерисовки и сохранения
  };

  #onEventTypeChange = (evt) => {
    this.updateElement({
      ...this._state,
      type: evt.target.value,
      offersInfo: getConformedOffers(evt.target.value, this.#offers).map((offer) => ({ isChecked: false, ...offer })), // подтягиваем новый комплект офферов
      offers: [], // обнуляем чекнутые офферы - offers
    });
  };

  #onDestinationChange = (evt) => {
    // ретро 17:31
    const selectedDestination = this.#destinations.find((destination) => destination.name === evt.target.value);

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

    console.log(this._state);
    // const selectedDestinationId = selectedDestination ? selectedDestination.destination : null; // обрабатывать как??
  };

  #onOffersChange = () => {
    //ретро 18:20
    const checkedOffers = Array.from(this.element.querySelectorAll('.event__offer-checkbox:checked'));
    const checkedOfferIds = checkedOffers.map((el) => el.id);
    this.updateElement({
      ...this._state,
      offers: checkedOffers.map((el) => el.id), // id чекнутых офферов
      offersInfo: getMarkedOffers(this._state.type, checkedOfferIds, this.#offers),
    });
    // переделать, чтобы отрисовывалась не вся точка, а только офферы
    // можно использовать не updateElement, а только this._setState(update);
  };

  #onPriceChange = (evt) => {
    const selectedPrice = evt.target.value;
    if (selectedPrice) {
      this.updateElement({
        ...this._state,
        basePrice: Number(evt.target.value),
      });
    }
  };

  #onDeleteClick = (evt) => {
    evt.preventDefault();
    this.#deleteClickHandler(EventEditView.parseStateToPoint(this._state));
  };

  static parsePointToState(pointData, offers, destinations) {
    return {
      ...pointData,
      destinationName: getDestinationByID(pointData.destination, destinations).name,
      destinationDescription: getDestinationByID(pointData.destination, destinations).description,
      destinationPhotos: getDestinationByID(pointData.destination, destinations).photos,
      offersInfo: getMarkedOffers(pointData.type, pointData.offers, offers),
      dateFrom: dayjs(pointData.dateFrom).format(DATA_FORMAT),
      dateTo: dayjs(pointData.dateTo).format(DATA_FORMAT),
    };
  }

  static parseStateToPoint(state) {
    // приводим к структуре сырых данных
    // ретро 7:24
    const transfotmedDateFromStr = formatDateStr(state.dateFrom);
    const transfotmedDateToStr = formatDateStr(state.dateTo);

    const pointData = {
      basePrice: state.basePrice,
      dateFrom: dayjs(transfotmedDateFromStr),
      dateTo: dayjs(transfotmedDateToStr),
      destination: state.destination,
      id: state.id,
      isFavorite: state.isFavorite,
      offers: state.offers,
      type: state.type,
    };

    return pointData;
  }
}
