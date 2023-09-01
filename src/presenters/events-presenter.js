// отрисовка компонентов списка событий
import { DEFAULT_OPEN_POINT_INDEX } from '../consts';
import { render, RenderPosition } from '../framework/render';

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
  #destinations;
  #offers;
  #points;
  #adaptedPoints;
  #openPointDefault;

  constructor(container, model) {
    this.#container = container;
    this.#destinations = model.destinations;
    // this.offers = model.offers; - не нужны
    this.#points = model.points;
    this.#adaptedPoints = model.adaptedPoints;
    this.#openPointDefault = this.#adaptedPoints[DEFAULT_OPEN_POINT_INDEX];
  }

  #sortComponent = new SortView();
  #eventsListComponent = new EventsListView();
  #eventEditComponent = new EventEditView(); // форма редактирования

  #eventEditDetailsComponent = new EventEditDetailsView(); // детали в форме, конт-р для офферов и пункта назна-я

  init() {
    render(this.#sortComponent, this.#container);
    render(this.#eventsListComponent, this.#container);
    render(this.#eventEditComponent, this.#eventsListComponent.element, RenderPosition.BEFOREEND, true); // форма редактирования

    const eventEditHeaderComponent = new EventEditHeaderView(this.#destinations, this.#openPointDefault); // header формы - передаем элемент для открытой точки
    render(eventEditHeaderComponent, this.#eventEditComponent.element.querySelector('.event')); // header формы
    render(this.#eventEditDetailsComponent, this.#eventEditComponent.element.querySelector('.event')); // детали в форме, конт-р для офферов и пункта назна-я

    const eventEditOffersComponent = new EventEditOffersView(this.#openPointDefault.offersInfo); // офферы в форме
    render(eventEditOffersComponent, this.#eventEditDetailsComponent.element); // офферы

    const eventEditDestinationComponent = new EventEditDestinationView(this.#openPointDefault); // пункт назначения в форме
    render(eventEditDestinationComponent, this.#eventEditDetailsComponent.element);

    //остальные точки в списке
    for (let i = 1; i < this.#points.length; i++) {
      render(new EventItemView(this.#adaptedPoints[i]), this.#eventsListComponent.element);
    }
  }
}
