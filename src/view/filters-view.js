// форма
import { createFiltersTemplate } from '../templates/filters-temlate';
import AbstractView from '../framework/view/abstract-view';

export default class TripFiltersView extends AbstractView {
  get template() {
    return createFiltersTemplate();
  }
}
