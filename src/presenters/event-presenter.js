// второстепенный презентер, отрисовывает одну точку в списке
import { render, replace, remove } from '../framework/render';
import EventItemView from '../view/event-item-view';
import EventEditView from '../view/edit-form/edit-form-view';
import EventEditHeaderView from '../view/edit-form/header-view';
import EventEditDetailsView from '../view/edit-form/details-view';
import EventEditOffersView from '../view/edit-form/offers-view';
import EventEditDestinationView from '../view/edit-form/destination-view';

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
  #eventEditHeaderComponent = null;
  #eventEditDetailsComponent = null;
  #eventEditOffersComponent = null;
  #eventEditDestinationComponent = null;
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
      // document.removeEventListener('keydown', this.#onEscKeyDown);
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

  #renderEditFormInsides(point) {
    // внутренности формы редактирования
    this.#eventEditHeaderComponent = new EventEditHeaderView(point); // header формы - передаем элемент для открытой точки
    this.#eventEditDetailsComponent = new EventEditDetailsView(); // детали в форме, контейнер для офферов и ПН
    this.#eventEditOffersComponent = new EventEditOffersView(point.offersInfo); // офферы в форме
    this.#eventEditDestinationComponent = new EventEditDestinationView(point); // пункт назначения в форме

    // render(this.#eventEditComponent, this.#container); // это позволит отрисовать форму полностью
    render(this.#eventEditHeaderComponent, this.#eventEditComponent.element.querySelector('.event'));
    render(this.#eventEditDetailsComponent, this.#eventEditComponent.element.querySelector('.event'));
    render(this.#eventEditOffersComponent, this.#eventEditComponent.element.querySelector('.event__details'));
    render(this.#eventEditDestinationComponent, this.#eventEditComponent.element.querySelector('.event__details'));
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
    this.#eventEditComponent = new EventEditView(() => {
      this.#replaceFormToPoint();
      document.removeEventListener('keydown', this.#onEscKeyDown);
    });
    this.#renderEditFormInsides(point);

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
