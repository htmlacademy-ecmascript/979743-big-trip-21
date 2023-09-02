// отрисовка компонентов списка событий
import { DEFAULT_OPEN_POINT_INDEX } from '../consts';
import { render, replace, RenderPosition } from '../framework/render';

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
      replaceFormToPoint();
    }); // форма редактирования
    const eventEditHeaderComponent = new EventEditHeaderView(point); // header формы - передаем элемент для открытой точки
    const eventEditOffersComponent = new EventEditOffersView(point.offersInfo); // офферы в форме
    const eventEditDestinationComponent = new EventEditDestinationView(point); // пункт назначения в форме

    // рисуем закрытую точку
    render(eventItemView, this.#eventsListComponent.element);

    function replacePointToForm() {
      replace(eventItemView, eventEditComponent, [
        eventEditHeaderComponent,
        eventEditOffersComponent,
        eventEditDestinationComponent,
      ]);
    }

    function replaceFormToPoint() {
      replace(eventEditComponent, eventItemView);
    }
  }

  init() {
    render(this.#sortComponent, this.#container);
    render(this.#eventsListComponent, this.#container);

    //остальные точки в списке
    this.#adaptedPoints.forEach((point) => this.#renderPoint(point));
  }
}
