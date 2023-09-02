import { createNoPointTemplate } from '../templates/no-points-template';
import AbstractView from '../framework/view/abstract-view';

export default class EventItemView extends AbstractView {
  get template() {
    return createNoPointTemplate();
  }
}
