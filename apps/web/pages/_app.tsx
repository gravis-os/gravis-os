import * as React from 'react'
import Head from 'next/head'
import type { NextPage } from 'next'
import type { AppProps } from 'next/app'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { CacheProvider, EmotionCache } from '@emotion/react'
import { Toaster } from 'react-hot-toast'
import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
  DehydratedState,
} from 'react-query'
import getWebTheme from '@web/app/getWebTheme'
import { UserPreferencesProvider } from '@gravis-os/landing'
import { UserPreferencesConsumer } from '@gravis-os/theme'
import createEmotionCache from '../src/createEmotionCache'

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache()

type PageProps = {
  dehydratedState?: DehydratedState
}

type EnhancedAppProps<P = Record<string, unknown>> = AppProps<P> & {
  Component: NextPage<P>
  emotionCache: EmotionCache
}

const App: React.FC<EnhancedAppProps<PageProps>> = (props) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props

  const [queryClient] = React.useState(() => new QueryClient())

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <CacheProvider value={emotionCache}>
          <Head>
            <meta
              name="viewport"
              content="initial-scale=1, width=device-width"
            />
          </Head>

          <UserPreferencesProvider>
            <UserPreferencesConsumer>
              {({ isDarkMode }) => (
                <ThemeProvider
                  theme={getWebTheme(isDarkMode ? 'dark' : 'light')}
                >
                  <CssBaseline />
                  <Component {...pageProps} />
                  <Toaster position="top-right" reverseOrder={false} />
                </ThemeProvider>
              )}
            </UserPreferencesConsumer>
          </UserPreferencesProvider>
        </CacheProvider>
      </Hydrate>
    </QueryClientProvider>
  )
}

export default App
