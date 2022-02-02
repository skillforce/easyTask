import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/dist/query/react';
import {FilterList, ModifyHeroes, NewHeroes} from '../reducers/heroesSlice';


export const ApiSlice = createApi({
    reducerPath: 'ApiSlice',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:3001'
    }),
    tagTypes: ['Heroes'],
    endpoints: (builder) => ({
        getHeroes: builder.query<NewHeroes[], void>({
            query: () => '/heroes',
            providesTags: ['Heroes']
        }),
        getFilterList: builder.query<FilterList[],void>({
                query: () => '/filters',
            }),
        createHero: builder.mutation({
            query: (hero: NewHeroes) => ({
                url: '/heroes',
                method: 'POST',
                body: hero
            }),
            invalidatesTags: ['Heroes']
        }),
        deleteHero: builder.mutation({
            query: (id: string) => ({
                url: `/heroes/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Heroes']
        })
    })
})

export const {useGetHeroesQuery,useGetFilterListQuery, useCreateHeroMutation, useDeleteHeroMutation} = ApiSlice;