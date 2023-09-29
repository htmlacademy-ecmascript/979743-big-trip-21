// второстепенный презентер, отрисовывает одну точку в списке
import { render, replace } from '../framework/render';
import EventItemView from '../view/event-item-view';
import EventEditView from '../view/edit-form/edit-form-view';
import EventEditHeaderView from '../view/edit-form/header-view';
import EventEditDetailsView from '../view/edit-form/details-view';
import EventEditOffersView from '../view/edit-form/offers-view';
import EventEditDestinationView from '../view/edit-form/destination-view';

export default class EventPresenter {
  #container;
  #eventItemComponent = null;
  #eventEditComponent = null;
  #eventEditHeaderComponent = null;
  #eventEditDetailsComponent = null;
  #eventEditOffersComponent = null;
  #eventEditDestinationComponent = null;

  constructor(container) {
    this.#container = container;
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

  init(point) {
    // создаем компонент закрытой точки
    this.#eventItemComponent = new EventItemView(point, () => {
      this.#replacePointToForm(point);
      document.addEventListener('keydown', this.#onEscKeyDown);
    });
    // рисуем закрытую точку
    render(this.#eventItemComponent, this.#container);
  }
}
