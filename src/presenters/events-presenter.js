// второстепенный презентер, отрисовывает одну точку в списке
import { render, replace } from '../framework/render';

import NoPointsView from '../view/no-points-view';
import EventEditView from '../view/edit-form/edit-form-view';
import EventEditHeaderView from '../view/edit-form/header-view';

import EventEditDetailsView from '../view/edit-form/details-view';
import EventEditOffersView from '../view/edit-form/offers-view';
import EventEditDestinationView from '../view/edit-form/destination-view';

import EventItemView from '../view/event-item-view';

export default class EventsPresenter {
  #container;
  #point;

  constructor(container, point) {
    this.#container = container;
    this.#point = point;
  }

  #renderPoint(point) {
    // на входе адаптированная точка
    const onEscKeyDown = (evt) => {
      if (evt.key === 'Escape') {
        evt.preventDefault();
        replaceFormToPoint();
        document.removeEventListener('keydown', onEscKeyDown);
      }
    };
    // создаем компонент закрытой точки
    const eventItemView = new EventItemView(point, () => {
      replacePointToForm();
      document.addEventListener('keydown', onEscKeyDown);
    });

    // создаем компоненты формы редактирования
    const eventEditComponent = new EventEditView(() => {
      // форма редактирования
      replaceFormToPoint();
      document.removeEventListener('keydown', onEscKeyDown);
    });

    // внутренности формы редактирования
    const eventEditHeaderComponent = new EventEditHeaderView(point); // header формы - передаем элемент для открытой точки
    const eventEditDetailsComponent = new EventEditDetailsView(); // детали в форме, контейнер для офферов и ПН
    const eventEditOffersComponent = new EventEditOffersView(point.offersInfo); // офферы в форме
    const eventEditDestinationComponent = new EventEditDestinationView(point); // пункт назначения в форме

    // рисуем закрытую точку
    render(eventItemView, this.#container);

    // открытие формы
    function replacePointToForm() {
      replace(eventEditComponent, eventItemView);
      render(eventEditHeaderComponent, eventEditComponent.element.querySelector('.event'));
      render(eventEditDetailsComponent, eventEditComponent.element.querySelector('.event'));
      render(eventEditOffersComponent, eventEditComponent.element.querySelector('.event__details'));
      render(eventEditDestinationComponent, eventEditComponent.element.querySelector('.event__details'));
    }
    // закрытие формы
    function replaceFormToPoint() {
      replace(eventItemView, eventEditComponent);
    }
  }

  init() {
    //отрисовываем закрытую точку в списке
    this.#renderPoint(this.#point);
  }
}
