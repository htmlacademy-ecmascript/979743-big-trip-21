import { createNoPointTemplate } from '../templates/no-points-template';
import AbstractView from '../framework/view/abstract-view';

export default class NoPointsView extends AbstractView {
  #currentFilter = '';
  #isServerFailed = false;
  constructor({ currentFilter, isServerFailed }) {
    super();
    this.#currentFilter = currentFilter;
    this.#isServerFailed = isServerFailed;
  }

  get template() {
    return createNoPointTemplate(this.#currentFilter, this.#isServerFailed);
  }
}
