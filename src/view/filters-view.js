// фильтры, форма
import { createFiltersTemplate } from '../templates/filters-temlate';
import AbstractView from '../framework/view/abstract-view';
import { FILTER_TYPES } from '../consts';

export default class TripFiltersView extends AbstractView {
  // #onFilterClick = null;
  #filters = null;
  #isDisabled = true;
  #filterTypeClickHandler = null;
  constructor({ isDisabled, filterTypeClickHandler }) {
    super();
    this.#filters = FILTER_TYPES.map((filter) => ({ filterName: filter })); //готовим данные о фильтрах для отрисовки,
    this.#isDisabled = isDisabled;
    this.#filterTypeClickHandler = filterTypeClickHandler;
    this.element.addEventListener('change', this.#onFilterClick); // пока прослушка только на future
  }

  #onFilterClick = (evt) => {
    this.#filterTypeClickHandler(evt.target.value);
  };

  get template() {
    return createFiltersTemplate(this.#filters, this.#isDisabled);
  }
}
