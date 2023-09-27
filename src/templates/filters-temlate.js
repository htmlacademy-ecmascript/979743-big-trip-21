function createFilterItem({ filterName, isChecked }) {
  //на входе один элемент из массива фильтров = объект
  return `
  <div class="trip-filters__filter">
    <input
      id="filter-everything"
      class="trip-filters__filter-input  visually-hidden"
      type="radio"
      name="trip-filter"
      value="everything"
      ${isChecked ? 'checked' : ''}
      >
    <label class="trip-filters__filter-label" for="filter-everything">${filterName}</label>
  </div>
  `;
}

function createFiltersTemplate(filters) {
  const filtersTemplate = filters.map((filter) => createFilterItem(filter)).join('');
  return `
  <form class="trip-filters" action="#" method="get">
    ${filtersTemplate}
    <button class="visually-hidden" type="submit">Accept filter</button>
  </form>
  `;
}

export { createFiltersTemplate };
