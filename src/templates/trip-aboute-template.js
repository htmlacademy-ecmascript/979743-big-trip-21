function createTripAbouteTemplate({
  dateFrom,
  dateTo,
  totalStartDestionation,
  totalEndDestination,
  totalTransitionalDestination,
}) {
  return `
  <div class="trip-info__main">
    <h1
    class="trip-info__title">
    ${totalStartDestionation} &mdash;
    ${totalTransitionalDestination}
    ${totalTransitionalDestination ? '&mdash;' : ''}
    ${totalEndDestination}</h1>

    <p class="trip-info__dates">${dateFrom}&nbsp;&mdash;&nbsp;${dateTo}</p>
  </div>
  `;
}

export { createTripAbouteTemplate };
