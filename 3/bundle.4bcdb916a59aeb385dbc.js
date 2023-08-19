(()=>{"use strict";function e(e){var t=document.createElement("div");return t.innerHTML=e,t.firstElementChild}function t(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"beforeend";t.insertAdjacentElement(n,e.getElement())}function n(e){return n="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},n(e)}function i(e,t){for(var i=0;i<t.length;i++){var r=t[i];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,(void 0,o=function(e,t){if("object"!==n(e)||null===e)return e;var i=e[Symbol.toPrimitive];if(void 0!==i){var r=i.call(e,"string");if("object"!==n(r))return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(e)}(r.key),"symbol"===n(o)?o:String(o)),r)}var o}var r=function(){function t(){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t)}var n,r;return n=t,(r=[{key:"getTemplate",value:function(){return'\n  <section class="trip-main__trip-info  trip-info"></section>\n  '}},{key:"getElement",value:function(){return this.element||(this.element=e(this.getTemplate())),this.element}},{key:"removeElement",value:function(){this.element=null}}])&&i(n.prototype,r),Object.defineProperty(n,"prototype",{writable:!1}),t}();function o(e){return o="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},o(e)}function l(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,(void 0,r=function(e,t){if("object"!==o(e)||null===e)return e;var n=e[Symbol.toPrimitive];if(void 0!==n){var i=n.call(e,"string");if("object"!==o(i))return i;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(e)}(i.key),"symbol"===o(r)?r:String(r)),i)}var r}var a=function(){function t(){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t)}var n,i;return n=t,(i=[{key:"getTemplate",value:function(){return'\n  <div class="trip-info__main">\n    <h1 class="trip-info__title">Amsterdam &mdash; Chamonix &mdash; Geneva</h1>\n\n    <p class="trip-info__dates">Mar 18&nbsp;&mdash;&nbsp;20</p>\n  </div>\n  '}},{key:"getElement",value:function(){return this.element||(this.element=e(this.getTemplate())),this.element}},{key:"removeElement",value:function(){this.element=null}}])&&l(n.prototype,i),Object.defineProperty(n,"prototype",{writable:!1}),t}();function s(e){return s="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},s(e)}function u(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,(void 0,r=function(e,t){if("object"!==s(e)||null===e)return e;var n=e[Symbol.toPrimitive];if(void 0!==n){var i=n.call(e,"string");if("object"!==s(i))return i;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(e)}(i.key),"symbol"===s(r)?r:String(r)),i)}var r}var c=function(){function t(){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t)}var n,i;return n=t,(i=[{key:"getTemplate",value:function(){return'\n  <p class="trip-info__cost">\n    Total: &euro;&nbsp;<span class="trip-info__cost-value">1230</span>\n  </p>\n  '}},{key:"getElement",value:function(){return this.element||(this.element=e(this.getTemplate())),this.element}},{key:"removeElement",value:function(){this.element=null}}])&&u(n.prototype,i),Object.defineProperty(n,"prototype",{writable:!1}),t}();function p(e){return p="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},p(e)}function f(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,(void 0,r=function(e,t){if("object"!==p(e)||null===e)return e;var n=e[Symbol.toPrimitive];if(void 0!==n){var i=n.call(e,"string");if("object"!==p(i))return i;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(e)}(i.key),"symbol"===p(r)?r:String(r)),i)}var r}var v=function(){function t(){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t)}var n,i;return n=t,(i=[{key:"getTemplate",value:function(){return'\n  <form class="trip-filters" action="#" method="get">\n                <div class="trip-filters__filter">\n                  <input id="filter-everything" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="everything" checked>\n                  <label class="trip-filters__filter-label" for="filter-everything">Everything</label>\n                </div>\n\n                <div class="trip-filters__filter">\n                  <input id="filter-future" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="future">\n                  <label class="trip-filters__filter-label" for="filter-future">Future</label>\n                </div>\n\n                <div class="trip-filters__filter">\n                  <input id="filter-present" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="present">\n                  <label class="trip-filters__filter-label" for="filter-present">Present</label>\n                </div>\n\n                <div class="trip-filters__filter">\n                  <input id="filter-past" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="past">\n                  <label class="trip-filters__filter-label" for="filter-past">Past</label>\n                </div>\n\n                <button class="visually-hidden" type="submit">Accept filter</button>\n              </form>\n  '}},{key:"getElement",value:function(){return this.element||(this.element=e(this.getTemplate())),this.element}},{key:"removeElement",value:function(){this.element=null}}])&&f(n.prototype,i),Object.defineProperty(n,"prototype",{writable:!1}),t}();function m(e){return m="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},m(e)}function y(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,d(i.key),i)}}function b(e,t,n){return(t=d(t))in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function d(e){var t=function(e,t){if("object"!==m(e)||null===e)return e;var n=e[Symbol.toPrimitive];if(void 0!==n){var i=n.call(e,"string");if("object"!==m(i))return i;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(e)}(e);return"symbol"===m(t)?t:String(t)}var _=function(){function e(t){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),b(this,"tripInfoComponent",new r),b(this,"tripAbouteComponent",new a),b(this,"tripTotalComponent",new c),b(this,"siteTripControlsElement",document.querySelector(".trip-controls__filters")),b(this,"tripFiltersComponent",new v),this.container=t}var n,i;return n=e,(i=[{key:"init",value:function(){t(this.tripInfoComponent,this.container,"afterbegin"),t(this.tripAbouteComponent,this.tripInfoComponent.getElement()),t(this.tripTotalComponent,this.tripInfoComponent.getElement()),t(this.tripFiltersComponent,this.siteTripControlsElement)}}])&&y(n.prototype,i),Object.defineProperty(n,"prototype",{writable:!1}),e}(),h=[{date:"MAR 18",typeImg:"img/icons/taxi.png",title:"Taxi Amsterdam",startTime:"10:30",endTime:"11:00",duration:"30M",priceValue:"20",selectedOffers:[{offersTitle:"Order Uber",offersPrice:"20"}],isFavorite:!0},{date:"MAR 18",typeImg:"img/icons/flight.png",title:"Flight Chamonix",startTime:"12:25",endTime:"13:35",duration:"01H 10M",priceValue:"160",selectedOffers:[{offersTitle:"Add luggage",offersPrice:"50"},{offersTitle:"Switch to comfort",offersPrice:"80"}],isFavorite:!1},{date:"MAR 18",typeImg:"img/icons/drive.png",title:"Drive Chamonix",startTime:"14:30",endTime:"16:05",duration:"01H 35M",priceValue:"160",selectedOffers:[{offersTitle:"Rent a car",offersPrice:"200"}],isFavorite:!0},{date:"MAR 18",typeImg:"img/icons/check-in.png",title:"Check-in Chamonix",startTime:"16:20",endTime:"17:00",duration:"40M",priceValue:"600",selectedOffers:[{offersTitle:"Add breakfast",offersPrice:"50"}],isFavorite:!0},{date:"MAR 19",typeImg:"img/icons/sightseeing.png",title:"Sightseeing Chamonix",startTime:"14:20",endTime:"13:00",duration:"01H 20M",priceValue:"50",selectedOffers:[{offersTitle:"Book tickets",offersPrice:"40"},{offersTitle:"Lunch in city",offersPrice:"30"}],isFavorite:!1},{date:"MAR 19",typeImg:"img/icons/drive.png",title:"Drive Geneva",startTime:"16:00",endTime:"17:00",duration:"01H",priceValue:"20",selectedOffers:[],isFavorite:!1},{date:"MAR 19",typeImg:"img/icons/flight.png",title:"Flight Geneva",startTime:"18:00",endTime:"19:00",duration:"01H",priceValue:"20",selectedOffers:[{offersTitle:"Add luggage",offersPrice:"30"},{offersTitle:"Switch to comfort",offersPrice:"100"}],isFavorite:!1},{date:"MAR 20",typeImg:"img/icons/drive.png",title:"Drive Geneva",startTime:"08:25",endTime:"09:25",duration:"01H",priceValue:"20",selectedOffers:[],isFavorite:!1},{date:"MAR 20",typeImg:"img/icons/sightseeing.png",title:"Sightseeing Geneva",startTime:"11:15",endTime:"12:15",duration:"01H",priceValue:"180",selectedOffers:[],isFavorite:!1}];function g(e){return g="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},g(e)}function S(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,(void 0,r=function(e,t){if("object"!==g(e)||null===e)return e;var n=e[Symbol.toPrimitive];if(void 0!==n){var i=n.call(e,"string");if("object"!==g(i))return i;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(e)}(i.key),"symbol"===g(r)?r:String(r)),i)}var r}var w=function(){function t(){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t)}var n,i;return n=t,(i=[{key:"getTemplate",value:function(){return'\n          <form class="trip-events__trip-sort  trip-sort" action="#" method="get">\n            <div class="trip-sort__item  trip-sort__item--day">\n              <input id="sort-day" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-day" checked>\n              <label class="trip-sort__btn" for="sort-day">Day</label>\n            </div>\n\n            <div class="trip-sort__item  trip-sort__item--event">\n              <input id="sort-event" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-event" disabled>\n              <label class="trip-sort__btn" for="sort-event">Event</label>\n            </div>\n\n            <div class="trip-sort__item  trip-sort__item--time">\n              <input id="sort-time" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-time">\n              <label class="trip-sort__btn" for="sort-time">Time</label>\n            </div>\n\n            <div class="trip-sort__item  trip-sort__item--price">\n              <input id="sort-price" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-price">\n              <label class="trip-sort__btn" for="sort-price">Price</label>\n            </div>\n\n            <div class="trip-sort__item  trip-sort__item--offer">\n              <input id="sort-offer" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-offer" disabled>\n              <label class="trip-sort__btn" for="sort-offer">Offers</label>\n            </div>\n          </form>\n  '}},{key:"getElement",value:function(){return this.element||(this.element=e(this.getTemplate())),this.element}},{key:"removeElement",value:function(){this.element=null}}])&&S(n.prototype,i),Object.defineProperty(n,"prototype",{writable:!1}),t}();function T(e){return T="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},T(e)}function E(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,(void 0,r=function(e,t){if("object"!==T(e)||null===e)return e;var n=e[Symbol.toPrimitive];if(void 0!==n){var i=n.call(e,"string");if("object"!==T(i))return i;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(e)}(i.key),"symbol"===T(r)?r:String(r)),i)}var r}var k=function(){function t(){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t)}var n,i;return n=t,(i=[{key:"getTemplate",value:function(){return'\n  <ul class="trip-events__list"></ul>\n  '}},{key:"getElement",value:function(){return this.element||(this.element=e(this.getTemplate())),this.element}},{key:"removeElement",value:function(){this.element=null}}])&&E(n.prototype,i),Object.defineProperty(n,"prototype",{writable:!1}),t}();function P(e){return P="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},P(e)}function j(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,(void 0,r=function(e,t){if("object"!==P(e)||null===e)return e;var n=e[Symbol.toPrimitive];if(void 0!==n){var i=n.call(e,"string");if("object"!==P(i))return i;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(e)}(i.key),"symbol"===P(r)?r:String(r)),i)}var r}var C=function(){function t(){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t)}var n,i;return n=t,(i=[{key:"getTemplate",value:function(){return'\n  <li class="trip-events__item">\n    <form class="event event--edit" action="#" method="post"></form>\n  </li>\n  '}},{key:"getElement",value:function(){return this.element||(this.element=e(this.getTemplate())),this.element}},{key:"removeElement",value:function(){this.element=null}}])&&j(n.prototype,i),Object.defineProperty(n,"prototype",{writable:!1}),t}();function O(e){return O="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},O(e)}function x(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,(void 0,r=function(e,t){if("object"!==O(e)||null===e)return e;var n=e[Symbol.toPrimitive];if(void 0!==n){var i=n.call(e,"string");if("object"!==O(i))return i;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(e)}(i.key),"symbol"===O(r)?r:String(r)),i)}var r}var A=function(){function t(){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t)}var n,i;return n=t,(i=[{key:"getTemplate",value:function(){return'\n  <header class="event__header">\n    <div class="event__type-wrapper">\n      <label class="event__type  event__type-btn" for="event-type-toggle-1">\n        <span class="visually-hidden">Choose event type</span>\n        <img class="event__type-icon" width="17" height="17" src="img/icons/flight.png" alt="Event type icon">\n      </label>\n      <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">\n      <div class="event__type-list">\n        <fieldset class="event__type-group">\n          <legend class="visually-hidden">Event type</legend>\n          <div class="event__type-item">\n            <input id="event-type-taxi-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="taxi">\n            <label class="event__type-label  event__type-label--taxi" for="event-type-taxi-1">Taxi</label>\n          </div>\n          <div class="event__type-item">\n            <input id="event-type-bus-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="bus">\n            <label class="event__type-label  event__type-label--bus" for="event-type-bus-1">Bus</label>\n          </div>\n          <div class="event__type-item">\n            <input id="event-type-train-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="train">\n            <label class="event__type-label  event__type-label--train" for="event-type-train-1">Train</label>\n          </div>\n          <div class="event__type-item">\n            <input id="event-type-ship-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="ship">\n            <label class="event__type-label  event__type-label--ship" for="event-type-ship-1">Ship</label>\n          </div>\n          <div class="event__type-item">\n            <input id="event-type-drive-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="drive">\n            <label class="event__type-label  event__type-label--drive" for="event-type-drive-1">Drive</label>\n          </div>\n          <div class="event__type-item">\n            <input id="event-type-flight-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="flight" checked>\n            <label class="event__type-label  event__type-label--flight" for="event-type-flight-1">Flight</label>\n          </div>\n          <div class="event__type-item">\n            <input id="event-type-check-in-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="check-in">\n            <label class="event__type-label  event__type-label--check-in" for="event-type-check-in-1">Check-in</label>\n          </div>\n          <div class="event__type-item">\n            <input id="event-type-sightseeing-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="sightseeing">\n            <label class="event__type-label  event__type-label--sightseeing" for="event-type-sightseeing-1">Sightseeing</label>\n          </div>\n          <div class="event__type-item">\n            <input id="event-type-restaurant-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="restaurant">\n            <label class="event__type-label  event__type-label--restaurant" for="event-type-restaurant-1">Restaurant</label>\n          </div>\n        </fieldset>\n      </div>\n    </div>\n    <div class="event__field-group  event__field-group--destination">\n      <label class="event__label  event__type-output" for="event-destination-1">\n        Flight\n      </label>\n      <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="Geneva" list="destination-list-1">\n      <datalist id="destination-list-1">\n        <option value="Amsterdam"></option>\n        <option value="Geneva"></option>\n        <option value="Chamonix"></option>\n      </datalist>\n    </div>\n    <div class="event__field-group  event__field-group--time">\n      <label class="visually-hidden" for="event-start-time-1">From</label>\n      <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="19/03/19 00:00">\n        &mdash;\n      <label class="visually-hidden" for="event-end-time-1">To</label>\n      <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="19/03/19 00:00">\n    </div>\n    <div class="event__field-group  event__field-group--price">\n      <label class="event__label" for="event-price-1">\n        <span class="visually-hidden">Price</span>\n        &euro;\n      </label>\n      <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="">\n    </div>\n    <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>\n    <button class="event__reset-btn" type="reset">Cancel</button>\n  </header>\n  '}},{key:"getElement",value:function(){return this.element||(this.element=e(this.getTemplate())),this.element}},{key:"removeElement",value:function(){this.element=null}}])&&x(n.prototype,i),Object.defineProperty(n,"prototype",{writable:!1}),t}();function M(e){return M="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},M(e)}function F(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,(void 0,r=function(e,t){if("object"!==M(e)||null===e)return e;var n=e[Symbol.toPrimitive];if(void 0!==n){var i=n.call(e,"string");if("object"!==M(i))return i;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(e)}(i.key),"symbol"===M(r)?r:String(r)),i)}var r}var I=function(){function t(){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t)}var n,i;return n=t,(i=[{key:"getTemplate",value:function(){return'\n  <section class="event__details"></section>\n  '}},{key:"getElement",value:function(){return this.element||(this.element=e(this.getTemplate())),this.element}},{key:"removeElement",value:function(){this.element=null}}])&&F(n.prototype,i),Object.defineProperty(n,"prototype",{writable:!1}),t}();function D(e){return D="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},D(e)}function L(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,(void 0,r=function(e,t){if("object"!==D(e)||null===e)return e;var n=e[Symbol.toPrimitive];if(void 0!==n){var i=n.call(e,"string");if("object"!==D(i))return i;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(e)}(i.key),"symbol"===D(r)?r:String(r)),i)}var r}var R=function(){function t(){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t)}var n,i;return n=t,(i=[{key:"getTemplate",value:function(){return'\n                  <section class="event__section  event__section--offers">\n                    <h3 class="event__section-title  event__section-title--offers">Offers</h3>\n\n                    <div class="event__available-offers">\n                      <div class="event__offer-selector">\n                        <input class="event__offer-checkbox  visually-hidden" id="event-offer-luggage-1" type="checkbox" name="event-offer-luggage" checked>\n                        <label class="event__offer-label" for="event-offer-luggage-1">\n                          <span class="event__offer-title">Add luggage</span>\n                          &plus;&euro;&nbsp;\n                          <span class="event__offer-price">30</span>\n                        </label>\n                      </div>\n\n                      <div class="event__offer-selector">\n                        <input class="event__offer-checkbox  visually-hidden" id="event-offer-comfort-1" type="checkbox" name="event-offer-comfort" checked>\n                        <label class="event__offer-label" for="event-offer-comfort-1">\n                          <span class="event__offer-title">Switch to comfort class</span>\n                          &plus;&euro;&nbsp;\n                          <span class="event__offer-price">100</span>\n                        </label>\n                      </div>\n\n                      <div class="event__offer-selector">\n                        <input class="event__offer-checkbox  visually-hidden" id="event-offer-meal-1" type="checkbox" name="event-offer-meal">\n                        <label class="event__offer-label" for="event-offer-meal-1">\n                          <span class="event__offer-title">Add meal</span>\n                          &plus;&euro;&nbsp;\n                          <span class="event__offer-price">15</span>\n                        </label>\n                      </div>\n\n                      <div class="event__offer-selector">\n                        <input class="event__offer-checkbox  visually-hidden" id="event-offer-seats-1" type="checkbox" name="event-offer-seats">\n                        <label class="event__offer-label" for="event-offer-seats-1">\n                          <span class="event__offer-title">Choose seats</span>\n                          &plus;&euro;&nbsp;\n                          <span class="event__offer-price">5</span>\n                        </label>\n                      </div>\n\n                      <div class="event__offer-selector">\n                        <input class="event__offer-checkbox  visually-hidden" id="event-offer-train-1" type="checkbox" name="event-offer-train">\n                        <label class="event__offer-label" for="event-offer-train-1">\n                          <span class="event__offer-title">Travel by train</span>\n                          &plus;&euro;&nbsp;\n                          <span class="event__offer-price">40</span>\n                        </label>\n                      </div>\n                    </div>\n                  </section>\n  '}},{key:"getElement",value:function(){return this.element||(this.element=e(this.getTemplate())),this.element}},{key:"removeElement",value:function(){this.element=null}}])&&L(n.prototype,i),Object.defineProperty(n,"prototype",{writable:!1}),t}();function H(e){return H="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},H(e)}function V(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,(void 0,r=function(e,t){if("object"!==H(e)||null===e)return e;var n=e[Symbol.toPrimitive];if(void 0!==n){var i=n.call(e,"string");if("object"!==H(i))return i;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(e)}(i.key),"symbol"===H(r)?r:String(r)),i)}var r}var G=function(){function t(){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t)}var n,i;return n=t,(i=[{key:"getTemplate",value:function(){return'\n                  <section class="event__section  event__section--destination">\n                    <h3 class="event__section-title  event__section-title--destination">Destination</h3>\n                    <p class="event__destination-description">Geneva is a city in Switzerland that lies at the southern tip of expansive Lac Léman (Lake Geneva). Surrounded by the Alps and Jura mountains, the city has views of dramatic Mont Blanc.</p>\n\n                    <div class="event__photos-container">\n                      <div class="event__photos-tape">\n                        <img class="event__photo" src="img/photos/1.jpg" alt="Event photo">\n                        <img class="event__photo" src="img/photos/2.jpg" alt="Event photo">\n                        <img class="event__photo" src="img/photos/3.jpg" alt="Event photo">\n                        <img class="event__photo" src="img/photos/4.jpg" alt="Event photo">\n                        <img class="event__photo" src="img/photos/5.jpg" alt="Event photo">\n                      </div>\n                    </div>\n                  </section>\n  '}},{key:"getElement",value:function(){return this.element||(this.element=e(this.getTemplate())),this.element}},{key:"removeElement",value:function(){this.element=null}}])&&V(n.prototype,i),Object.defineProperty(n,"prototype",{writable:!1}),t}();function q(e){return q="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},q(e)}function B(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,(void 0,r=function(e,t){if("object"!==q(e)||null===e)return e;var n=e[Symbol.toPrimitive];if(void 0!==n){var i=n.call(e,"string");if("object"!==q(i))return i;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(e)}(i.key),"symbol"===q(r)?r:String(r)),i)}var r}var z=function(){function t(e){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),this.pointInfo=e}var n,i;return n=t,(i=[{key:"getTemplate",value:function(){return t=(e=this.pointInfo).date,n=e.typeImg,i=e.title,r=e.startTime,o=e.endTime,l=e.duration,a=e.priceValue,'\n            <li class="trip-events__item">\n              <div class="event">\n                <time class="event__date" datetime="2019-03-18">'.concat(t,'</time>\n                <div class="event__type">\n                  <img class="event__type-icon" width="42" height="42" src="').concat(n,'" alt="Event type icon">\n                </div>\n                <h3 class="event__title">').concat(i,'</h3>\n                <div class="event__schedule">\n                  <p class="event__time">\n                    <time class="event__start-time" datetime="2019-03-18T10:30">').concat(r,'</time>\n                    &mdash;\n                    <time class="event__end-time" datetime="2019-03-18T11:00">').concat(o,'</time>\n                  </p>\n                  <p class="event__duration">').concat(l,'</p>\n                </div>\n                <p class="event__price">\n                  &euro;&nbsp;<span class="event__price-value">').concat(a,'</span>\n                </p>\n                <h4 class="visually-hidden">Offers:</h4>\n                <ul class="event__selected-offers">\n                  <li class="event__offer">\n                    <span class="event__offer-title">Order Uber</span>\n                    &plus;&euro;&nbsp;\n                    <span class="event__offer-price">20</span>\n                  </li>\n                </ul>\n                <button class="event__favorite-btn event__favorite-btn--active" type="button">\n                  <span class="visually-hidden">Add to favorite</span>\n                  <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">\n                    <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>\n                  </svg>\n                </button>\n                <button class="event__rollup-btn" type="button">\n                  <span class="visually-hidden">Open event</span>\n                </button>\n              </div>\n            </li>\n  ');var e,t,n,i,r,o,l,a}},{key:"getElement",value:function(){return this.element||(this.element=e(this.getTemplate())),this.element}},{key:"removeElement",value:function(){this.element=null}}])&&B(n.prototype,i),Object.defineProperty(n,"prototype",{writable:!1}),t}();function U(e){return U="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},U(e)}function J(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,N(i.key),i)}}function K(e,t,n){return(t=N(t))in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function N(e){var t=function(e,t){if("object"!==U(e)||null===e)return e;var n=e[Symbol.toPrimitive];if(void 0!==n){var i=n.call(e,"string");if("object"!==U(i))return i;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(e)}(e);return"symbol"===U(t)?t:String(t)}var Q=function(){function e(t){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),K(this,"sortComponent",new w),K(this,"eventsListComponent",new k),K(this,"eventEditComponent",new C),K(this,"eventEditHeaderComponent",new A),K(this,"eventEditDetailsComponent",new I),K(this,"eventEditOffersComponent",new R),K(this,"eventEditDestinationComponent",new G),this.container=t}var n,i;return n=e,(i=[{key:"init",value:function(){t(this.sortComponent,this.container),t(this.eventsListComponent,this.container),t(this.eventEditComponent,this.eventsListComponent.getElement()),t(this.eventEditHeaderComponent,this.eventEditComponent.getElement().querySelector(".event")),t(this.eventEditDetailsComponent,this.eventEditComponent.getElement().querySelector(".event")),t(this.eventEditOffersComponent,this.eventEditDetailsComponent.getElement()),t(this.eventEditDestinationComponent,this.eventEditDetailsComponent.getElement());for(var e=0;e<h.length;e++)t(new z(h[e]),this.eventsListComponent.getElement())}}])&&J(n.prototype,i),Object.defineProperty(n,"prototype",{writable:!1}),e}();new _(document.querySelector(".trip-main")).init(),new Q(document.querySelector(".trip-events")).init()})();
//# sourceMappingURL=bundle.4bcdb916a59aeb385dbc.js.map