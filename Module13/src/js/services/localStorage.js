export const LOCALSTORAGE = (w => {
if (!w) return;

const isActive = "localStorage" in w;

const get = key => {
  try {
    const serializedState = localStorage.getItem(key);

    return serializedState === null
      ? undefined
      : JSON.parse(serializedState);
  } catch (err) {
    console.error("Get state error: ", err);
  }
};

const set = (key, value) => {
  try {
    const serializedState = JSON.stringify(value);
    localStorage.setItem(key, serializedState);
  } catch (err) {
    console.error("Set state error: ", err);
  }
};

const remove = key => {
  try {
    return localStorage.removeItem(key);
  }  catch (err) {
    console.error("Item not remove", err);
  }
};

const clear = () => {
  localStorage.clear();
}

const publicAPI = {
  isActive,
  get,
  set ,
  remove ,
  clear ,
};

return publicAPI;
})(window);