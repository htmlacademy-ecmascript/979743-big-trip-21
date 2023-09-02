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

  #renderEditFom(openPoint) {
    const eventEditComponent = new EventEditView(); // форма редактирования
    render(eventEditComponent, this.#eventsListComponent.element, RenderPosition.BEFOREEND); // форма редактирования

    const eventEditHeaderComponent = new EventEditHeaderView(openPoint); // header формы - передаем элемент для открытой точки
    render(eventEditHeaderComponent, eventEditComponent.element.querySelector('.event')); // header формы
    render(this.#eventEditDetailsComponent, eventEditComponent.element.querySelector('.event')); // детали в форме, конт-р для офферов и пункта назна-я

    const eventEditOffersComponent = new EventEditOffersView(openPoint.offersInfo); // офферы в форме
    render(eventEditOffersComponent, this.#eventEditDetailsComponent.element); // офферы

    const eventEditDestinationComponent = new EventEditDestinationView(openPoint); // пункт назначения в форме
    render(eventEditDestinationComponent, this.#eventEditDetailsComponent.element);
  }

  #renderPoint(point) {
    // создаем компонент закрытой точки
    const eventItemView = new EventItemView(point, () => {
      replacePointToForm();
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

    //рисуем форму редактирования
    // render(eventEditComponent, this.#eventsListComponent.element, RenderPosition.BEFOREEND); // форма редактирования
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

    // открытая точка = форма редактирования, по умолчанию - первая точка в списке
    // this.#renderEditFom(this.#openPointDefault);

    //остальные точки в списке
    this.#adaptedPoints.forEach((point) => this.#renderPoint(point));
  }
}
