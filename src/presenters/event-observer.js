// передает события между презентерами
export default class EventObserver {
  transmitEvent(eventType) {
    switch (eventType) {
      case 'filterFuture':
        console.log('observer знает, что кликнули фильтр future');
        // вызываем ф-ю перерисовки компонентов
        break;
      default:
        console.log('что-то произошло, но никто не знает, что делать');
    }
  }
}
