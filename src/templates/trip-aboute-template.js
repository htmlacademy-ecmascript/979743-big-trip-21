function createTripAbouteTemplate({ dateFrom, dateTo }) {
  return `
  <div class="trip-info__main">
    <h1 class="trip-info__title">Amsterdam &mdash; Chamonix &mdash; Geneva</h1>

    <p class="trip-info__dates">${dateFrom}&nbsp;&mdash;&nbsp;${dateTo}</p>
  </div>
  `;
}

export { createTripAbouteTemplate };
