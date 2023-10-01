import { createEventEditHeaderTemplate } from './header-template';
import { createEventEditDetailsTemplate } from './details-template';
function createEventEditTemplate({ pointState, offers, destnations }) {
  return `
  <li class="trip-events__item">
    <form class="event event--edit" action="#" method="post">
      ${createEventEditHeaderTemplate(pointState)}
      ${createEventEditDetailsTemplate(pointState)}
    </form>
  </li>
  `;
}

export { createEventEditTemplate };
