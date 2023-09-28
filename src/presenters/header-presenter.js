// это будет главный презентер
import { FILTER_TYPES, SortType } from '../consts';
import { render, RenderPosition } from '../framework/render';
import TripInfoView from '../view/trip-info-view';
import TripAbouteView from '../view/trip-aboute-view';
import TripTotalView from '../view/trip-total-view';
import TripFiltersView from '../view/filters-view';
import SortView from '../view/sort-view';
import EventsListView from '../view/events-list-view';
import EventsPresenter from './events-presenter';

export default class HeaderPresenter {
  #container = null;
  #model = null;

  constructor(container, model) {
    this.#container = container;
    this.#model = model;
    // this.#model.adaptedPoints = []; // для теста заглушки
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
    //куда передавать данные точки: в конструктор или в метод??
    const eventsPresenter = new EventsPresenter(this.#eventsListComponent.element, point);
    eventsPresenter.init();
  }

  #renderEvents(points) {
    render(this.#eventsListComponent, this.#siteTripEventsElement);
    points.forEach((point) => this.#renderEvent(point));
  }

  init() {
    this.#renderFilters();
    // если точек нет = массив.length=0, то ничего больше не выводим
    if (this.#model.allAdaptedPoints.length === 0) {
      return;
    }
    this.#renderTripInfo();
    this.#renderSort();
    this.#renderEvents(this.#model.allAdaptedPoints);
  }
}
