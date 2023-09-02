import { createEventsListTemplate } from '../templates/events-list-template';
import AbstractView from '../framework/view/abstract-view';

export default class EventsListView extends AbstractView {
  get template() {
    return createEventsListTemplate();
  }
}
