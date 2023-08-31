// возвращает данные о пунктах назначения в том виде, как они типа на сервере хранятся
// из них будет выборка и по ним потом поиск будет
import { CITIES } from './const';
function generateDestination(city) {
  return {
    id: crypto.randomUUID(),
    name: city.name,
    description: city.description,
    photos: [
      {
        // src: `https://loremflickr.com/248/152?random=654`,
        src: 'https://loremflickr.com/228/152?random=6513',
        alt: `${city.name} photo`,
      },
      {
        src: `https://loremflickr.com/248/152?random=${crypto.randomUUID()}`,
        alt: `${city.name} photo`,
      },
      {
        src: `https://loremflickr.com/248/152?random=${crypto.randomUUID()}`,
        alt: `${city.name} photo`,
      },
      {
        src: `https://loremflickr.com/248/152?random=${crypto.randomUUID()}`,
        alt: `${city.name} photo`,
      },
      {
        src: `https://loremflickr.com/248/152?random=${crypto.randomUUID()}`,
        alt: `${city.name} photo`,
      },
    ],
  };
}

function generateAllDestinations() {
  return CITIES.map(generateDestination);
}

export { generateAllDestinations };
