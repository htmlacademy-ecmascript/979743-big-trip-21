function getDestinationImgs(destinationPhotos) {
  return destinationPhotos
    .map(
      (destinationPhoto) =>
        `<img class="event__photo" src="${destinationPhoto.src}" alt="${destinationPhoto.alt}"></img>`
    )
    .join('');
}
function getPhotosTape(destinationPhotos) {
  if (destinationPhotos.length > 0) {
    return `
      <div class="event__photos-container">
        <div class="event__photos-tape">
          ${getDestinationImgs(destinationPhotos)}
        </div>
      </div>
    `;
  } else {
    return '';
  }
}

function getEventEditDestinationTemplate({ destinationDescription, destinationPhotos }) {
  if (destinationDescription && destinationPhotos) {
    return `
      <section class="event__section  event__section--destination">
        <h3 class="event__section-title  event__section-title--destination">Destination</h3>
        <p class="event__destination-description">
          ${destinationDescription}
        </p>
        ${getPhotosTape(destinationPhotos)}
      </section>
      `;
  } else {
    return '';
  }
}
function createEventEditDestinationTemplate({ destination, destinationDescription, destinationPhotos }) {
  return destination ? getEventEditDestinationTemplate({ destinationDescription, destinationPhotos }) : '';
}

export { createEventEditDestinationTemplate };
