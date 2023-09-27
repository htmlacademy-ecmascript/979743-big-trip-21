function createSortItem({ sortingName, isAnable }, isChecked) {
  return `
    <div class="trip-sort__item  trip-sort__item--${sortingName}">
      <input
        id="sort-day"
        class="trip-sort__input  visually-hidden"
        type="radio"
        name="trip-sort"
        value="sort-${sortingName}"
        ${isAnable ? '' : 'disabled'}
        ${isChecked ? 'checked' : ''}
        >
      <label class="trip-sort__btn" for="sort-${sortingName}">${sortingName}</label>
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
