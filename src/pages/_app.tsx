// pages/_app.tsx
import { Provider } from 'react-redux';
import React from 'react';
import { AppProps } from 'next/app';
import Header from '../components/Header';
import '../../src/app/globals.css';
import  store from '@/store';

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <Provider store={store}>
      <Header />
      <Component {...pageProps} />
    </Provider>
  );
};

export default MyApp;
