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
} from '@tanstack/react-query'
import { SettingsProvider, SettingsConsumer } from '@gravis-os/ui'
import getWebTheme from '@web/app/getWebTheme'
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

          <SettingsProvider>
            <SettingsConsumer>
              {({ settings }) => (
                <ThemeProvider theme={getWebTheme(settings.theme)}>
                  <CssBaseline />
                  <Component {...pageProps} />
                  <Toaster position="top-right" reverseOrder={false} />
                </ThemeProvider>
              )}
            </SettingsConsumer>
          </SettingsProvider>
        </CacheProvider>
      </Hydrate>
    </QueryClientProvider>
  )
}

export default App
