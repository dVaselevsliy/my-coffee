import { combineSlices, configureStore } from "@reduxjs/toolkit";
import { coffeeSlice } from "../reducers/coffeeArray";
import { modalSlice } from "../reducers/modalContent";

const rootReducer = combineSlices(coffeeSlice, modalSlice)

export const store = configureStore({
  reducer: {
    coffee: rootReducer,
    modal: rootReducer
  }
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>