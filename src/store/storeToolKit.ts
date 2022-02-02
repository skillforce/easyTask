import {combineReducers, configureStore} from '@reduxjs/toolkit'
import thunk from "redux-thunk";
import {heroesReducer} from "../reducers/heroesSlice";
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import {ApiSlice} from '../API/apiSlice';


const rootReducer = combineReducers({
    heroes: heroesReducer,
    [ApiSlice.reducerPath]:ApiSlice.reducer
})


export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk,ApiSlice.middleware),
})


export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector