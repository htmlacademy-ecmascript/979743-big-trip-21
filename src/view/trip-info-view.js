import { createTripInfoTemplate } from '../templates/trip-info-template';
import AbstractView from '../framework/view/abstract-view';

export default class TripInfoView extends AbstractView {
  get template() {
    return createTripInfoTemplate();
  }
}
