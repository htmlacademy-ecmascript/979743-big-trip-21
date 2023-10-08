import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import { MSEC_IN_DAY, MSEC_IN_HOUR } from '../consts';

function capitalize(string) {
  // первая буква будет заглавная
  return `${string[0].toUpperCase()}${string.slice(1)}`;
}

function formatDateStr(originalDate) {
  const transfotmedDateStr = `20${originalDate.slice(6, 8)}-${originalDate.slice(3, 5)}-
      ${originalDate.slice(0, 2)} ${originalDate.slice(8)}`;
  return transfotmedDateStr;
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

function sortByPrice(firstPoint, SecondPoint) {
  return SecondPoint.basePrice - firstPoint.basePrice;
}

function sortByTime(firstPoint, SecondPoint) {
  return (
    dayjs(SecondPoint.dateTo).diff(dayjs(SecondPoint.dateFrom)) -
    dayjs(firstPoint.dateTo).diff(dayjs(firstPoint.dateFrom))
  );
}

function sortByDate(firstPoint, SecondPoint) {
  const dateFirst = dayjs(firstPoint.dateFrom);
  const dateSecond = dayjs(SecondPoint.dateFrom);
  return Number(dateSecond.isBefore(dateFirst)) - 0.5; //true = 1, false = 0
}

export { formatDateStr, capitalize, getPointDuration, sortByPrice, sortByTime, sortByDate };
