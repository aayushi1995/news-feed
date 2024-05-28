
import { configureStore } from "@reduxjs/toolkit";
import {thunk} from 'redux-thunk';
import rootReducer from "./reducers"; // Ensure reducers/index.js exists and combines all reducers

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false
  }).concat(thunk),
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;
