import HeaderPresenter from './presenters/header-presenter';
import EventsPresenter from './presenters/events-presenter';
import Model from './model/model';
import MockModel from './model/mock-model';
import EventObserver from './presenters/event-observer';

const mocks = new MockModel();

const destinations = mocks.getDestinations();
const offers = mocks.getOffers();
const points = mocks.generatePoints();

const model = new Model({ destinations, offers, points });
const observer = new EventObserver();

//----------------------------- header Presenter --------------------------
const siteTripMainElement = document.querySelector('.trip-main'); //контейнер для trip-info
const headerPresenter = new HeaderPresenter(siteTripMainElement, model, observer.transmitEvent);
headerPresenter.init();

//---------------------------- Events Presenter ------------------------------------------
const siteTripEventsElement = document.querySelector('.trip-events'); //контейнер для trip-sort и trip-events__list
const eventsPresenter = new EventsPresenter(siteTripEventsElement, model);
eventsPresenter.init();

console.log(model.allAdaptedPoints);
console.log(model.futurePoints);
console.log(model.presentPoints);
console.log(model.pastPoints);
