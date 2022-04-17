import { combineReducers, createStore } from "@reduxjs/toolkit";
import { busket } from "./reducer";

const _reducers = combineReducers({ busket });

const store = createStore(_reducers);

export default store;
