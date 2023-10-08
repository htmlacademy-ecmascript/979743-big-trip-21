import { createNewEventBtnTemplate } from '../templates/new-event-btn';
import AbstractView from '../framework/view/abstract-view';

export default class NewEventBtnView extends AbstractView {
  #newEventClickHandler = null;

  constructor({ newEventClickHandler }) {
    super();
    this.#newEventClickHandler = newEventClickHandler;
    this.element.addEventListener('click', this.#onNewEventClick);
  }

  #onNewEventClick = () => {
    this.element.disabled = true;
    this.#newEventClickHandler();
  };

  get template() {
    return createNewEventBtnTemplate();
  }
}
