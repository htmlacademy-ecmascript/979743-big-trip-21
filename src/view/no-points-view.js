import { createNoPointTemplate } from '../templates/no-points-template';
import AbstractView from '../framework/view/abstract-view';

export default class NoPointsView extends AbstractView {
  #currentFilter = '';
  constructor({ currentFilter }) {
    super();
    this.#currentFilter = currentFilter;
  }

  get template() {
    return createNoPointTemplate(this.#currentFilter);
  }
}
