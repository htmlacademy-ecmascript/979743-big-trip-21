import dayjs from 'dayjs';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';

//-------------функции для фильтрации данных-----------------------------------------------------
function filterFuturePoints(points) {
  // дата начала события больше текущей даты
  const currentDate = dayjs();
  const filterdPoints = points.filter((point) => currentDate.isBefore(point.dateFrom, 'date'));
  return filterdPoints;
}

function filterPresentPoints(points) {
  // дата начала события меньше (или равна) текущей даты, а дата окончания больше (или равна) текущей даты
  const currentDate = dayjs();
  dayjs.extend(isSameOrAfter);
  dayjs.extend(isSameOrBefore);
  const filterdPoints = points.filter(
    (point) => currentDate.isSameOrAfter(point.dateFrom, 'date') && currentDate.isSameOrBefore(point.dateTo, 'date')
  );
  return filterdPoints;
}

function filterPastPoints(points) {
  // дата окончания маршрута меньше, чем текущая
  const currentDate = dayjs();
  const filterdPoints = points.filter((point) => currentDate.isAfter(point.dateTo, 'date'));
  return filterdPoints;
}

function filterEverything(points) {
  return points;
}

export { filterEverything, filterFuturePoints, filterPresentPoints, filterPastPoints };
