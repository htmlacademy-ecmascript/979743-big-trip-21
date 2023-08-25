import { getRandomArrayElement } from '../util';
import { CITIES } from './const';

function generateDestination() {
  const city = getRandomArrayElement(CITIES);
  return {
    id: crypto.randomUUID(),
    name: city.name,
    description: city.description,
    photos: [
      {
        src: `https://loremflickr.com/228/152&random=${crypto.randomUUID()}`,
        alt: `${city.name} photo`,
      },
    ],
  };
}

export { generateDestination };
