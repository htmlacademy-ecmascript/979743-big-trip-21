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
// import { updateItem } from '../model/util/updatePoint';
import { UserAction, UpdateType } from '../consts';
import { sortByPrice, sortByTime, sortByDate } from '../util/common';

export default class HeaderPresenter {
  #container = null;
  #model = null;
  // #allPoints = [];
  #eventPresenters = new Map();
  #currentSortType = SortType.DAY.name;

  constructor(container, model) {
    this.#container = container;
    this.#model = model;

    this.#model.addObserver(this.#handleModelEvent);
  }

  #tripInfoComponent = new TripInfoView();
  #tripAbouteComponent = new TripAbouteView();
  #siteTripControlsElement = document.querySelector('.trip-controls__filters'); //контейнер для filters

  #siteTripEventsElement = document.querySelector('.trip-events'); //контейнер для trip-sort и trip-events__list

  #sortTypeChangeHandler = (sortType) => {
    // аргумент приходит из view
    console.log(sortType);
    this.#currentSortType = sortType;
    this.#clearEventsList();
    this.#renderEvents(this.pointData);
  };

  #sortComponent = new SortView({
    sortTypeChangeHandler: this.#sortTypeChangeHandler,
  });

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
      offers: this.#model.offers,
      destinations: this.#model.destinations,
      // onDataChange: this.#pointChangeHandler,
      onDataChange: this.#handleViewAction,
      onModeChange: this.#modeChangeHandler,
    });
    eventPresenter.init(point); //передаем сырые данные
    this.#eventPresenters.set(point.id, eventPresenter); // складываем очередной презентер в коллекцию - MAP
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

  #handleViewAction = (actionType, updateType, update) => {
    // вместо pointChangeHandler - передается в event-presenter
    switch (actionType) {
      case UserAction.UPDATE_POINT:
        this.#model.updatePoint(updateType, update);
        break;
      case UserAction.ADD_POINT:
        this.#model.addPoint(updateType, update);
        break;
      case UserAction.DELETE_POINT:
        this.#model.deletePoint(updateType, update);
        break;
    }
  };

  #handleModelEvent = (updateType, data) => {
    //вызывается из _notify
    console.log(updateType, data);
    // В зависимости от типа изменений решаем, что делать:
    // - обновить часть списка (например, когда поменялось описание)
    // - обновить список (например, когда задача ушла в архив)
    // - обновить всю доску (например, при переключении фильтра)
    switch (updateType) {
      case UpdateType.PATCH:
        // обновляем только точку
        this.#eventPresenters.get(data.id).init(data);
        break;
      case UpdateType.MINOR:
        // обновляем список (сортировка, фильтрация)
        break;
      case UpdateType.MAJOR:
      // обновляем все, в т.ч. хедер
    }
  };

  #modeChangeHandler = () => {
    this.#eventPresenters.forEach((presenter) => presenter.resetView());
  };

  get pointData() {
    // возвращает данные о точках с учетом текущей сортировки
    const allPoints = this.#model.points;

    switch (this.#currentSortType) {
      case SortType.PRICE.name:
        return allPoints.sort(sortByPrice); // от большего к меньшему
      case SortType.TIME.name:
        return allPoints.sort(sortByTime);
      case SortType.DAY.name:
        return allPoints.sort(sortByDate);
    }
    return allPoints;
    // разбор 1 05:13
  }

  init() {
    // this.#allPoints = [...this.#model.points];

    this.#renderFilters();
    // если точек нет, то выводим заглушку
    if (this.#model.points.length === 0) {
      this.#renderNoPoints();
      return;
    }
    this.#renderTripInfo();
    this.#renderSort();
    // this.#renderEvents(this.#model.allAdaptedPoints);
    this.#renderEvents(this.#model.points); // отдаем сырые данные
  }
}
