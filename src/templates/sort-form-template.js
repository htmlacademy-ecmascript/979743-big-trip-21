function createSortItem({ name, isAnable }, isChecked) {
  return `
    <div class="trip-sort__item  trip-sort__item--${name}">
      <input
        id="sort-${name}"
        class="trip-sort__input  visually-hidden"
        type="radio"
        name="trip-sort"
        value="sort-${name}"
        ${isAnable ? '' : 'disabled'}
        ${isChecked ? 'checked' : ''}
        >
      <label class="trip-sort__btn" for="sort-${name}">${name}</label>
    </div>
  `;
}

function createSortTemplate(sortings) {
  const sortingsTemplate = sortings.map((sorting, index) => createSortItem(sorting, index === 0)).join('');
  return `
    <form class="trip-events__trip-sort  trip-sort" action="#" method="get">
      ${sortingsTemplate}
    </form>
  `;
}

export { createSortTemplate };
