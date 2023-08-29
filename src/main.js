import HeaderPresenter from './presenters/header-presenter';
import EventsPresenter from './presenters/events-presenter';
import Model from './model/model'; // ВРЕМЕННО
import MockModel from './model/mock-model';

const mocks = new MockModel();

const model = new Model(mocks);

//----------------------------- header Presenter --------------------------
const siteTripMainElement = document.querySelector('.trip-main'); //контейнер для trip-info
const headerPresenter = new HeaderPresenter(siteTripMainElement);
headerPresenter.init();

//---------------------------- Events Presenter ------------------------------------------
const siteTripEventsElement = document.querySelector('.trip-events'); //контейнер для trip-sort и trip-events__list
const eventsPresenter = new EventsPresenter(siteTripEventsElement, model);
eventsPresenter.init();
