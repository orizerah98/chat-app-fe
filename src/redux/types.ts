export const SET_USER_ID = "SET_USER_ID";

interface IUser {
  _id: string;
  displayName: string;
  email: string;
}

interface SetUserIdAction {
  type: typeof SET_USER_ID;
  user: IUser;
}

export interface appState {
  user: IUser | undefined;
}

export type ActionTypes = SetUserIdAction;
