// нжен пока работаем с данными в презентере.
// не знаю пока, куда лучше этот файл положить и как назвать
function updateItem(items, update) {
  return items.map((item) => (item.id === update.id ? update : item));
}

export { updateItem };
