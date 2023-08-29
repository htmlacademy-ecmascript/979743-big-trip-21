function createEventEditDestImgTemplate({ src, alt }) {
  return `
    <img class="event__photo" src="${src}" alt="${alt}">

  `;
}

export { createEventEditDestImgTemplate };
