// это будет главный презентер
import { FILTER_TYPES, SortType } from '../consts';
import { render, RenderPosition, remove } from '../framework/render';
import TripInfoView from '../view/trip-info-view';
import TripAbouteView from '../view/trip-aboute-view';
import TripTotalView from '../view/trip-total-view';
import TripFiltersView from '../view/filters-view';
import SortView from '../view/sort-view';
import EventsListView from '../view/events-list-view';
import EventPresenter from './event-presenter';
import NoPointsView from '../view/no-points-view';
import NewEventBtnView from '../view/new-event-btn-view';
import NewEventPresenter from './new-event-presenter';
// import { updateItem } from '../model/util/updatePoint';
import { UserAction, UpdateType } from '../consts';
import { sortByPrice, sortByTime, sortByDate } from '../util/common';
import { filterFuturePoints, filterPresentPoints, filterPastPoints } from '../model/util/filters';
import LoadingView from '../view/loading-view';

export default class HeaderPresenter {
  #container = null;
  #model = null;
  #newEventPresenter = null;
  #eventPresenters = new Map();
  #noPointsComponent = null;
  #currentSortType = SortType.DAY.name;
  #currentFilterType = 'everything'; // изменить струтуру FILTER_TYPES !!!
  #isLoading = true;

  constructor(container, model) {
    this.#container = container;
    this.#model = model;

    this.#model.addObserver(this.#handleModelEvent);
  }

  #loadingComponent = new LoadingView();
  #tripInfoComponent = new TripInfoView();
  #tripAbouteComponent = new TripAbouteView();

  #siteTripMainElement = document.querySelector('.trip-main'); // он определяется в main
  #siteTripControlsElement = document.querySelector('.trip-controls__filters'); //контейнер для filters

  #siteTripEventsElement = document.querySelector('.trip-events'); //контейнер для trip-sort и trip-events__list

