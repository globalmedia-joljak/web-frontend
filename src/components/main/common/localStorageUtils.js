const setItem = (key, value) => {
  return window.localStorage.setItem(key, JSON.stringify(value));
};

const getItem = (key) => {
  return JSON.parse(window.localStorage.getItem(key));
};

export { setItem, getItem };
