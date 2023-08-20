const RenderPosition = {
  BEFOREBEGIN: 'beforebegin',
  AFTERBEGIN: 'afterbegin',
  BEFOREEND: 'beforeend',
  AFTEREND: 'afterend',
};

function createElement(template) {
  const newElement = document.createElement('div');
  newElement.innerHTML = template;

  return newElement.firstElementChild;
}

function render(
  component,
  container,
  place = RenderPosition.BEFOREEND,
  isInsides = false
) {
  container.insertAdjacentElement(place, component.getElement());
  if (isInsides) {
    component.renderInsides();
  }
}

export { RenderPosition, createElement, render };
