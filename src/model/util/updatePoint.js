// нжен пока работаем с данными в презентере.
// не знаю пока, куда лучше этот файл положить и как назвать
function updateItem(items, update) {
  return items.map((item) => (item.id === update.id ? update : item));
}

function getConformedOffers(type, allOffers) {
  return allOffers.find((offer) => offer.type === type).offers; // выбрали все офферы по типу
}

function getDestinationByID(id, allDestinations) {
  return allDestinations.find((dest) => dest.id === id);
}

export { updateItem, getConformedOffers, getDestinationByID };
