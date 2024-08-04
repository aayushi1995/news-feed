import { combineReducers } from "@reduxjs/toolkit";
import newsReducer from "./newsReducer";

const rootReducer = combineReducers({
  news: newsReducer,
});

export default rootReducer;
