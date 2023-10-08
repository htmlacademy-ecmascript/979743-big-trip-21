import { createSortTemplate } from '../templates/sort-form-template';
import AbstractView from '../framework/view/abstract-view';
import { SortType } from '../consts';

export default class SortView extends AbstractView {
  #sortings = null;
  #currentSortType = null;
  #sortTypeChangeHandler = null;

  constructor({ currentSortType, sortTypeChangeHandler }) {
    super();
    this.#currentSortType = currentSortType; // по умолчанию??
    this.#sortings = SortType;
    this.#sortTypeChangeHandler = sortTypeChangeHandler;
    this.element.addEventListener('change', this.#onSortTypeChange);
  }

  #onSortTypeChange = (evt) => {
    this.#sortTypeChangeHandler(evt.target.value.slice(5));
  };

  #adaptSorting(sortings) {
    return Object.entries(sortings).map((sort) => ({ ...sort[1] }));
  }

  get template() {
    return createSortTemplate(this.#adaptSorting(this.#sortings), this.#currentSortType);
  }
}
