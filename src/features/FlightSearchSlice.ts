import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Airport } from "../hooks/useAirport";

const baseUrl = 'https://sky-scrapper.p.rapidapi.com/api';

export const flightsSearchApi = createApi({
    reducerPath: "flightsSearchApi",
    baseQuery: fetchBaseQuery({
        baseUrl: baseUrl,
        prepareHeaders: (headers) => {
            headers.set("x-rapidapi-key", "59f937dfe4msh751c68c56cc89e2p1d8e65jsn00371530c39b");
            headers.set("x-rapidapi-host", "sky-scrapper.p.rapidapi.com");
            return headers;
        }
    }),
    tagTypes: ['Airports', 'Flights'],
    endpoints: (builder) => ({
        getAllAirports: builder.query<{ data: Airport[] }, void>({
            query: () => `/v1/flights/searchAirport?query=new`,
            providesTags: ['Airports']
        }),
        getFlights: builder.query({
            query: ({ destinationSkyId,  destinationEntityId, date, returnDate, cabinClass, adults }) =>
                `/v2/flights/searchFlightsComplete?originSkyId=LOND&destinationSkyId=${destinationSkyId}&originEntityId=27544008&destinationEntityId=${destinationEntityId}&date=${date}&returnDate=${returnDate}&cabinClass=${cabinClass}&adults=${adults}&sortBy=best&currency=USD&market=en-US&countryCode=US`,
            // query: ({ originSkyId, destinationSkyId, originEntityId, destinationEntityId, date, returnDate, cabinClass, adults }) =>
            //     `/v2/flights/searchFlightsComplete?originSkyId=${originSkyId}&destinationSkyId=${destinationSkyId}&originEntityId=${originEntityId}&destinationEntityId=${destinationEntityId}&date=${date}&returnDate=${returnDate}&cabinClass=${cabinClass}&adults=${adults}&sortBy=best&currency=USD&market=en-US&countryCode=US`,

            providesTags: ['Flights']
        })
    })
});

export const { useGetAllAirportsQuery, useGetFlightsQuery, useLazyGetFlightsQuery } = flightsSearchApi;