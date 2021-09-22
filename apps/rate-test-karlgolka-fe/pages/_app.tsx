import { AppProps } from 'next/app';
import Head from 'next/head';
import React from 'react';
import './styles.css';

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Memory Game!</title>
      </Head>
      <div className="app">
        <Component {...pageProps} />
      </div>
    </>
  );
}

export default App;
