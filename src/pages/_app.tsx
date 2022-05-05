import * as React from 'react';
import { Provider } from '@cebus/react-components';
import { webLightTheme, webDarkTheme } from '../theme';
import { useLocalDefault, useThemeDetector, useGetLocal } from '../utils';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { SSRProvider } from '@fluentui/react-utilities';
import { RendererProvider, createDOMRenderer } from '@griffel/react';
import { QueryClientProvider } from 'react-query';
import { AppProvider } from '../context';
import { Hydrate } from 'react-query/hydration';
import { queryClient } from '../clients/react-query';
import { AppContainer } from '../components';

export default function App(props: AppProps) {
  const { Component, pageProps } = props as any;
  const isDarkTheme = useThemeDetector();

  const [isMounted, setIsMounted] = React.useState(false);

  useLocalDefault('theme', 'System');
  const userTheme = useGetLocal('theme');

  const findTheme = React.useCallback(
    (theme: string) => {
      switch (theme) {
        case 'System':
          return isDarkTheme ? webDarkTheme : webLightTheme;
        case 'Dark':
          return webDarkTheme;
        case 'Light':
          return webLightTheme;
        default:
          return webLightTheme;
      }
    },
    [isDarkTheme],
  );

  const [theme, setTheme] = React.useState(findTheme(userTheme));

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  React.useEffect(() => {
    setTheme(findTheme(userTheme));
  }, [isDarkTheme, findTheme, userTheme]);

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <Head>
          <title>Book Town</title>
          <meta name="title" content="Book Town" />
          <meta name="description" content="Buy books now." />
          <link rel="icon" type="image/svg+xml" href="/image/favicon.svg" />
        </Head>
        <style jsx global>{`
          body {
            background-color: ${theme.canvasColor};
            padding: 0px;
            margin: 0px;
          }
        `}</style>
        <RendererProvider renderer={pageProps.renderer || createDOMRenderer()}>
          <SSRProvider>
            <AppProvider value={{ setTheme, findTheme }}>
              {isMounted && (
                <Provider theme={theme}>
                  <AppContainer>
                    <Component {...pageProps} />
                  </AppContainer>
                </Provider>
              )}
            </AppProvider>
          </SSRProvider>
        </RendererProvider>
      </Hydrate>
    </QueryClientProvider>
  );
}
