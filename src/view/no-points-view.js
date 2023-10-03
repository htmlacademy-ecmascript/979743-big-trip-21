import { createNoPointTemplate } from '../templates/no-points-template';
import AbstractView from '../framework/view/abstract-view';

export default class NoPointsView extends AbstractView {
  get template() {
    return createNoPointTemplate();
  }
}

// export { NoPointsView };
