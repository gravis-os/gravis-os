import * as React from 'react'
import Head from 'next/head'
import type { NextPage } from 'next'
import type { AppProps } from 'next/app'
import { CacheProvider, EmotionCache } from '@emotion/react'
import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
  DehydratedState,
} from 'react-query'
import { UserPreferencesProvider } from '@gravis-os/theme'
import AppProvider from '@web/providers/AppProvider'
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
            <AppProvider>
              <Component {...pageProps} />
            </AppProvider>
          </UserPreferencesProvider>
        </CacheProvider>
      </Hydrate>
    </QueryClientProvider>
  )
}

export default App
