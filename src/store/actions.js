import actions from "./constants";

const addStore = (payload) => {
  return {
    type: actions.ADD_BUSKET,
    payload: payload,
  };
};

const setAll = (payload) => {
  return {
    type: actions.SET_BUSKET,
    payload: payload,
  };
};

export { addStore, setAll };
