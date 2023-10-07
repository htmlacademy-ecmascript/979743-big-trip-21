// второстепенный презентер, отрисовывает одну точку в списке
import { render, replace, remove } from '../framework/render';
import EventItemView from '../view/event-item-view';
import EventEditView from '../view/edit-form/edit-form-view';
import { UserAction, UpdateType } from '../consts';

const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};

export default class EventPresenter {
  #container = null;
  #offers = null;
  #destinations = null;
  #onDataChange = null;
  #onModeChange = null;
  #point = null;
  #eventItemComponent = null;
  #eventEditComponent = null;
  #mode = Mode.DEFAULT;

  constructor({ container, offers, destinations, onDataChange, onModeChange }) {
    this.#container = container;
    this.#offers = offers;
    this.#destinations = destinations;
    this.#onDataChange = onDataChange; // #handleViewAction из header-presenter
    this.#onModeChange = onModeChange;
  }

  #onEscKeyDown = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      this.#eventEditComponent.reset(this.#point, this.#offers, this.#destinations);
      this.#replaceFormToPoint();
    }
  };

  // открытие формы
  #replacePointToForm() {
    replace(this.#eventEditComponent, this.#eventItemComponent);
    this.#onModeChange(); // закрывает все открытые формы, если они есть
    this.#mode = Mode.EDITING;
  }

  // закрытие формы
  #replaceFormToPoint() {
    replace(this.#eventItemComponent, this.#eventEditComponent);
    this.#mode = Mode.DEFAULT;
    document.removeEventListener('keydown', this.#onEscKeyDown);
  }

  #formSubmitHandler = (point) => {
    this.#onDataChange(UserAction.UPDATE_POINT, UpdateType.MINOR, point);
    this.#replaceFormToPoint();
    document.removeEventListener('keydown', this.#onEscKeyDown);
  };

  #deleteClickHandler = (point) => {
    this.#onDataChange(UserAction.DELETE_POINT, UpdateType.MINOR, point);
  };

  #editClickHandler = () => {
    this.#replacePointToForm();
    document.addEventListener('keydown', this.#onEscKeyDown);
  };

  #favoriteClickHandler = () => {
    // this.#onDataChange({ ...this.#point, isFavorite: !this.#point.isFavorite }); // вносим изменения в данные
    this.#onDataChange(UserAction.UPDATE_POINT, UpdateType.PATCH, {
      ...this.#point,
      isFavorite: !this.#point.isFavorite,
    });
  };

  #resetClickHandler = () => {
    this.#eventEditComponent.reset(this.#point, this.#offers, this.#destinations);
    this.#replaceFormToPoint();
  };

  init(point) {
    // получаем сырые данные
    this.#point = point;
    const prevEventItemComponent = this.#eventItemComponent;
    const prevEventEditComponent = this.#eventEditComponent;

    // создаем компонент закрытой точки
    this.#eventItemComponent = new EventItemView({
      pointData: point,
      offers: this.#offers,
      destinations: this.#destinations,
      onEditClick: this.#editClickHandler,
      favoriteClickHandler: this.#favoriteClickHandler,
    });

    // создаем компоненты формы редактирования
    this.#eventEditComponent = new EventEditView({
      pointData: point,
      offers: this.#offers,
      destinations: this.#destinations,
      formSubmitHandler: this.#formSubmitHandler,
      resetClickHandler: this.#resetClickHandler,
      deleteClickHandler: this.#deleteClickHandler,
    });

    //проверяем первоначальную инициализацию
    if (prevEventItemComponent === null || prevEventEditComponent === null) {
      // рисуем закрытую точку
      render(this.#eventItemComponent, this.#container);
      return;
    }
    // проверяем на наличи элемента в DOM
    if (this.#mode === Mode.DEFAULT) {
      replace(this.#eventItemComponent, prevEventItemComponent);
    }

    if (this.#mode === Mode.EDITING) {
      replace(this.#eventEditComponent, prevEventEditComponent);
    }

    remove(prevEventItemComponent);
    remove(prevEventEditComponent);
  }

  resetView() {
    if (this.#mode !== Mode.DEFAULT) {
      this.#eventEditComponent.reset(this.#point, this.#offers, this.#destinations);
      this.#replaceFormToPoint();
    }
  }

  destroy() {
    remove(this.#eventItemComponent);
    remove(this.#eventEditComponent);
  }
}
