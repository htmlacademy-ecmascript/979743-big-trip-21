function createNoPointTemplate(currentFilter, isServerFailed) {
  let noPointsText;
  if (isServerFailed) {
    noPointsText = 'Failed to load latest route information';
    return `
      <p class="trip-events__msg">${noPointsText}</p>
    `;
  }

  switch (currentFilter) {
    case 'everything':
      noPointsText = 'Click New Event to create your first point';
      break;
    case 'future':
      noPointsText = 'There are no future events now';
      break;
    case 'present':
      noPointsText = 'There are no present events now';
      break;
    case 'past':
      noPointsText = 'There are no past events now';
      break;
  }

  return `
    <p class="trip-events__msg">${noPointsText}</p>
    `;
}

export { createNoPointTemplate };
