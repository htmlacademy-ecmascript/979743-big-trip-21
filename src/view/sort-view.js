import { createSortTemplate } from '../templates/sort-form-template';
import AbstractView from '../framework/view/abstract-view';

export default class SortView extends AbstractView {
  #sortings;

  constructor(sortings) {
    super();
    this.#sortings = sortings;
  }

  #adaptSorting(sortings) {
    return Object.entries(sortings).map((sort) => ({ ...sort[1] }));
  }

  get template() {
    console.log(this.#adaptSorting(this.#sortings));
    return createSortTemplate(this.#adaptSorting(this.#sortings));
  }
}
