import * as React from 'react';
import { Provider, webLightTheme } from '@cebus/react-components';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { SSRProvider } from '@fluentui/react-utilities';
import { RendererProvider, createDOMRenderer } from '@griffel/react';

export default function App(props: AppProps) {
  const { Component, pageProps } = props as any;

  const [isMounted, setIsMounted] = React.useState(false);

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <>
      <Head>
        <title>Book Town</title>
        <meta name="title" content="Book Town" />
        <meta name="description" content="Buy books now." />
        <link rel="icon" type="image/svg+xml" href="/image/favicon.svg" />
      </Head>
      <style jsx global>{`
        body {
          background-color: ${webLightTheme.canvasColor};
          padding: 0px;
          margin: 0px;
        }
      `}</style>
      <RendererProvider renderer={pageProps.renderer || createDOMRenderer()}>
        <SSRProvider>
          {isMounted && (
            <Provider theme={webLightTheme}>
              <Component {...pageProps} />
            </Provider>
          )}
        </SSRProvider>
      </RendererProvider>
    </>
  );
}
