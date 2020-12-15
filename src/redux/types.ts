export const SET_USER_ID = "SET_USER_ID";

interface SetUserIdAction {
  type: typeof SET_USER_ID;
  userId: string;
}

export interface appState {
  userId: string | undefined;
}

export type ActionTypes = SetUserIdAction;
