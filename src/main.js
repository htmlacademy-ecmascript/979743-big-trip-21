import { render, RenderPosition } from './render';
import { EVENT_POINTS } from './consts';

import TripInfoView from './view/trip-info-view';
import TotalView from './view/total-view';
import TripAboutelView from './view/trip-aboute-view';
import TripFilterslView from './view/filters-view';

import SortlView from './view/sort-view';
import EventsListView from './view/events-list-view';
import EventEditView from './view/event-edit-form-view';
import EventEditHeaderView from './view/event-edit-form-header-view';
import EventEditDetailsView from './view/event-edit-form-details-view';
import EventEditOffersView from './view/event-edit-form-offers-view';
import EventEditDestinationView from './view/event-edit-form-destination-view';
import EventItemView from './view/event-item-view';

//----------------------------- header Presenter --------------------------
const siteTripMainElement = document.querySelector('.trip-main'); //контейнер для trip-info
const siteTripControlsElement = siteTripMainElement.querySelector('.trip-controls__filters'); //контейнер для filters

const tripInfo = new TripInfoView();
render(tripInfo, siteTripMainElement, RenderPosition.AFTERBEGIN); // отрисовываем компонент-контейнер
const siteTripInfoElement = tripInfo.getElement(); // сохраняем компонент-контейнер для дальнейшего использования

render(new TripAboutelView(), siteTripInfoElement);
render(new TotalView(), siteTripInfoElement);

render(new TripFilterslView(), siteTripControlsElement);

//---------------------------- Events Presenter ------------------------------------------
const siteTripEventsElement = document.querySelector('.trip-events'); //контейнер для trip-sort и trip-events__list
render(new SortlView(), siteTripEventsElement); // сортировка, форма

const eventsList = new EventsListView(); // список
render(eventsList, siteTripEventsElement);
const siteEventsListElement = eventsList.getElement();

const eventEdit = new EventEditView(); // форма
render(eventEdit, siteEventsListElement);
const siteEventEditFormElement = eventEdit.getElement().querySelector('.event'); // получили форму

render(new EventEditHeaderView(), siteEventEditFormElement); // header формы

const eventEditDetails = new EventEditDetailsView(); // секция детали в форме, контейнер для офферов и пункта назначения
render(eventEditDetails, siteEventEditFormElement);
const siteEventEditFormDetailsElement = eventEditDetails.getElement(); //получили контейнер для офферов и пункта назначения

// офферы и пункт назначения в форме
render(new EventEditOffersView(), siteEventEditFormDetailsElement);
render(new EventEditDestinationView(), siteEventEditFormDetailsElement);

// остальные точки
for (let i = 0; i < EVENT_POINTS.length; i++) {
  render(new EventItemView(EVENT_POINTS[i]), siteEventsListElement);
}
