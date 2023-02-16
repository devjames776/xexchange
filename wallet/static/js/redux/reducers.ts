import { combineReducers } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import account from "./slices/accountInfoSlice";
import app from "./slices/appSlice";

const reducers = {
  account,
  app,
};

const rootReducer = combineReducers(reducers);

const persistConfig = {
  key: "maiarlaunchpad-store",
  version: 1,
  storage,
  blacklist: ["account"],
};

const localStorageReducers = persistReducer(persistConfig, rootReducer);

export default localStorageReducers;
