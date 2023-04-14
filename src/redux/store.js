import { configureStore } from "@reduxjs/toolkit";
import { cryptoApi } from "./cryptoApi";
import { cryptoNews } from "./cryptoNews";

const store = configureStore({
    reducer:{
        [cryptoApi.reducerPath] : cryptoApi.reducer,
        [cryptoNews.reducerPath]: cryptoNews.reducer
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(cryptoApi.middleware,cryptoNews.middleware),
})


export {store}