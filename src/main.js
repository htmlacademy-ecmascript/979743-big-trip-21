// версия для второй проверки
import HeaderPresenter from './presenters/header-presenter';
import Model from './model/model';
import PointApiService from './point-api-service';

const AUTHORIZATION = 'Basic hvkdngbn645cl1sa2j';
const END_POINT = 'https://21.objects.pages.academy/big-trip';

const model = new Model({
  pointApiService: new PointApiService(END_POINT, AUTHORIZATION),
});

model.init();

//----------------------------- header Presenter --------------------------
const siteTripMainElement = document.querySelector('.trip-main'); //контейнер для trip-info
const headerPresenter = new HeaderPresenter(siteTripMainElement, model);
headerPresenter.init();
