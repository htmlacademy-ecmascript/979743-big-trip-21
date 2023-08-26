// форма, все ее внутренности отрисовываются здесь
import { createEventEditTemplate } from '../templates/event-edit-form-template';
import { createElement, render } from '../render';

import EventEditHeaderView from '../view/event-edit-form-header-view'; // header формы
import EventEditDetailsView from '../view/event-edit-form-details-view';
import EventEditOffersView from '../view/event-edit-form-offers-view';
import EventEditDestinationView from '../view/event-edit-form-destination-view';
export default class EventEditView {
  constructor(pointInfo) {
    this.pointInfo = pointInfo;
  }

  // testData = {
  //   type: 'Bus',
  //   date: 'MAR 20',
  // };

  // ВРЕМЕННО
  // showPointInfo() {
  //   console.log(this.pointInfo);
  // }

  // insides
  eventEditHeaderComponent = new EventEditHeaderView(this.testData); // header формы
  eventEditDetailsComponent = new EventEditDetailsView(); // детали в форме, конт-р для офферов и пункта назна-я
  eventEditOffersComponent = new EventEditOffersView(); // офферы в форме
  eventEditDestinationComponent = new EventEditDestinationView(); // пункт назначения в форме

  getTemplate() {
    return createEventEditTemplate();
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }
    return this.element;
  }

  renderInsides() {
    // this.eventEditHeaderComponent.showPointInfo(); // ВРЕМЕННО
    render(
      this.eventEditHeaderComponent,
      this.getElement().querySelector('.event') // компонент вставляет внутренности в себя, header формы
    );
    render(this.eventEditDetailsComponent, this.getElement().querySelector('.event')); // детали в форме, конт-р для офферов и пункта назна-я
    render(this.eventEditOffersComponent, this.eventEditDetailsComponent.getElement()); // офферы
    render(this.eventEditDestinationComponent, this.eventEditDetailsComponent.getElement()); // пункт назначения
  }

  removeElement() {
    this.element = null;
  }
}
