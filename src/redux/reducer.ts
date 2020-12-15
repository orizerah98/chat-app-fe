import { SET_USER_ID, ActionTypes, appState } from "./types";

const initialState: appState = { userId: undefined };

const actionMapping = {
  [SET_USER_ID]: (state: object, action: ActionTypes) => {
    const newState = { ...state, userId: action.userId };
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
