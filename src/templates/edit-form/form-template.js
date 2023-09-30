import { createEventEditHeaderTemplate } from './header-template';
import { createEventEditDetailsTemplate } from './details-template';
function createEventEditTemplate(point) {
  return `
  <li class="trip-events__item">
    <form class="event event--edit" action="#" method="post">
      ${createEventEditHeaderTemplate(point)}
      ${createEventEditDetailsTemplate(point)}
    </form>
  </li>
  `;
}

export { createEventEditTemplate };
