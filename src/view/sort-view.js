import { createSortTemplate } from '../templates/sort-form-template';
import AbstractView from '../framework/view/abstract-view';

export default class SortView extends AbstractView {
  get template() {
    return createSortTemplate();
  }
}
