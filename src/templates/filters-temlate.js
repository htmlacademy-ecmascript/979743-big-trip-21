function createFilterItem({ filterName }, isDisabled, isChecked) {
  //на входе один элемент из массива фильтров = объект
  return `
  <div class="trip-filters__filter">
    <input
      id="filter-${filterName}"
      class="trip-filters__filter-input  visually-hidden"
      type="radio"
      name="trip-filter"
      value="${filterName}"
      ${isChecked ? 'checked' : ''}
      ${isDisabled ? 'disabled' : ''}
      >
    <label class="trip-filters__filter-label" for="filter-${filterName}">${filterName}</label>
  </div>
  `;
}

function createFiltersTemplate(filters, isDisabled) {
  const filtersTemplate = filters.map((filter, index) => createFilterItem(filter, isDisabled, index === 0)).join('');
  return `
  <form class="trip-filters" action="#" method="get">
    ${filtersTemplate}
    <button class="visually-hidden" type="submit">Accept filter</button>
  </form>
  `;
}

export { createFiltersTemplate };
