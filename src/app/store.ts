import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import popularityReducer from "../features/character/popularity/PopularitySlice";
import locationsReducer from "../features/location/LocationsSlice";

export const store = configureStore({
  reducer: {
    popularity: popularityReducer,
    locations: locationsReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
