// фильтры, форма
import { createFiltersTemplate } from '../templates/filters-temlate';
import AbstractView from '../framework/view/abstract-view';

export default class TripFiltersView extends AbstractView {
  // #onFilterClick = null;
  #filters;
  constructor(filters) {
    super();
    this.#filters = filters;
    // this.element.querySelector('#filter-future').addEventListener('click', this.#onFilterClick); // пока прослушка только на future
  }

  get template() {
    return createFiltersTemplate(this.#filters);
  }
}
