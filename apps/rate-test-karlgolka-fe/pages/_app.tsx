import React from 'react';
import { AppProps } from 'next/app';
import Head from 'next/head';
import './styles.css';
import Logo from '../app/logo/Logo';
import Button from '../app/button/Button';

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Memory Game!</title>
      </Head>
      <div className="app">
        <header>
          <Logo />
          <Button />
        </header>
        <main>
          <Component {...pageProps} />
        </main>
      </div>
    </>
  );
}

export default App;
