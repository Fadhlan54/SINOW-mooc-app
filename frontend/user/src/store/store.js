import { configureStore } from "@reduxjs/toolkit";
import filterReducer from "./slices/filterSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      filter: filterReducer,
    },
  });
};
