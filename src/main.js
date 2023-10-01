import HeaderPresenter from './presenters/header-presenter';
import Model from './model/model';
import MockModel from './model/mock-model';

const mocks = new MockModel();

const destinations = mocks.getDestinations();
const offers = mocks.getOffers();
const points = mocks.generatePoints();

const model = new Model({ destinations, offers, points });

//----------------------------- header Presenter --------------------------
const siteTripMainElement = document.querySelector('.trip-main'); //контейнер для trip-info
const headerPresenter = new HeaderPresenter(siteTripMainElement, model);
headerPresenter.init();

console.log(points);
console.log(offers);
console.log(destinations);
