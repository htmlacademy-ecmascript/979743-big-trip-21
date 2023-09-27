import { createSortTemplate } from '../templates/sort-form-template';
import AbstractView from '../framework/view/abstract-view';

export default class SortView extends AbstractView {
  #sortings;

  constructor(sortings) {
    super();
    this.#sortings = sortings;
  }

  get template() {
    return createSortTemplate(this.#sortings);
  }
}
