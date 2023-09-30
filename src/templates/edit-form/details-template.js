// секция, делатли в форме, контейнер для офферов и пункта назначения
import { createEventEditOffersTemplate } from './offers-template';
import { createEventEditDestinationTemplate } from './destination-template';

function createEventEditDetailsTemplate(point) {
  return `
  <section class="event__details">
    ${createEventEditOffersTemplate(point.offersInfo)}
    ${createEventEditDestinationTemplate(point)}
  </section>
  `;
}

export { createEventEditDetailsTemplate };
