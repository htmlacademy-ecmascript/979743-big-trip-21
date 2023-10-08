// находятся в детялях формы
function getOffers(offersInfo) {
  return offersInfo
    .map(
      (offer) =>
        `
          <div class="event__offer-selector">
            <input
              class="event__offer-checkbox  visually-hidden"
              id="${offer.id}"
              type="checkbox"
              name="event-offer-luggage"
              ${offer.isChecked ? 'checked' : ''}
              >
            <label class="event__offer-label" for="${offer.id}">
              <span class="event__offer-title">${offer.title}</span>
              &plus;&euro;&nbsp;
              <span class="event__offer-price">${offer.price}</span>
            </label>
          </div>
        `
    )
    .join('');
}

function createEventEditOffersTemplate(offersInfo) {
  return `
      <section class="${offersInfo.length > 0 ? 'event__section  event__section--offers' : 'visually-hidden'}">
        <h3 class="event__section-title  event__section-title--offers">Offers</h3>
        <div class="event__available-offers">
          ${getOffers(offersInfo)}
        </div>
      </section>
  `;
}

export { createEventEditOffersTemplate };
