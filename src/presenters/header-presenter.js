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
// import { updateItem } from '../model/util/updatePoint';
import { UserAction, UpdateType } from '../consts';
import { sortByPrice, sortByTime, sortByDate } from '../util/common';
import { filterEverything, filterFuturePoints, filterPresentPoints, filterPastPoints } from '../model/util/filters';
import LoadingView from '../view/loading-view';

export default class HeaderPresenter {
  #container = null;
  #model = null;
  #eventPresenters = new Map();
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
  #siteTripControlsElement = document.querySelector('.trip-controls__filters'); //контейнер для filters

  #siteTripEventsElement = document.querySelector('.trip-events'); //контейнер для trip-sort и trip-events__list

  #sortTypeChangeHandler = (sortType) => {
    // аргумент приходит из view
    this.#currentSortType = sortType;
    this.#clearEventsList();
    this.#renderEvents(this.pointData);
  };

  #filterTypeClickHandler = (filterType) => {
    console.log(filterType);
    this.#currentFilterType = filterType;
    this.#clearEventsList();
    this.#renderEvents(this.pointData);
  };

  #sortComponent = new SortView({
    currentSortType: this.#currentSortType,
    sortTypeChangeHandler: this.#sortTypeChangeHandler,
  });

  #eventsListComponent = new EventsListView();
  #noPointsComponent = new NoPointsView();

  #renderFilters() {
    const filters = FILTER_TYPES.map((filter) => ({ filterName: filter })); //готовим данные о фильтрах для отрисовки
    const tripFiltersComponent = new TripFiltersView({
      filters: filters,
      filterTypeClickHandler: this.#filterTypeClickHandler,
    });
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
    render(this.#noPointsComponent, this.#siteTripEventsElement);
  }

  #renderLoading() {
    render(this.#loadingComponent, this.#siteTripEventsElement);
  }

  #renderAll() {
    this.#renderFilters();
    // // если точек нет, то выводим заглушку -- перенести в ф-ю после загрузки.
    // if (this.#model.points.length === 0) {
    //   this.#renderNoPoints();
    //   return;
    // }
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
        this.#eventPresenters.get(data.id).init(data);
        break;
      case UpdateType.MINOR:
        // обновляем список
        this.#clearEventsList();
        this.#renderEvents(this.pointData);
        break;
      case UpdateType.MAJOR:
        // обновляем все, в т.ч. хедер
        this.#clearAll({ resetRenderedTaskCount: true });
        this.#renderAll();
        break;
      case UpdateType.INIT:
        this.#isLoading = false;
        this.#clearAll();
        remove(this.#loadingComponent);
        this.#renderAll();
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
    this.#renderAll();
  }
}
