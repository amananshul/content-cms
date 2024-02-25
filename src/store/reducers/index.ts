// store/index.ts
import { combineReducers } from '@reduxjs/toolkit';
import themeReducer from './themeReducer';
import loadingReducer from './themeReducer';
// Import other reducers as needed

const rootReducer = combineReducers({
  theme: themeReducer,
  loading: loadingReducer,

  // Add other reducers here
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
