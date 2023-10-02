import dayjs from 'dayjs';
import { getRandomInteger } from '../util/common';
import { DURATION } from './const';

let date = dayjs().subtract(getRandomInteger(0, DURATION.DAY), 'day').toDate();
// всегда возвращает текущий момент даты и времени, но в др формате, не как dayjs

function getDate({ next }) {
  const minsGap = getRandomInteger(0, DURATION.minute);
  const hoursGap = getRandomInteger(1, DURATION.hour);
  const daysGap = getRandomInteger(0, DURATION.day);

  if (next) {
    date = dayjs(date).add(minsGap, 'minute').add(hoursGap, 'hour').add(daysGap, 'day').toDate();
  }

  return date;
}

export { getDate };
