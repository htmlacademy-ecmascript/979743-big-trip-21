// форма редактирования точки - объединила все в одну view
import { createEventEditTemplate } from '../../templates/edit-form/form-template';
import AbstractStatefulView from '../../framework/view/abstract-stateful-view';
import { getConformedOffers, getDestinationByID, getMarkedOffers } from '../../model/util/data-adapters';
import dayjs from 'dayjs';
import { DATA_FORMAT } from '../../consts';
import { formatDateStr } from '../../util/common';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

export default class EventEditView extends AbstractStatefulView {
  #formSubmitHandler = null;
  #resetClickHandler = null;
  #offers = null;
  #destinations = null;
  #deleteClickHandler = null;
  #datepickerFrom = null;
  #datepickerTo = null;

  constructor({ pointData, offers, destinations, formSubmitHandler, resetClickHandler, deleteClickHandler }) {
    // предусмотреть передачу данных по умолчанию для отрисовки пустой точки
    //constructor({point = BLANK_POINT, onFormSubmit})
    super();
    this._setState(EventEditView.parsePointToState(pointData, offers, destinations)); // значение будет храниться в унаследованном поле _state
    this.#offers = offers;
    this.#destinations = destinations;
    this.#formSubmitHandler = formSubmitHandler;
    this.#resetClickHandler = resetClickHandler; // ретро 10:03
    this.#deleteClickHandler = deleteClickHandler; // для новой точки - это пустая ф-я
    this._restoreHandlers(); // ретро 9:58
  }

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
    this.element.querySelector('form.event').addEventListener('submit', this.#onFormSubmit);
    this.element.querySelector('.event__type-group').addEventListener('change', this.#onEventTypeChange); // это fieldset
    this.element.querySelector('.event__input--destination').addEventListener('change', this.#onDestinationChange);
    this.element.querySelector('.event__available-offers').addEventListener('change', this.#onOffersChange);
    this.element.querySelector('.event__input--price').addEventListener('change', this.#onPriceChange);
    this.element.querySelector('.edit-form-view').addEventListener('click', this.#resetClickHandler); // roll-up btn
    this.element.querySelector('.event__reset-btn').addEventListener('click', this.#onDeleteClick); // delete btn

    this.#setDatepicker();
  };

  #onFormSubmit = (evt) => {
    console.log('сохраните точку, пож');
    evt.preventDefault(); // надо?
    this.#formSubmitHandler(EventEditView.parseStateToPoint(this._state)); // сюда передаем измененные данные для перерисовки и сохранения
  };

  #onDeleteClick = (evt) => {
    evt.preventDefault();
    //проверка: выход без сохранения, если это новая точка, удаление данных, если это существующая
    if (this._state.id) {
      this.#deleteClickHandler(EventEditView.parseStateToPoint(this._state)); // метод приходит из event-presenter
    } else {
      this.#resetClickHandler();
    }
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
      // this.updateElement({
      //   ...this._state,
      //   destination: null,
      //   destinationDescription: null,
      //   destinationName: null,
      //   destinationPhotos: null,
      // });
      this.element.querySelector('.event__save-btn').disabled = true;
    }
    //проверка на заполненность полей для новой точки
    if (this._state.destination && this._state.dateFrom && this._state.dateTo && this._state.basePrice) {
      this.element.querySelector('.event__save-btn').disabled = false;
    }
  };

  #onOffersChange = () => {
    //ретро 18:20
    const checkedOffers = Array.from(this.element.querySelectorAll('.event__offer-checkbox:checked'));
    const checkedOfferIds = checkedOffers.map((el) => el.id);
    this._setState({
      ...this._state,
      offers: checkedOffers.map((el) => el.id), // id чекнутых офферов
      offersInfo: getMarkedOffers(this._state.type, checkedOfferIds, this.#offers),
    });
  };

  #onPriceChange = (evt) => {
    const selectedPrice = evt.target.value;
    if (selectedPrice > 0) {
      this.updateElement({
        ...this._state,
        basePrice: Number(evt.target.value),
      });
    } else {
      this.element.querySelector('.event__save-btn').disabled = true;
    }
    //проверка на заполненность полей для новой точки
    if (this._state.destination && this._state.dateFrom && this._state.dateTo && this._state.basePrice) {
      this.element.querySelector('.event__save-btn').disabled = false;
    }
  };

  #onDateFromChange = ([userDate]) => {
    const selectedDate = [userDate];
    if (selectedDate) {
      this.updateElement({
        ...this._state,
        dateFrom: dayjs(selectedDate).format(DATA_FORMAT), // соответствие типов!!
      });
    } else {
      this.element.querySelector('.event__save-btn').disabled = true;
    }
    //проверка на заполненность полей для новой точки
    if (this._state.destination && this._state.dateFrom && this._state.dateTo && this._state.basePrice) {
      this.element.querySelector('.event__save-btn').disabled = false;
    }
  };

  #onDateToChange = ([userDate]) => {
    const selectedDate = [userDate];
    if (selectedDate) {
      this.updateElement({
        ...this._state,
        dateTo: dayjs(selectedDate).format(DATA_FORMAT), // соответствие типов!!
      });
    } else {
      this.element.querySelector('.event__save-btn').disabled = true;
    }
    //проверка на заполненность полей для новой точки
    if (this._state.destination && this._state.dateFrom && this._state.dateTo && this._state.basePrice) {
      this.element.querySelector('.event__save-btn').disabled = false;
    }
  };

