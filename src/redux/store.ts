import { createStore } from "redux";
import appReducer from "./reducer";
import storage from "redux-persist/lib/storage";
import { persistStore, persistReducer } from "redux-persist";

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, appReducer);

export const store = createStore(persistedReducer);
export const persistor = persistStore(store as any);
