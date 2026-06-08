import { configureStore } from "@reduxjs/toolkit";
import weatherApirReducer from "../features/weatherApi/weatherApiSlice";

export const store = configureStore({
  reducer: {
    weather: weatherApirReducer,
  },
});
