import { combineReducers, configureStore } from "@reduxjs/toolkit";
import counterReduce from "./counterSlice";
import userReduce from "./userSlice";
import usersReduce from "./usersSlice";
import cartReduce from "./cartSlice";
import refreshReduce from "./refreshSlice";
import purchaseReduce from "./purchaseSlice";
import tokenReduce from "./tokenSlice";

import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";

const configPersist = {
  key: "root",
  storage,
  whitelist: [
    "user",
    "counter",
    "users",
    "cart",
    "refresh",
    "purchase",
    "token",
  ],
};

const rootReduc = combineReducers({
  counter: counterReduce,
  user: userReduce,
  users: usersReduce,
  cart: cartReduce,
  refresh: refreshReduce,
  purchase: purchaseReduce,
  token: tokenReduce,
});

const persistedReduc = persistReducer(configPersist, rootReduc);

export const store = configureStore({
  reducer: persistedReduc,
});

export const persistor = persistStore(store);
