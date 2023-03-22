const stateFunctions = (state) => ({
  set(para, value) {
    state[para] = value;
  },

  get(para) {
    return state[para];
  },

  getState: () => {
    return state;
  },
});

/**
 * Create an HTML element with any attribute
 *
 * @param {string} tagName - Name of HTML tag
 * @param {{name: string, value: string}} attributes - Object of attributes to be appened to HTML element
 * @returns {Element} HTML Element
 */
function createElement(tagName, attributes) {
  const element = document.createElement(tagName);

  if (attributes) {
    Object.entries(attributes).map(([name, value]) => {
      if (name == "textContent") {
        element.textContent = value;
      } else {
        element.setAttribute(name, value);
      }
    });
  }

  return element;
}

export { stateFunctions, createElement };
