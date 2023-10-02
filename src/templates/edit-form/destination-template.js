function getDestinationImgs(destinationPhotos) {
  return destinationPhotos
    .map(
      (destinationPhoto) =>
        `<img class="event__photo" src="${destinationPhoto.src}" alt="${destinationPhoto.alt}"></img>`
    )
    .join('');
}
function getEventEditDestinationTemplate({ destinationDescription, destinationPhotos }) {
  return `
  <section class="event__section  event__section--destination">
    <h3 class="event__section-title  event__section-title--destination">Destination</h3>
    <p class="event__destination-description">
      ${destinationDescription}
    </p>

    <div class="event__photos-container">
      <div class="event__photos-tape">
        ${getDestinationImgs(destinationPhotos)}
      </div>
    </div>
  </section>
  `;
}
function createEventEditDestinationTemplate({ destination, destinationDescription, destinationPhotos }) {
  return destination ? getEventEditDestinationTemplate({ destinationDescription, destinationPhotos }) : '';
}

export { createEventEditDestinationTemplate };
