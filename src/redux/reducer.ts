import { SET_USER, ActionTypes, appState } from "./types";

const initialState: appState = { user: undefined };

const actionMapping = {
  [SET_USER]: (state: object, action: ActionTypes) => {
    const newState = { ...state, user: action.user };
    return newState;
  },
};

export default function appReducer(
  state = initialState,
  action: ActionTypes
): appState {
  if (actionMapping[action.type]) {
    return actionMapping[action.type](state, action);
  } else {
    console.log(`Unknown action type ${action.type}`);
    return state;
  }
}
