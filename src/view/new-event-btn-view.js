import { createNewEventBtnTemplate } from '../templates/new-event-btn';
import AbstractView from '../framework/view/abstract-view';

export default class NewEventBtn extends AbstractView {
  get template() {
    return createNewEventBtnTemplate();
  }
}
