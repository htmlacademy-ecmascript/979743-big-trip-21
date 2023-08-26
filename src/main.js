import HeaderPresenter from './presenters/header-presenter';
import EventsPresenter from './presenters/events-presenter';
import MockModel from './model/mock-model';

//----------------------------- header Presenter --------------------------
const siteTripMainElement = document.querySelector('.trip-main'); //контейнер для trip-info
const headerPresenter = new HeaderPresenter(siteTripMainElement);
headerPresenter.init();

//---------------------------- Events Presenter ------------------------------------------
const siteTripEventsElement = document.querySelector('.trip-events'); //контейнер для trip-sort и trip-events__list
const eventsPresenter = new EventsPresenter(siteTripEventsElement);
eventsPresenter.init();

// --------------тестируем генерацию моков
const mocks = new MockModel();
// console.log(mocks.getDestinations());
// console.log(mocks.getOffers());
// console.log(mocks.generateOnePoint());
console.log(mocks.generatePoints());
