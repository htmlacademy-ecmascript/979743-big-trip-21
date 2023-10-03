function createSortItem({ name, isAnable }, currentSortType) {
  return `
    <div class="trip-sort__item  trip-sort__item--${name}">
      <input
        id="sort-${name}"
        class="trip-sort__input  visually-hidden"
        type="radio"
        name="trip-sort"
        value="sort-${name}"
        ${isAnable ? '' : 'disabled'}
        ${currentSortType === name ? 'checked' : ''}
        >
      <label class="trip-sort__btn" for="sort-${name}">${name}</label>
    </div>
  `;
}

function createSortTemplate(sortings, currentSortType) {
  const sortingsTemplate = sortings.map((sorting) => createSortItem(sorting, currentSortType)).join('');
  return `
    <form class="trip-events__trip-sort  trip-sort" action="#" method="get">
      ${sortingsTemplate}
    </form>
  `;
}

export { createSortTemplate };
