import { createApi  } from "@reduxjs/toolkit/query/react";
import { fetchBaseQuery } from '@reduxjs/toolkit/query'
import {  NEWS_KEY } from "../credential";


const cryptoNews = createApi({
    reducerPath: 'cryptoNews',
    baseQuery : fetchBaseQuery({
        baseUrl : 'https://bing-news-search1.p.rapidapi.com',
        prepareHeaders:(headers)=> {
            headers.set('X-BingApis-SDK','true')
            headers.set('X-RapidAPI-Key',`${NEWS_KEY}`)
            headers.set('X-RapidAPI-Host','bing-news-search1.p.rapidapi.com')
            return headers
        }
    }),
    endpoints: (builder) => ({//returns endpoints 'blue ('
        getNews: builder.query({
            query: ({searchTerm , count}) =>`/news/search?q=${searchTerm}&freshness=Day&safeSearch=off&count=${count}`
        }),
    })
})



export {cryptoNews}
export const {useGetNewsQuery} = cryptoNews