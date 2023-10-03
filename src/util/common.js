import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import { MSEC_IN_DAY, MSEC_IN_HOUR } from '../consts';

function getRandomInteger(a = 0, b = 1) {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
}

function getRandomArrayElement(array) {
  return array[getRandomInteger(0, array.length - 1)];
}

// function formatStringToDateTime(date) {
//   return dayjs(date).format(DATA_FORMAT);
// }

// function formatStringToShortDate(date) {
//   return dayjs(date).format(DATA_SHORT_FORMAT);
// }

// function formatStringToTime(date) {
//   return dayjs(date).format(TIME_FORMAT);
// }

function capitalize(string) {
  // первая буква будет заглавная
  return `${string[0].toUpperCase()}${string.slice(1)}`;
}

function getPointDuration(dateFrom, dateTo) {
  dayjs.extend(duration);
  const timeDiff = dayjs(dateTo).diff(dayjs(dateFrom)); // возвращает разницу между датами/временем в миллисекундах
  let pointDuration = 0;

  switch (true) {
    case timeDiff >= MSEC_IN_DAY:
      pointDuration = dayjs.duration(timeDiff).format('DD[D] HH[H] mm[M]'); // не поняла
      break;
    case timeDiff >= MSEC_IN_HOUR:
      pointDuration = dayjs.duration(timeDiff).format('HH[H] mm[M]'); // не поняла
      break;
    case timeDiff < MSEC_IN_HOUR:
      pointDuration = dayjs.duration(timeDiff).format('mm[M]'); // не поняла
      break;
  }

  return pointDuration;
}

function sortByPrice(a, b) {
  return b.basePrice - a.basePrice;
}

function sortByTime(a, b) {
  return dayjs(b.dateTo).diff(dayjs(b.dateFrom)) - dayjs(a.dateTo).diff(dayjs(a.dateFrom));
}

function sortByDate(a, b) {
  return Number(a.dateFrom.isBefore(b.dateFrom)) - 0.5; //true = 1, false = 0
}

export {
  getRandomInteger,
  getRandomArrayElement,
  // formatStringToDateTime,
  // formatStringToShortDate,
  // formatStringToTime,
  capitalize,
  getPointDuration,
  sortByPrice,
  sortByTime,
  sortByDate,
};
