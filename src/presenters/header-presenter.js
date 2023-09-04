// отрисовка компонент header-а
import { render, RenderPosition } from '../framework/render';
import TripInfoView from '../view/trip-info-view';
import TripAbouteView from '../view/trip-aboute-view';
import TripTotalView from '../view/trip-total-view';
import TripFiltersView from '../view/filters-view';

export default class HeaderPresenter {
  #container;
  #adaptedPoints;

  constructor(container, model) {
    this.#container = container;
    this.#adaptedPoints = model.adaptedPoints; // приводит к ошибке, почему??
    // this.#adaptedPoints = []; // для теста заглушки
  }

  #tripInfoComponent = new TripInfoView();
  #tripAbouteComponent = new TripAbouteView();
  #tripTotalComponent = new TripTotalView();

  #siteTripControlsElement = document.querySelector('.trip-controls__filters'); //контейнер для filters
  // #tripFiltersComponent = new TripFiltersView();

  init() {
    const tripFiltersComponent = new TripFiltersView(() => console.log('кликнули фильтр'));
    render(tripFiltersComponent, this.#siteTripControlsElement);
    // если точек нет = массивюlength=0, то ничего больше не выводим
    // вынести в отдельную функцию?
    if (this.#adaptedPoints.length === 0) {
      return;
    }
    render(this.#tripInfoComponent, this.#container, RenderPosition.AFTERBEGIN); // отрисовываем компонент-контейнер
    render(this.#tripAbouteComponent, this.#tripInfoComponent.element);
    render(this.#tripTotalComponent, this.#tripInfoComponent.element);
  }
}