  #setDatepicker() {
    this.#datepickerFrom = flatpickr(this.element.querySelector('#event-start-time'), {
      dateFormat: 'd/m/y H:i',
      defaultDate: this._state.dateFrom,
      maxDate: this._state.dateTo,
      enableTime: true,
      time_24hr: true,
      onChange: this.#onDateFromChange,
    });

    this.#datepickerTo = flatpickr(this.element.querySelector('#event-end-time'), {
      dateFormat: 'd/m/y H:i',
      defaultDate: this._state.dateTo,
      minDate: this._state.dateFrom,
      enableTime: true,
      time_24hr: true,
      onChange: this.#onDateToChange,
    });
  }

  static parsePointToState(pointData, offers, destinations) {
    return {
      ...pointData,
      destinationName: pointData.destination ? getDestinationByID(pointData.destination, destinations).name : '',
      destinationDescription: pointData.destination
        ? getDestinationByID(pointData.destination, destinations).description
        : '',
      destinationPhotos: pointData.destination ? getDestinationByID(pointData.destination, destinations).photos : '',
      offersInfo: getMarkedOffers(pointData.type, pointData.offers, offers),
      dateFrom: pointData.dateFrom ? dayjs(pointData.dateFrom).format(DATA_FORMAT) : '',
      dateTo: pointData.dateTo ? dayjs(pointData.dateTo).format(DATA_FORMAT) : '',
    };
  }

  static parseStateToPoint(state) {
    // приводим к структуре сырых данных
    // ретро 7:24
    const transfotmedDateFromStr = formatDateStr(state.dateFrom);
    const transfotmedDateToStr = formatDateStr(state.dateTo);
    if (state.id) {
      return {
        basePrice: state.basePrice,
        dateFrom: transfotmedDateFromStr,
        dateTo: transfotmedDateToStr,
        destination: state.destination,
        id: state.id,
        isFavorite: state.isFavorite,
        offers: state.offers,
        type: state.type,
      };
    } else {
      return {
        basePrice: state.basePrice,
        dateFrom: transfotmedDateFromStr,
        dateTo: transfotmedDateToStr,
        destination: state.destination,
        isFavorite: state.isFavorite,
        offers: state.offers,
        type: state.type,
      };
    }
  }

  removeElement() {
    super.removeElement();

    if (this.#datepickerFrom) {
      this.#datepickerFrom.destroy();
      this.#datepickerFrom = null;
    }
    if (this.#datepickerTo) {
      this.#datepickerTo.destroy();
      this.#datepickerTo = null;
    }
  }
}
