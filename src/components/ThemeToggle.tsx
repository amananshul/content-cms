// components/ThemeToggle.tsx
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setTheme, setIsLoaded, selectTheme, selectIsLoaded } from '../store/reducers/themeReducer';

const ThemeToggle: React.FC = () => {
  const dispatch = useDispatch();
  const theme = useSelector(selectTheme);
  const isLoaded = useSelector(selectIsLoaded);

  const handleThemeToggle = () => {
    dispatch(setTheme(theme === 'light' ? 'dark' : 'light'));
  };

 
  return (
    <>
      <button onClick={handleThemeToggle} >
       {theme === 'light' ? 'Dark Theme' : 'Light Theme'}
      </button>
    
    </>
  );
};

export default ThemeToggle;
