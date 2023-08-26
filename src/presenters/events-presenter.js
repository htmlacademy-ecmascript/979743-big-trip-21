// отрисовка компонентов списка событий
import { EVENT_POINTS } from '../consts';
import { render, RenderPosition } from '../render';

import Model from '../model/model';

import SortView from '../view/sort-view';
import EventsListView from '../view/events-list-view';
import EventEditView from '../view/event-edit-form-view';
// import EventEditHeaderView from '../view/event-edit-form-header-view'; //-----------
// import EventEditDetailsView from '../view/event-edit-form-details-view';
// import EventEditOffersView from '../view/event-edit-form-offers-view';
// import EventEditDestinationView from '../view/event-edit-form-destination-view';
import EventItemView from '../view/event-item-view';

export default class EventsPresenter {
  constructor(container) {
    this.container = container;
  }
  // ---------- получаем данные

  data = new Model();
  adaptedData = this.data.adaptOpenPointData();

  // testData = {
  //   type: 'Flight',
  //   date: 'MAR 18',
  // };

  // ---------------------------

  sortComponent = new SortView();
  eventsListComponent = new EventsListView();
  eventEditComponent = new EventEditView(this.adaptedData); // форма редактирования

  // eventEditHeaderComponent = new EventEditHeaderView(); // header формы ----------------------
  // eventEditDetailsComponent = new EventEditDetailsView(); // детали в форме, конт-р для офферов и пункта назна-я
  // eventEditOffersComponent = new EventEditOffersView(); // офферы в форме
  // eventEditDestinationComponent = new EventEditDestinationView(); // пункт назначения в форме

  init() {
    // this.eventEditComponent.showPointInfo();
    render(this.sortComponent, this.container);
    render(this.eventsListComponent, this.container);
    render(this.eventEditComponent, this.eventsListComponent.getElement(), RenderPosition.BEFOREEND, true); // форма редактирования

    // render(
    //   this.eventEditHeaderComponent,
    //   this.eventEditComponent.getElement().querySelector('.event')
    // ); // header формы
    // render(this.eventEditDetailsComponent, this.eventEditComponent.getElement().querySelector('.event')); // детали в форме, конт-р для офферов и пункта назна-я
    // render(this.eventEditOffersComponent, this.eventEditDetailsComponent.getElement()); // офферы
    // render(this.eventEditDestinationComponent, this.eventEditDetailsComponent.getElement()); // пункт назначения

    // остальные точки в списке
    for (let i = 0; i < EVENT_POINTS.length; i++) {
      render(new EventItemView(EVENT_POINTS[i]), this.eventsListComponent.getElement());
    }
  }
}
