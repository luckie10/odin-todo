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

export { stateFunctions };