  #sortTypeChangeHandler = (sortType) => {
    // аргумент приходит из view
    this.#currentSortType = sortType;
    this.#clearEventsList();
    this.#renderEvents(this.pointData);
  };

  #filterTypeClickHandler = (filterType) => {
    this.#currentFilterType = filterType;
    this.#clearEventsList();
    this.#renderEvents(this.pointData);
  };

  #destroyNewEvent = () => {
    this.#newEventBtnComponent.element.disabled = false;
    this.#newEventClickHandler = null;
  };

  #newEventClickHandler = () => {
    this.#modeChangeHandler();
    this.#newEventPresenter = new NewEventPresenter({
      container: this.#eventsListComponent.element,
      offers: this.#model.offers,
      destinations: this.#model.destinations,
      onDataChange: this.#handleViewAction,
      onDestroy: this.#destroyNewEvent,
    });
    this.#newEventPresenter.init();
  };

  #tripFiltersComponent = new TripFiltersView({
    // filters: FILTER_TYPES.map((filter) => ({ filterName: filter })), //готовим данные о фильтрах для отрисовки,
    isDisabled: true,
    filterTypeClickHandler: this.#filterTypeClickHandler,
  });

  #sortComponent = new SortView({
    currentSortType: this.#currentSortType,
    sortTypeChangeHandler: this.#sortTypeChangeHandler,
  });

  #eventsListComponent = new EventsListView();
  #newEventBtnComponent = new NewEventBtnView({
    newEventClickHandler: this.#newEventClickHandler,
  });

  #renderFilters() {
    // const filters = FILTER_TYPES.map((filter) => ({ filterName: filter })); //готовим данные о фильтрах для отрисовки
    // const tripFiltersComponent = new TripFiltersView({
    //   filters: filters,
    //   isDisabled: isDisabled,
    //   filterTypeClickHandler: this.#filterTypeClickHandler,
    // });
    render(this.#tripFiltersComponent, this.#siteTripControlsElement);
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
    const eventPresenter = new EventPresenter({
      container: this.#eventsListComponent.element,
      offers: this.#model.offers,
      destinations: this.#model.destinations,
      onDataChange: this.#handleViewAction,
      onModeChange: this.#modeChangeHandler,
    });
    eventPresenter.init(point); //передаем сырые данные
    this.#eventPresenters.set(point.id, eventPresenter); // складываем очередной презентер в коллекцию - MAP
  }

  #renderEvents(points) {
    if (points.length === 0) {
      this.#noPointsComponent = new NoPointsView({
        currentFilter: this.#currentFilterType,
      });
      render(this.#noPointsComponent, this.#siteTripEventsElement);
    } else {
      // удалять заглушку, если она есть.
      remove(this.#noPointsComponent);
      render(this.#eventsListComponent, this.#siteTripEventsElement);
      points.forEach((point) => this.#renderEvent(point));
    }
  }

  #renderLoading() {
    render(this.#loadingComponent, this.#siteTripEventsElement);
  }

  #renderAll() {
    if (this.#isLoading) {
      this.#renderLoading();
      return;
    }
    this.#renderTripInfo();
    this.#renderSort();
    this.#renderEvents(this.pointData); // какие данные сюда попадают?????
  }

  #clearEventsList() {
    this.#eventPresenters.forEach((presenter) => presenter.destroy());
    this.#eventPresenters.clear(); // очищаем коллекцию презентеров
    //список-контейнер не удалаю
  }

  #clearAll({ resetSortType = false } = {}) {
    this.#clearEventsList();

    remove(this.#tripInfoComponent);
    remove(this.#tripAbouteComponent);
    remove(this.#sortComponent);
    remove(this.#eventsListComponent);
    remove(this.#noPointsComponent);
    remove(this.#loadingComponent);

    if (resetSortType) {
      this.#currentSortType = SortType.DAY.name; // сортировка по умолчанию
    }
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
    // обработчик событий модели
    //вызывается из _notify
    switch (updateType) {
      case UpdateType.PATCH:
        // обновляем только точку
        if (this.#eventPresenters.get(data.id)) {
          // проверяем, существует точка или новая
          this.#eventPresenters.get(data.id).init(data); // для существующей точки
        } else {
          this.#renderEvent(data);
        }
        break;
      case UpdateType.MINOR:
        // обновляем список
        this.#clearEventsList();
        this.#renderEvents(this.pointData);
        break;
      case UpdateType.MAJOR:
        // обновляем все, в т.ч. хедер
        this.#clearAll({ resetRenderedTaskCount: true }); // что это??
        this.#renderAll();
        break;
      case UpdateType.INIT:
        this.#isLoading = false;
        remove(this.#loadingComponent);
        remove(this.#tripFiltersComponent);
        this.#tripFiltersComponent = new TripFiltersView({
          // filters: FILTER_TYPES.map((filter) => ({ filterName: filter })), //готовим данные о фильтрах для отрисовки,
          isDisabled: false,
          filterTypeClickHandler: this.#filterTypeClickHandler,
        });
        this.#renderFilters();
        this.#renderAll();
        render(this.#newEventBtnComponent, this.#siteTripMainElement);
        break;
    }
  };

  #modeChangeHandler = () => {
    this.#eventPresenters.forEach((presenter) => presenter.resetView());
  };

  get pointData() {
    // возвращает данные о точках с учетом текущей сортировки
    const allPoints = this.#model.points;
    let filteredPoint = [];

    switch (this.#currentFilterType) {
      case 'everything': // переделать структуру
        filteredPoint = allPoints;
        break;
      case 'future':
        filteredPoint = filterFuturePoints(allPoints); // от большего к меньшему
        break;
      case 'present':
        filteredPoint = filterPresentPoints(allPoints);
        break;
      case 'past':
        filteredPoint = filterPastPoints(allPoints);
        break;
    }

    switch (this.#currentSortType) {
      case SortType.PRICE.name:
        return filteredPoint.sort(sortByPrice); // от большего к меньшему
      case SortType.TIME.name:
        return filteredPoint.sort(sortByTime);
      case SortType.DAY.name:
        return filteredPoint.sort(sortByDate);
    }
    return allPoints;
    // разбор 1 05:13
  }

  init() {
    this.#renderFilters({ isDisabled: true });
    this.#renderAll();
  }
}
