const CITIES = [
  {
    name: 'Geneva',
    description:
      'Geneva is the second-most populous city in Switzerland (after Zürich) and the most populous city of Romandy, the French-speaking part of Switzerland. Situated in the south west of the country, where the Rhône exits Lake Geneva, it is the capital of the Republic and Canton of Geneva, and a center for international diplomacy.',
  },
  {
    name: 'Amsterdam',
    description:
      'Amsterdam is the capital and most populous city of the Netherlands, with The Hague being the seat of government. It has a population of 921,402[11] within the city proper, 1,457,018 in the urban area and 2,480,394 in the metropolitan area. Located in the Dutch province of North Holland, Amsterdam is colloquially referred to as the "Venice of the North", for its large number of canals, now designated a UNESCO World Heritage Site.',
  },
  {
    name: 'Chamonix',
    description:
      'Chamonix-Mont-Blanc is a commune in the Haute-Savoie department in the Auvergne-Rhône-Alpes region of southeastern France. It was the site of the first Winter Olympics in 1924. In 2019, it had a population of 8,640.',
  },
  {
    name: 'Edinburgh',
    description:
      'Edinburgh is the capital city of Scotland and one of its 32 council areas. The city was historically part of the county of Midlothian (formally called the "county of Edinburgh" or Edinburghshire until 1947), but was administered separately from the surrounding county from 1482.',
  },
  {
    name: 'Okinawa',
    description:
      'Okinawa Prefecture is a prefecture of Japan. Okinawa Prefecture is the southernmost and westernmost prefecture of Japan and has a population of 1,457,162 (as of 2 February 2020) and a geographic area of 2,281 km2 (880 sq mi).',
  },
  {
    name: 'Shanghai',
    description:
      'Shanghai is one of the four direct-administered municipalities of the Peoples Republic of China (PRC). The city is located on the southern estuary of the Yangtze River, with the Huangpu River flowing through it. The population of the city proper is the third most populous in the world, with 24.89 million inhabitants in 2021, while the urban area is the most populous in China, with 39,300,000 residents.',
  },
  {
    name: 'Kyoto',
    description:
      'Kyoto is the capital city of Kyoto Prefecture in Japan. Located in the Kansai region on the island of Honshu, Kyoto forms a part of the Keihanshin metropolitan area along with Osaka and Kobe. As of 2020, the city had a population of 1.46 million, making it the ninth most populous city in Japan. The city is the cultural anchor of a substantially larger metropolitan area known as Greater Kyoto, a metropolitan statistical area (MSA) home to a census-estimated 3.8 million people.',
  },
  {
    name: 'Singapore',
    description:
      'Singapore is an island country and city-state in maritime Southeast Asia. It is located about one degree of latitude (137 kilometres or 85 miles) north of the equator, off the southern tip of the Malay Peninsula, bordering the Strait of Malacca to the west, the Singapore Strait to the south, the South China Sea to the east, and the Straits of Johor to the north. The countrys territory comprises one main island, 63 satellite islands and islets, and one outlying islet; the combined area of these has increased by 25% since the countrys independence as a result of extensive land reclamation projects.',
  },
  {
    name: 'Kochi',
    description:
      'Kochi is a major port city on the Malabar Coast of India bordering the Laccadive Sea. It is part of the district of Ernakulam in the state of Kerala and is commonly referred to as Ernakulam. Kochi is the most densely populated city in Kerala. As of 2011, it has a corporation limit population of 677,381 within an area of 94.88 km2 and a total urban population of more than of 2.1 million within an area of 440 km2, making it the largest and the most populous metropolitan area in Kerala. ',
  },
];

const OFFERS_TYPES = [
  'Add luggage',
  'Add meal',
  'Switch to comfort',
  'Order Uber',
  'Rent a car',
  'Add breakfast',
  'Book tickets',
  'Lunch in city',
  'Travel by train',
  'Choose seats',
];

const POINT_TYPES = ['Taxi', 'Bus', 'Train', 'Ship', 'Drive', 'Flight', 'Check-in', 'Sightseeing', 'Restaurant'];

const PRICE = {
  min: 1,
  max: 1000,
};

const DURATION = {
  // нужно для генерации случайных дат, не связано с реальостью
  day: 5,
  hour: 5,
  minute: 59,
};

export { CITIES, PRICE, DURATION, OFFERS_TYPES, POINT_TYPES };
