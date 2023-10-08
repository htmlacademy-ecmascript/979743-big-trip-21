// константы
const DATA_FORMAT = 'DD/MM/YY HH:mm';

const DATA_SHORT_FORMAT = 'MMM DD';

const TIME_FORMAT = 'HH:mm';

const SEC_IN_MIN = 60;
const MIN_IN_HOUR = 60;
const HOUR_IN_DAY = 24;
const MSEC_IN_SEC = 1000;
const MSEC_IN_HOUR = MIN_IN_HOUR * SEC_IN_MIN * MSEC_IN_SEC;
const MSEC_IN_DAY = HOUR_IN_DAY * MSEC_IN_HOUR;

const DESTINATIONS_COUNT = 5;
const OFFERS_COUNT = 5;
const POINTS_COUNT = 9;

const POINT_TYPES = ['taxi', 'bus', 'train', 'ship', 'drive', 'flight', 'check-in', 'sightseeing', 'restaurant'];

const DEFAULT_TYPE = 'flight';
const DEFAULT_OPEN_POINT_INDEX = 0;

const FILTER_TYPES = ['everything', 'future', 'present', 'past'];

const SortType = {
  // передается в шаблон для отрисовки блока с сортировкой
  DAY: {
    name: 'day',
    isAnable: true,
  },
  EVENT: {
    name: 'event',
    isAnable: false,
  },
  TIME: {
    name: 'time',
    isAnable: true,
  },
  PRICE: {
    name: 'price',
    isAnable: true,
  },
  OFFERS: {
    name: 'offers',
    isAnable: false,
  },
};

const UserAction = {
  UPDATE_POINT: 'UPDATE_POINT',
  ADD_POINT: 'ADD_POINT',
  DELETE_POINT: 'DELETE_POINT',
};

const UpdateType = {
  PATCH: 'PATCH', // перерисовка только точки
  MINOR: 'MINOR', // перерисовка всего списка
  MAJOR: 'MAJOR', // перерисовка всего приложения, в т.ч. хедер
  INIT: 'INIT', // для уведомления о первоначальной загрузке данных
};

export {
  DATA_FORMAT,
  DATA_SHORT_FORMAT,
  TIME_FORMAT,
  MSEC_IN_DAY,
  MSEC_IN_HOUR,
  DESTINATIONS_COUNT,
  OFFERS_COUNT,
  POINTS_COUNT,
  POINT_TYPES,
  DEFAULT_TYPE,
  DEFAULT_OPEN_POINT_INDEX,
  FILTER_TYPES,
  SortType,
  UserAction,
  UpdateType,
};
