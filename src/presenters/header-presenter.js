// отрисовка компонент header-а
import { FILTER_TYPES } from '../consts';
import { render, RenderPosition } from '../framework/render';
import TripInfoView from '../view/trip-info-view';
import TripAbouteView from '../view/trip-aboute-view';
import TripTotalView from '../view/trip-total-view';
import TripFiltersView from '../view/filters-view';

export default class HeaderPresenter {
  #container;
  #allAdaptedPoints;

  constructor(container, model) {
    this.#container = container;
    this.#allAdaptedPoints = model.allAdaptedPoints; // надо ли сохранять? или вызывать функ-ю из модели в процессе?
    // this.#adaptedPoints = []; // для теста заглушки
  }

  #tripInfoComponent = new TripInfoView();
  #tripAbouteComponent = new TripAbouteView();
  #tripTotalComponent = new TripTotalView();

  #siteTripControlsElement = document.querySelector('.trip-controls__filters'); //контейнер для filters

  // ------------ готовим данные о фильтрах для отрисовки
  #filters = FILTER_TYPES.map((filter) => ({ filterName: filter }));

  init() {
    const tripFiltersComponent = new TripFiltersView(this.#filters);
    render(tripFiltersComponent, this.#siteTripControlsElement);
    // если точек нет = массив.length=0, то ничего больше не выводим
    if (this.#allAdaptedPoints.length === 0) {
      return;
    }
    render(this.#tripInfoComponent, this.#container, RenderPosition.AFTERBEGIN); // отрисовываем компонент-контейнер
    render(this.#tripAbouteComponent, this.#tripInfoComponent.element);
    render(this.#tripTotalComponent, this.#tripInfoComponent.element);
  }
}
