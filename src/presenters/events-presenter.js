// отрисовка компонентов списка событий
import { render, replace } from '../framework/render';

import NoPointsView from '../view/no-points-view';
import SortView from '../view/sort-view';
import EventsListView from '../view/events-list-view';
import EventEditView from '../view/event-edit-form-view';
import EventEditHeaderView from '../view/event-edit-form-header-view';

import EventEditDetailsView from '../view/event-edit-form-details-view';
import EventEditOffersView from '../view/event-edit-form-offers-view';
import EventEditDestinationView from '../view/event-edit-form-destination-view';

import EventItemView from '../view/event-item-view';

export default class EventsPresenter {
  #container;
  #adaptedPoints;

  constructor(container, model) {
    this.#container = container;
    this.#adaptedPoints = model.adaptedPoints;
    // this.#adaptedPoints = []; // для теста заглушки
  }

  #sortComponent = new SortView();
  #eventsListComponent = new EventsListView();

  #renderPoint(point) {
    const onEscKeyDown = (evt) => {
      if (evt.key === 'Escape') {
        evt.preventDefault();
        replaceFormToPoint();
        document.removeEventListener('keydown', onEscKeyDown);
      }
    };
    // создаем компонент закрытой точки
    const eventItemView = new EventItemView(point, () => {
      replacePointToForm();
      document.addEventListener('keydown', onEscKeyDown);
    });

    // создаем компоненты формы редактирования
    const eventEditComponent = new EventEditView(() => {
      // форма редактирования
      replaceFormToPoint();
      document.removeEventListener('keydown', onEscKeyDown);
    });

    // внутренности формы редактирования
    const eventEditHeaderComponent = new EventEditHeaderView(point); // header формы - передаем элемент для открытой точки
    const eventEditDetailsComponent = new EventEditDetailsView(); // детали в форме, контейнер для офферов и ПН
    const eventEditOffersComponent = new EventEditOffersView(point.offersInfo); // офферы в форме
    const eventEditDestinationComponent = new EventEditDestinationView(point); // пункт назначения в форме

    // рисуем закрытую точку
    render(eventItemView, this.#eventsListComponent.element);
    // открытие формы
    function replacePointToForm() {
      replace(eventEditComponent, eventItemView);
      render(eventEditHeaderComponent, eventEditComponent.element.querySelector('.event'));
      render(eventEditDetailsComponent, eventEditComponent.element.querySelector('.event'));
      render(eventEditOffersComponent, eventEditComponent.element.querySelector('.event__details'));
      render(eventEditDestinationComponent, eventEditComponent.element.querySelector('.event__details'));
    }
    // закрытие формы
    function replaceFormToPoint() {
      replace(eventItemView, eventEditComponent);
    }
  }

  init() {
    // если точек нет = массив.length=0, то выводим заглушку
    // вынести в отдельную функцию -?
    if (this.#adaptedPoints.length === 0) {
      const noPointsView = new NoPointsView();
      render(noPointsView, this.#container);
      return;
    }

    render(this.#sortComponent, this.#container);
    render(this.#eventsListComponent, this.#container);

    //остальные точки в списке
    this.#adaptedPoints.forEach((point) => this.#renderPoint(point));
  }
}
