import { createStore } from 'redux';
import reducer from '../reducers/HeroesList-reducer';
import { composeWithDevTools } from 'redux-devtools-extension';
import reduxThunk from 'redux-thunk';
import {applyMiddleware} from "@reduxjs/toolkit";

// const store = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
const store = createStore(reducer,composeWithDevTools(applyMiddleware(reduxThunk)));

export default store;