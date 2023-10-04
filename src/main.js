import HeaderPresenter from './presenters/header-presenter';
import Model from './model/model';
import MockModel from './model/mock-model';
import PointApiService from './point-api-service';
import dayjs from 'dayjs';

const AUTHORIZATION = 'Basic hvkdngbn645cl1sa2j';
const END_POINT = 'https://21.objects.pages.academy/big-trip';

const mocks = new MockModel();

// const destinations = mocks.getDestinations();
// const offers = mocks.getOffers();
// const points = mocks.generatePoints();

const model = new Model({
  // destinations: destinations,
  // offers: offers,
  // points: points,
  pointApiService: new PointApiService(END_POINT, AUTHORIZATION),
});

model.init();
// finally(() =>{
//   render(newEventBtnComponent, siteTripMainElement);
// });

//----------------------------- header Presenter --------------------------
const siteTripMainElement = document.querySelector('.trip-main'); //контейнер для trip-info
const headerPresenter = new HeaderPresenter(siteTripMainElement, model);
headerPresenter.init();
