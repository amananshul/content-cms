// store/reducers/themeReducer.ts
import { createSlice } from '@reduxjs/toolkit';
import { RootState } from './index';

interface ThemeState {
  theme: string;
  isLoaded: boolean;
}

const initialState: ThemeState = {
  theme: 'light',
  isLoaded: false,
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setTheme(state, action) {
      state.theme = action.payload;
    },
    setIsLoaded(state, action) {
      state.isLoaded = action.payload;
    },
  },
});

export const { setTheme, setIsLoaded } = themeSlice.actions;

export const selectTheme = (state: RootState) => state.theme.theme;
export const selectIsLoaded = (state: RootState) => state.theme.isLoaded;


export default themeSlice.reducer;
