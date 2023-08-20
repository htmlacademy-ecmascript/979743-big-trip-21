import HeaderPresenter from './presenters/header-presenter';
import EventsPresenter from './presenters/events-presenter';

//----------------------------- header Presenter --------------------------
const siteTripMainElement = document.querySelector('.trip-main'); //контейнер для trip-info
const headerPresenter = new HeaderPresenter(siteTripMainElement);
headerPresenter.init();

//---------------------------- Events Presenter ------------------------------------------
const siteTripEventsElement = document.querySelector('.trip-events'); //контейнер для trip-sort и trip-events__list
const eventsPresenter = new EventsPresenter(siteTripEventsElement);
eventsPresenter.init();
