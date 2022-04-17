import actions from "./constants";
import storeState from "./state";

export function busket(state = storeState, action) {
  switch (action.type) {
    case actions.ADD_BUSKET: {
      return {
        ...state,
        busket: {
          ...state.busket,
          [action.payload.id]: action.payload,
        },
      };
    }
    case actions.REMOVE_BUSKET: {
      const copy = JSON.parse(JSON.stringify(state));
      delete copy["busket"][action.payload];
      return {
        ...copy,
      };
    }
    case actions.SET_BUSKET: {
      return {
        ...state,
        busket:
          typeof action.payload === "string" ? { ...JSON.parse(action.payload) } : action.payload,
      };
    }
    default:
      return state;
  }
}
