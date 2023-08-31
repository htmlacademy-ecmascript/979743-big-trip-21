import { createTripTotalTemplate } from '../templates/trip-total-template';
import AbstractView from '../framework/view/abstract-view';

export default class TripTotalView extends AbstractView {
  get template() {
    return createTripTotalTemplate();
  }
}
