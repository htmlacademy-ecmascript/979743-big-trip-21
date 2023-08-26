// константы
const DATA_FORMAT = 'YYYY-MM-DDTHH:mm';

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

const POINT_TYPES = ['Taxi', 'Bus', 'Train', 'Ship', 'Drive', 'Flight', 'Check-in', 'Sightseeing', 'Restaurant'];

const DEFAULT_TYPE = 'flight';

const EVENT_POINTS = [
  // --- 1 -----
  {
    date: 'MAR 18',
    typeImg: 'img/icons/taxi.png',
    title: 'Taxi Amsterdam',
    startTime: '10:30',
    endTime: '11:00',
    duration: '30M',
    priceValue: '20',
    selectedOffers: [
      {
        offersTitle: 'Order Uber',
        offersPrice: '20',
      },
    ],
    isFavorite: true, //если точка в избранных = желтая звездочка
  },
  // --- 2 -----
  {
    date: 'MAR 18',
    typeImg: 'img/icons/flight.png',
    title: 'Flight Chamonix',
    startTime: '12:25',
    endTime: '13:35',
    duration: '01H 10M',
    priceValue: '160',
    selectedOffers: [
      {
        offersTitle: 'Add luggage',
        offersPrice: '50',
      },
      {
        offersTitle: 'Switch to comfort',
        offersPrice: '80',
      },
    ],
    isFavorite: false,
  },
  // --- 3 -----
  {
    date: 'MAR 18',
    typeImg: 'img/icons/drive.png',
    title: 'Drive Chamonix',
    startTime: '14:30',
    endTime: '16:05',
    duration: '01H 35M',
    priceValue: '160',
    selectedOffers: [
      {
        offersTitle: 'Rent a car',
        offersPrice: '200',
      },
    ],
    isFavorite: true, //если точка в избранных = желтая звездочка
  },
  // --- 4 -----
  {
    date: 'MAR 18',
    typeImg: 'img/icons/check-in.png',
    title: 'Check-in Chamonix',
    startTime: '16:20',
    endTime: '17:00',
    duration: '40M',
    priceValue: '600',
    selectedOffers: [
      {
        offersTitle: 'Add breakfast',
        offersPrice: '50',
      },
    ],
    isFavorite: true, //если точка в избранных = желтая звездочка
  },
  // --- 5 -----
  {
    date: 'MAR 19',
    typeImg: 'img/icons/sightseeing.png',
    title: 'Sightseeing Chamonix',
    startTime: '14:20',
    endTime: '13:00',
    duration: '01H 20M',
    priceValue: '50',
    selectedOffers: [
      {
        offersTitle: 'Book tickets',
        offersPrice: '40',
      },
      {
        offersTitle: 'Lunch in city',
        offersPrice: '30',
      },
    ],
    isFavorite: false,
  },
  // --- 6 -----
  {
    date: 'MAR 19',
    typeImg: 'img/icons/drive.png',
    title: 'Drive Geneva',
    startTime: '16:00',
    endTime: '17:00',
    duration: '01H',
    priceValue: '20',
    selectedOffers: [],
    isFavorite: false,
  },
  // --- 7 -----
  {
    date: 'MAR 19',
    typeImg: 'img/icons/flight.png',
    title: 'Flight Geneva',
    startTime: '18:00',
    endTime: '19:00',
    duration: '01H',
    priceValue: '20',
    selectedOffers: [
      {
        offersTitle: 'Add luggage',
        offersPrice: '30',
      },
      {
        offersTitle: 'Switch to comfort',
        offersPrice: '100',
      },
    ],
    isFavorite: false,
  },
  // --- 8 -----
  {
    date: 'MAR 20',
    typeImg: 'img/icons/drive.png',
    title: 'Drive Geneva',
    startTime: '08:25',
    endTime: '09:25',
    duration: '01H',
    priceValue: '20',
    selectedOffers: [],
    isFavorite: false,
  },
  // --- 9 -----
  {
    date: 'MAR 20',
    typeImg: 'img/icons/sightseeing.png',
    title: 'Sightseeing Geneva',
    startTime: '11:15',
    endTime: '12:15',
    duration: '01H',
    priceValue: '180',
    selectedOffers: [],
    isFavorite: false,
  },
];

export {
  EVENT_POINTS,
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
};
