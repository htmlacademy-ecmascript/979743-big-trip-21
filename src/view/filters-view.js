// фильтры, форма
import { createFiltersTemplate } from '../templates/filters-temlate';
import AbstractView from '../framework/view/abstract-view';

export default class TripFiltersView extends AbstractView {
  // #onFilterClick = null;
  #filters = null;
  #filterTypeClickHandler = null;
  constructor({ filters, filterTypeClickHandler }) {
    super();
    this.#filters = filters;
    this.#filterTypeClickHandler = filterTypeClickHandler;
    this.element.addEventListener('change', this.#onFilterClick); // пока прослушка только на future
  }

  #onFilterClick = (evt) => {
    // отследить выделение выбранного пункта
    this.#filterTypeClickHandler(evt.target.value);
  };

  get template() {
    return createFiltersTemplate(this.#filters);
  }
}
