import { createEventEditHeaderTemplate } from './header-template';
import { createEventEditDetailsTemplate } from './details-template';
function createEventEditTemplate({ pointState, destinationNames }) {
  // return 'шаблон формы';
  return `
  <li class="trip-events__item">
    <form class="event event--edit" action="#" method="post">
      ${createEventEditHeaderTemplate(pointState, destinationNames)}
      ${createEventEditDetailsTemplate(pointState)}
    </form>
  </li>
  `;
}

export { createEventEditTemplate };
