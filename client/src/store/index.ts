import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useSelector } from "react-redux";
import rootReducer from "./reducers";
import { IRootState } from "@/types";

const store = configureStore({
  devTools: true,
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

store.subscribe(() => {});

export const useAppSelector: TypedUseSelectorHook<IRootState> = useSelector;

export default store;
