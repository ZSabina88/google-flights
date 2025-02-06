import { configureStore } from "@reduxjs/toolkit";
import { flightsSearchApi } from "./FlightSearchSlice";

const store = configureStore({
    reducer: {
        [flightsSearchApi.reducerPath]: flightsSearchApi.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(flightsSearchApi.middleware),
})

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;