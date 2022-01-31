import {combineReducers, configureStore} from '@reduxjs/toolkit'
import thunk from "redux-thunk";
import {heroesReducer} from "../reducers/heroesSlice";


const rootReducer = combineReducers({
    heroes: heroesReducer,
})


export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
})