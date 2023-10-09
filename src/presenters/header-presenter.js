// это будет главный презентер
import { SortType } from '../consts';
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
import { UserAction, UpdateType } from '../consts';
import { sortByPrice, sortByTime, sortByDate } from '../util/common';
import { filterFuturePoints, filterPresentPoints, filterPastPoints } from '../model/util/filters';
import LoadingView from '../view/loading-view';
import UiBlocker from '../framework/ui-blocker/ui-blocker.js';

const TimeLimit = {
  LOWER_LIMIT: 350,
  UPPER_LIMIT: 1000,
};

export default class HeaderPresenter {
  #container = null;
  #model = null;
  #newEventPresenter = null;
  #eventPresenters = new Map();
  #noPointsComponent = null;
  #tripTotalComponent = null;
  #currentSortType = SortType.DAY.name;
  #currentFilterType = 'everything';
  #isLoading = true;
  #uiBlocker = new UiBlocker({
    lowerLimit: TimeLimit.LOWER_LIMIT,
    upperLimit: TimeLimit.UPPER_LIMIT,
  });

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
    if (this.#noPointsComponent) {
      remove(this.#noPointsComponent);
      this.#noPointsComponent = null;
    }
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

    this.#currentSortType = SortType.DAY.name;
    this.#currentFilterType = 'everything';

    this.#rerenderFilters();

    remove(this.#sortComponent);
    this.#sortComponent = new SortView({
      currentSortType: this.#currentSortType,
      sortTypeChangeHandler: this.#sortTypeChangeHandler,
    });
    this.#renderSort();

    this.#clearEventsList();
    this.#renderEvents(this.pointData);

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
    render(this.#tripFiltersComponent, this.#siteTripControlsElement);
  }

  #rerenderFilters() {
    remove(this.#tripFiltersComponent);
    this.#tripFiltersComponent = new TripFiltersView({
      isDisabled: false,
      filterTypeClickHandler: this.#filterTypeClickHandler,
    });
    this.#renderFilters();
  }

  #renderTripInfo() {
    if (this.#tripTotalComponent) {
      remove(this.#tripTotalComponent);
    }
    render(this.#tripInfoComponent, this.#container, RenderPosition.AFTERBEGIN); // отрисовываем компонент-контейнер
    render(this.#tripAbouteComponent, this.#tripInfoComponent.element);
    this.#tripTotalComponent = new TripTotalView(this.#model.totalPrice);
    render(this.#tripTotalComponent, this.#tripInfoComponent.element);
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

  #renderAll(isServerFailed = false) {
    if (this.#isLoading) {
      this.#renderLoading();
      return;
    }

    if (isServerFailed) {
      this.renderNoPoints(true);
      return;
    }

    this.#renderTripInfo();
    this.#renderSort();
    // проверяем условие isServerFailed
    this.#renderEvents(this.pointData);
  }

  renderNoPoints(isServerFailed = false) {
    this.#noPointsComponent = new NoPointsView({
      currentFilter: this.#currentFilterType,
      isServerFailed: isServerFailed,
    });
    render(this.#noPointsComponent, this.#siteTripEventsElement);
    // render(this.#noPointsComponent, document.querySelector('.trip-events'));
  }

  #clearEventsList() {
    this.#eventPresenters.forEach((presenter) => presenter.destroy());
    this.#eventPresenters.clear(); // очищаем коллекцию презентеров
    //список-контейнер не удалаю
    if (this.#newEventPresenter) {
      this.#newEventPresenter.destroy();
      this.#destroyNewEvent();
    }
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

  #handleViewAction = async (actionType, updateType, update) => {
    // передается в event-presenter
    this.#uiBlocker.block();
    switch (actionType) {
      case UserAction.UPDATE_POINT:
        this.#eventPresenters.get(update.id).setSaving();
        try {
          await this.#model.updatePoint(updateType, update);
        } catch (err) {
          this.#eventPresenters.get(update.id).setAborting();
        }
        break;
      case UserAction.ADD_POINT:
        this.#newEventPresenter.setSaving();
        try {
          await this.#model.addPoint(updateType, update);
        } catch (err) {
          this.#newEventPresenter.setAborting();
        }
        break;
      case UserAction.DELETE_POINT:
        this.#eventPresenters.get(update.id).setDeleting();
        try {
          await this.#model.deletePoint(updateType, update);
        } catch (err) {
          this.#eventPresenters.get(update.id).setAborting();
        }
        break;
    }

    this.#uiBlocker.unblock();
  };

  #handleModelEvent = (updateType, data) => {
    // обработчик событий модели
    //вызывается из _notify
    console.log(updateType);
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
        this.#clearAll(); // что это??
        this.#renderAll();
        break;
      case UpdateType.INIT:
        this.#isLoading = false;
        remove(this.#loadingComponent);
        this.#rerenderFilters();
        this.#renderAll();
        render(this.#newEventBtnComponent, this.#siteTripMainElement);
        break;
      case UpdateType.FAILED:
        this.#isLoading = false;
        remove(this.#loadingComponent);
        this.#rerenderFilters();
        this.#renderAll(true);
        break;
    }
  };

  #modeChangeHandler = () => {
    this.#eventPresenters.forEach((presenter) => presenter.resetView());
    if (this.#newEventPresenter) {
      this.#newEventPresenter.destroy();
      this.#destroyNewEvent();
    }
  };

  get pointData() {
    // возвращает данные о точках с учетом текущей сортировки
    const allPoints = this.#model.points;
    let filteredPoints = [];

    switch (this.#currentFilterType) {
      case 'everything':
        filteredPoints = allPoints;
        break;
      case 'future':
        filteredPoints = filterFuturePoints(allPoints); // от большего к меньшему
        break;
      case 'present':
        filteredPoints = filterPresentPoints(allPoints);
        break;
      case 'past':
        filteredPoints = filterPastPoints(allPoints);
        break;
    }

    switch (this.#currentSortType) {
      case SortType.PRICE.name:
        return filteredPoints.sort(sortByPrice); // от большего к меньшему
      case SortType.TIME.name:
        return filteredPoints.sort(sortByTime);
      case SortType.DAY.name:
        return filteredPoints.sort(sortByDate);
    }
    return allPoints;
  }

  init() {
    this.#renderFilters({ isDisabled: true });
    this.#renderAll();
  }
}
