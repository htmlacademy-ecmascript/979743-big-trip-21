import { remove, render, RenderPosition } from '../framework/render';
import EventEditView from '../view/edit-form/edit-form-view';
import { UserAction, UpdateType } from '../consts';

const BLANK_POINT = {
  id: '',
  basePrice: 0,
  dateFrom: '',
  dateTo: '',
  destination: '',
  isFavorite: false,
  offers: [], // !!!!
  type: 'flight',
};

export default class NewEventPresenter {
  #container = null;
  #offers = null;
  #destinations = null;
  #onDataChange = null;
  #onDestroy = null;

  #eventEditComponent = null;

  constructor({ container, offers, destinations, onDataChange, onDestroy }) {
    this.#offers = offers;
    this.#destinations = destinations;
    this.#container = container;
    this.#onDataChange = onDataChange; // handleViewAction из header-presenter
    this.#onDestroy = onDestroy;
  }

  #onEscKeyDown = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      this.#resetClickHandler();
    }
  };

  #formSubmitHandler = (point) => {
    this.#onDataChange(UserAction.ADD_POINT, UpdateType.MINOR, point);
    // this.#replaceFormToPoint();
    // this.#destroy();
    this.#onDestroy(); // приходит из header-presenter, разбизабливает кнопку
    document.removeEventListener('keydown', this.#onEscKeyDown);
    //вызываем здесь
    // this.#onDataChange(UserAction.UPDATE_POINT, UpdateType.PATCH, point);
    // this.#replaceFormToPoint(); // удаление элемента
    // document.removeEventListener('keydown', this.#onEscKeyDown);
  };

  #resetClickHandler = () => {
    this.destroy();
    this.#onDestroy(); // приходит из header-presenter, разбизабливает кнопку
  };

  #cancelClickHandler = () => {
    // нужен формально для передачи в EventEditView
  };

  setSaving() {
    this.#eventEditComponent.updateElement({
      ...this._state,
      isDisabled: true,
      isSaving: true,
    });
  }

  setAborting() {
    const resetFormState = () => {
      this.#eventEditComponent.updateElement({
        ...this._state,
        isDisabled: false,
        isSaving: false,
        isDeleting: false,
      });
    };
    this.#eventEditComponent.shake(resetFormState);
  }

  init() {
    if (this.#eventEditComponent !== null) {
      return;
    }

    this.#eventEditComponent = new EventEditView({
      pointData: BLANK_POINT,
      offers: this.#offers,
      destinations: this.#destinations,
      formSubmitHandler: this.#formSubmitHandler,
      resetClickHandler: this.#resetClickHandler,
      deleteClickHandler: this.#cancelClickHandler,
    });

    render(this.#eventEditComponent, this.#container, RenderPosition.AFTERBEGIN);

    document.addEventListener('keydown', this.#onEscKeyDown);
  }

  destroy() {
    if (this.#eventEditComponent === null) {
      return;
    }
    remove(this.#eventEditComponent);
    this.#eventEditComponent = null;

    document.removeEventListener('keydown', this.#onEscKeyDown);
  }
}
