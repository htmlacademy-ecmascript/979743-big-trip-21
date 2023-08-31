import { createTripAbouteTemplate } from '../templates/trip-aboute-template';
import AbstractView from '../framework/view/abstract-view';

export default class TripAbouteView extends AbstractView {
  get template() {
    return createTripAbouteTemplate();
  }
}
