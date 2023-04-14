import { createApi } from '@reduxjs/toolkit/query/react'
import { fetchBaseQuery } from '@reduxjs/toolkit/query'




const cryptoApi = createApi({
    reducerPath: 'cryptoApi',
    baseQuery : fetchBaseQuery({
        baseUrl : 'https://coinranking1.p.rapidapi.com',
        prepareHeaders:(headers)=> {
            headers.set('X-RapidAPI-Key','3c80342ca4mshb7841c3b357f4a7p1e748ejsnd27821927bed')
            headers.set('X-RapidAPI-Host','coinranking1.p.rapidapi.com')

            return headers
        }
    }),
    endpoints: (builder) => ({//returns endpoints 'blue ('
        getCoins: builder.query({
            query: (count) => `/coins?limit=${count}`
        }),
        getCoinsData: builder.query({
            query: ({coinID,timePeriod}) =>`/coin/${coinID}?timePeriod=${timePeriod}`
        }),
        getCoinHistory: builder.query({
            query: ({coinID,timePeriod}) =>`/coin/${coinID}/history?timePeriod=${timePeriod}`
        }),
    })
})


export { cryptoApi }
export const { useGetCoinsQuery ,  useGetCoinsDataQuery , useGetCoinHistoryQuery} = cryptoApi

