import React from 'react'
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
import theme from '../src/theme'
import createEmotionCache from '../src/createEmotionCache'
import 'quill/dist/quill.snow.css'

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

          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Component {...pageProps} />
            <Toaster position="top-right" reverseOrder={false} />
          </ThemeProvider>
        </CacheProvider>
      </Hydrate>
    </QueryClientProvider>
  )
}

export default App
