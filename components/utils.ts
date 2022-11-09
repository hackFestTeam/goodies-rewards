const getItemFromLocalStorage = key => JSON.parse(localStorage.getItem(key));
const setItemtoLocalStorage = (key, value) => localStorage.setItem(key, JSON.stringify(value));

export { getItemFromLocalStorage, setItemtoLocalStorage };
