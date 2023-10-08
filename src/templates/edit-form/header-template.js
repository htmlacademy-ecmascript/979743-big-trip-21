import he from 'he';

function getDestinationsListTemplate(destinationNames) {
  return destinationNames.map((destinationName) => `<option value="${destinationName}"></option>`).join('');
}

function getCanceleleteBtn(id, isDisabled, isDeleting) {
  if (id) {
    return `
      <button class="event__reset-btn" type="reset" ${isDisabled ? 'disabled' : ''}>
        ${isDeleting ? 'Deleting...' : 'Delete'}
      </button>
    `;
  } else {
    return '<button class="event__reset-btn" type="reset">Cancel</button>';
  }
}

function createEventEditHeaderTemplate(
  { id, type, destination, destinationName, dateFrom, dateTo, basePrice, isDisabled, isSaving, isDeleting },
  destinationNames
) {
  return `
  <header class="event__header">
    <div class="event__type-wrapper">
      <label class="event__type  event__type-btn" for="event-type-toggle-${id}">
        <span class="visually-hidden">Choose event type</span>
        <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
      </label>
      <input
        class="event__type-toggle  visually-hidden"
        id="event-type-toggle-${id}"
        type="checkbox"
        ${isDisabled ? 'disabled' : ''}>
      <div class="event__type-list">
        <fieldset class="event__type-group">
          <legend class="visually-hidden">Event type</legend>
          <div class="event__type-item">
            <input id="event-type-taxi-${id}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="taxi"
            ${type === 'taxi' ? 'checked' : ''}>
            <label class="event__type-label  event__type-label--taxi" for="event-type-taxi-${id}">Taxi</label>
          </div>
          <div class="event__type-item">
            <input id="event-type-bus-${id}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="bus"
            ${type === 'bus' ? 'checked' : ''}>
            <label class="event__type-label  event__type-label--bus" for="event-type-bus-${id}">Bus</label>
          </div>
          <div class="event__type-item">
            <input id="event-type-train-${id}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="train"
            ${type === 'train' ? 'checked' : ''}>
            <label class="event__type-label  event__type-label--train" for="event-type-train-${id}">Train</label>
          </div>
          <div class="event__type-item">
            <input id="event-type-ship-${id}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="ship"
            ${type === 'ship' ? 'checked' : ''}>
            <label class="event__type-label  event__type-label--ship" for="event-type-ship-${id}">Ship</label>
          </div>
          <div class="event__type-item">
            <input id="event-type-drive-${id}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="drive"
            ${type === 'drive' ? 'checked' : ''}>
            <label class="event__type-label  event__type-label--drive" for="event-type-drive-${id}">Drive</label>
          </div>
          <div class="event__type-item">
            <input id="event-type-flight-${id}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="flight"
            ${type === 'flight' ? 'checked' : ''}>
            <label class="event__type-label  event__type-label--flight" for="event-type-flight-${id}">Flight</label>
          </div>
          <div class="event__type-item">
            <input id="event-type-check-in-${id}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="check-in"
            ${type === 'check-in' ? 'checked' : ''}>
            <label class="event__type-label  event__type-label--check-in" for="event-type-check-in-${id}">Check-in</label>
          </div>
          <div class="event__type-item">
            <input id="event-type-sightseeing-${id}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="sightseeing"
            ${type === 'sightseeing' ? 'checked' : ''}>
            <label class="event__type-label  event__type-label--sightseeing" for="event-type-sightseeing-${id}">Sightseeing</label>
          </div>
          <div class="event__type-item">
            <input id="event-type-restaurant-${id}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="restaurant"
            ${type === 'restaurant' ? 'checked' : ''}>
            <label class="event__type-label  event__type-label--restaurant" for="event-type-restaurant-${id}">Restaurant</label>
          </div>
        </fieldset>
      </div>
    </div>
    <div class="event__field-group  event__field-group--destination">
      <label class="event__label  event__type-output" for="event-destination-${id}">
        ${type}
      </label>
      <input
        class="event__input  event__input--destination" id="event-destination-${id}"
        type="text"
        name="event-destination"
        value="${destination ? destinationName : ''}"
        list="destination-list-${id}"
        ${isDisabled ? 'disabled' : ''}>
      <datalist id="destination-list-${id}">
        ${getDestinationsListTemplate(destinationNames)}
      </datalist>
    </div>
    <div class="event__field-group  event__field-group--time">
      <label class="visually-hidden" for="event-start-time">From</label>
      <input
        class="event__input  event__input--time"
        id="event-start-time"
        type="text"
        name="event-start-time"
        value="${dateFrom}"
        ${isDisabled ? 'disabled' : ''}>
        &mdash;
      <label class="visually-hidden" for="event-end-time">To</label>
      <input
        class="event__input  event__input--time"
        id="event-end-time"
        type="text"
        name="event-end-time"
        value="${dateTo}"
        ${isDisabled ? 'disabled' : ''}>
    </div>
    <div class="event__field-group  event__field-group--price">
      <label class="event__label" for="event-price-${id}">
        <span class="visually-hidden">Price</span>
        &euro;
      </label>
      <input
        class="event__input  event__input--price"
        id="event-price-${id}"
        type="number"
        ame="event-price"
        value="${basePrice}"
        ${isDisabled ? 'disabled' : ''}>
    </div>
    <button class="event__save-btn  btn  btn--blue" type="submit" ${isDisabled ? 'disabled' : ''}>
      ${isSaving ? 'saving...' : 'save'}
    </button>
    ${getCanceleleteBtn(id, isDisabled, isDeleting)}
    <button class="edit-form-view ${id ? 'event__rollup-btn' : 'visually-hidden'}" type="button">
      <span class="visually-hidden">Open event</span>
    </button>
  </header>
  `;
}

export { createEventEditHeaderTemplate };
