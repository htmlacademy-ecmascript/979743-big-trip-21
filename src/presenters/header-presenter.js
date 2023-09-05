// отрисовка компонент header-а
import { render, RenderPosition } from '../framework/render';
import TripInfoView from '../view/trip-info-view';
import TripAbouteView from '../view/trip-aboute-view';
import TripTotalView from '../view/trip-total-view';
import TripFiltersView from '../view/filters-view';

export default class HeaderPresenter {
  #container;
  #adaptedPoints;
  #transmitEvent;

  constructor(container, model, transmitEvent) {
    this.#container = container;
    this.#adaptedPoints = model.allAdaptedPoints; // надо ли сохранять? или вызывать функ-ю из модели в процессе?
    this.#transmitEvent = transmitEvent; // это функция

    // this.#adaptedPoints = []; // для теста заглушки
  }

  #tripInfoComponent = new TripInfoView();
  #tripAbouteComponent = new TripAbouteView();
  #tripTotalComponent = new TripTotalView();

  #siteTripControlsElement = document.querySelector('.trip-controls__filters'); //контейнер для filters

  init() {
    const tripFiltersComponent = new TripFiltersView(() => {
      console.log('кликнули фильтр');
      // передаем событие в observer = вызываем ф-ю transmitEvent
      this.#transmitEvent('filterFuture');
    });
    render(tripFiltersComponent, this.#siteTripControlsElement);
    // если точек нет = массивюlength=0, то ничего больше не выводим
    if (this.#adaptedPoints.length === 0) {
      return;
    }
    render(this.#tripInfoComponent, this.#container, RenderPosition.AFTERBEGIN); // отрисовываем компонент-контейнер
    render(this.#tripAbouteComponent, this.#tripInfoComponent.element);
    render(this.#tripTotalComponent, this.#tripInfoComponent.element);
  }
}
