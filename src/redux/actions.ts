import { ActionTypes, SET_USER_ID } from "./types";

export function sendMessage(userId: string): ActionTypes {
  return {
    type: SET_USER_ID,
    userId: userId,
  };
}
