// второстепенный презентер, отрисовывает одну точку в списке
import { render, replace, remove } from '../framework/render';
import EventItemView from '../view/event-item-view';
import EventEditView from '../view/edit-form/edit-form-view';

const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};

export default class EventPresenter {
  #container;
  #onDataChange = null;
  #onModeChange = null;
  #point = null;
  #eventItemComponent = null;
  #eventEditComponent = null;
  #mode = Mode.DEFAULT;

  constructor({ container, onDataChange, onModeChange }) {
    this.#container = container;
    this.#onDataChange = onDataChange;
    this.#onModeChange = onModeChange;
  }

  #onEscKeyDown = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
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

  #favoriteClickHandler = () => {
    this.#onDataChange({ ...this.#point, isFavorite: !this.#point.isFavorite }); // вносим изменения в данные
  };

  init(point) {
    this.#point = point;

    const prevEventItemComponent = this.#eventItemComponent;
    const prevEventEditComponent = this.#eventEditComponent;

    // создаем компонент закрытой точки
    this.#eventItemComponent = new EventItemView({
      pointInfo: point,
      onEditClick: () => {
        this.#replacePointToForm();
        document.addEventListener('keydown', this.#onEscKeyDown);
      },
      // onEditClick: this.#editClickHandler,
      favoriteClickHandler: this.#favoriteClickHandler,
    });

    // создаем компоненты формы редактирования
    this.#eventEditComponent = new EventEditView({
      pointData: point,
      onFormSubmit: () => {
        this.#replaceFormToPoint();
        document.removeEventListener('keydown', this.#onEscKeyDown);
      },
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
      this.#replaceFormToPoint();
    }
  }

  destroy() {
    remove(this.#eventItemComponent);
    remove(this.#eventEditComponent);
  }
}
