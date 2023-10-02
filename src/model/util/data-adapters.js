// перенесла сюда из модели отдельные функции для адаптации данных
function getConformedOffers(type, allOffers) {
  return allOffers.find((offer) => offer.type === type).offers; // выбрали все офферы по типу
}

function getDestinationByID(id, allDestinations) {
  return allDestinations.find((dest) => dest.id === id);
}

function getCheckedOffers(type, checkedOfferIds, allOffers) {
  // возвр массив чекнутых офферов
  const conformedOffers = getConformedOffers(type, allOffers); // выбрали все офферы по типу
  const checkedOffers = conformedOffers.filter((offer) => checkedOfferIds.includes(offer.id)); // выбираем чекнутые
  return checkedOffers;
}

function getMarkedOffers(type, checkedOfferIds, allOffers) {
  // возвр массив всех офферов, помечая чекнутые
  const conformedOffers = getConformedOffers(type, allOffers); // выбрали все офферы по типу
  const markedOffers = conformedOffers.map((offer) => ({
    isChecked: checkedOfferIds.includes(offer.id),
    ...offer,
  }));
  return markedOffers;
}

export { getConformedOffers, getDestinationByID, getCheckedOffers, getMarkedOffers };
