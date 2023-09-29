// второстепенный презентер, отрисовывает одну точку в списке
import { render, replace, remove } from '../framework/render';
import EventItemView from '../view/event-item-view';
import EventEditView from '../view/edit-form/edit-form-view';
import EventEditHeaderView from '../view/edit-form/header-view';
import EventEditDetailsView from '../view/edit-form/details-view';
import EventEditOffersView from '../view/edit-form/offers-view';
import EventEditDestinationView from '../view/edit-form/destination-view';

export default class EventPresenter {
  #container;
  #onDataChange = null;
  #point = null;
  #eventItemComponent = null;
  #eventEditComponent = null;
  #eventEditHeaderComponent = null;
  #eventEditDetailsComponent = null;
  #eventEditOffersComponent = null;
  #eventEditDestinationComponent = null;

  constructor({ container, onDataChange }) {
    this.#container = container;
    this.#onDataChange = onDataChange;
  }

  #onEscKeyDown = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      this.#replaceFormToPoint();
      document.removeEventListener('keydown', this.#onEscKeyDown);
    }
  };

  // открытие формы
  #replacePointToForm(point) {
    // создаем компоненты формы редактирования
    this.#eventEditComponent = new EventEditView(() => {
      this.#replaceFormToPoint();
      document.removeEventListener('keydown', this.#onEscKeyDown);
    });
    replace(this.#eventEditComponent, this.#eventItemComponent);
    this.#renderEditFormInsides(point);
  }

  // закрытие формы
  #replaceFormToPoint() {
    replace(this.#eventItemComponent, this.#eventEditComponent);
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
    console.log('нажали звездочку');
    this.#onDataChange({ ...this.#point, isFavorite: !this.#point.isFavorite }); // вносим изменения в данные
    // присваиваем соотв класс элементу - во view
  };

  init(point) {
    this.#point = point;

    const prevEventItemComponent = this.#eventItemComponent;
    const prevEventEditComponent = this.#eventEditComponent;

    // создаем компонент закрытой точки
    this.#eventItemComponent = new EventItemView({
      pointInfo: point,
      onEditClick: () => {
        this.#replacePointToForm(point);
        document.addEventListener('keydown', this.#onEscKeyDown);
      },
      favoriteClickHandler: this.#favoriteClickHandler,
    });

    //проверяем первоначальную инициализацию
    if (prevEventItemComponent === null || prevEventEditComponent === null) {
      // рисуем закрытую точку
      render(this.#eventItemComponent, this.#container);
      return;
    }
    // проверяем на наличи элемента в DOM
    if (this.#container.contains(prevEventItemComponent.element)) {
      replace(this.#eventItemComponent, prevEventItemComponent);
    }

    if (this.#container.contains(prevEventEditComponent.element)) {
      replace(this.#eventEditComponent, prevEventEditComponent);
    }

    remove(prevEventItemComponent);
    remove(prevEventEditComponent);
  }

  destroy() {
    remove(this.#eventItemComponent);
    remove(this.#eventEditComponent);
  }
}
