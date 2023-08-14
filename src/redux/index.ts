import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import products from './reducers/products';
import filters from './reducers/filters';

const rootReducer = combineReducers({
  products,
  filters
});

export const store = configureStore({
  reducer: rootReducer
});

export type Dispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof rootReducer>;

export default store;
