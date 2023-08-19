// отрисовка компонент header-а
import { render, RenderPosition } from '../render';
import TripInfoView from '../view/trip-info-view';
import TripAbouteView from '../view/trip-aboute-view';
import TripTotalView from '../view/trip-total-view';
import TripFiltersView from '../view/filters-view';

export default class HeaderPresenter {
  constructor(container) {
    this.container = container;
  }

  tripInfoComponent = new TripInfoView();
  tripAbouteComponent = new TripAbouteView();
  tripTotalComponent = new TripTotalView();

  siteTripControlsElement = document.querySelector('.trip-controls__filters'); //контейнер для filters
  tripFiltersComponent = new TripFiltersView();

  init() {
    render(this.tripInfoComponent, this.container, RenderPosition.AFTERBEGIN); // отрисовываем компонент-контейнер
    render(this.tripAbouteComponent, this.tripInfoComponent.getElement());
    render(this.tripTotalComponent, this.tripInfoComponent.getElement());
    render(this.tripFiltersComponent, this.siteTripControlsElement);
  }
}
