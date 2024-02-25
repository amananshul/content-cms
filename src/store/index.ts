// store/index.ts

import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import themeReducer from './reducers/themeReducer';
import loadingReducer from './reducers/loadingReducer';

const rootReducer = combineReducers({
  theme: themeReducer,
  loading: loadingReducer,

  // Add other reducers here if needed
});

export type RootState = ReturnType<typeof rootReducer>;


const store = configureStore({
  reducer: rootReducer,
});

export default store;
