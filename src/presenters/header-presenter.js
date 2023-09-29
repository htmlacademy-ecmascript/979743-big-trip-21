// это будет главный презентер
import { FILTER_TYPES, SortType } from '../consts';
import { render, RenderPosition } from '../framework/render';
import TripInfoView from '../view/trip-info-view';
import TripAbouteView from '../view/trip-aboute-view';
import TripTotalView from '../view/trip-total-view';
import TripFiltersView from '../view/filters-view';
import SortView from '../view/sort-view';
import EventsListView from '../view/events-list-view';
import EventPresenter from './event-presenter';
import NoPointsView from '../view/no-points-view';
import { updateItem } from '../model/util/updatePoint';

export default class HeaderPresenter {
  #container = null;
  #model = null;
  #allPoints = [];
  #eventPresenters = new Map();

  constructor(container, model) {
    this.#container = container;
    this.#model = model;
  }

  #tripInfoComponent = new TripInfoView();
  #tripAbouteComponent = new TripAbouteView();
  #siteTripControlsElement = document.querySelector('.trip-controls__filters'); //контейнер для filters

  #siteTripEventsElement = document.querySelector('.trip-events'); //контейнер для trip-sort и trip-events__list
  #sortComponent = new SortView(SortType);
  #eventsListComponent = new EventsListView();

  #renderFilters() {
    const filters = FILTER_TYPES.map((filter) => ({ filterName: filter })); //готовим данные о фильтрах для отрисовки
    const tripFiltersComponent = new TripFiltersView(filters);
    render(tripFiltersComponent, this.#siteTripControlsElement);
  }

  #renderTripInfo() {
    render(this.#tripInfoComponent, this.#container, RenderPosition.AFTERBEGIN); // отрисовываем компонент-контейнер
    render(this.#tripAbouteComponent, this.#tripInfoComponent.element);
    const tripTotalComponent = new TripTotalView(this.#model.totalPrice);
    render(tripTotalComponent, this.#tripInfoComponent.element);
  }

  #renderSort() {
    render(this.#sortComponent, this.#siteTripEventsElement);
  }

  #renderEvent(point) {
    //куда лучше передавать данные точки: в конструктор или в метод??
    const eventPresenter = new EventPresenter({
      container: this.#eventsListComponent.element,
      onDataChange: this.#onPointChange,
    });
    eventPresenter.init(point);
    this.#eventPresenters.set(point.id, eventPresenter);
  }

  #renderEvents(points) {
    render(this.#eventsListComponent, this.#siteTripEventsElement);
    points.forEach((point) => this.#renderEvent(point));
  }

  #renderNoPoints() {
    render(new NoPointsView(), this.#siteTripEventsElement);
  }

  #clearEventsList() {
    this.#eventPresenters.forEach((presenter) => presenter.destroy());
    this.#eventPresenters.clear();
    //нужно ли удалять сам список-контейнер?
  }

  #onPointChange = (updatedPoint) => {
    this.#allPoints = updateItem(this.#allPoints, updatedPoint);
    this.#eventPresenters.get(updatedPoint.id).init(updatedPoint);
  };

  init() {
    this.#allPoints = [...this.#model.allAdaptedPoints];

    this.#renderFilters();
    // если точек нет, то выводим заглушку
    if (this.#model.allAdaptedPoints.length === 0) {
      this.#renderNoPoints();
      return;
    }
    this.#renderTripInfo();
    this.#renderSort();
    this.#renderEvents(this.#model.allAdaptedPoints);
  }
}
