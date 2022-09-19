import * as React from 'react'
import Head from 'next/head'
import { AppProps } from 'next/app'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { CacheProvider, EmotionCache } from '@emotion/react'
import { Toaster } from 'react-hot-toast'
import { Hydrate, QueryClient, QueryClientProvider } from 'react-query'
import { SettingsProvider, SettingsConsumer } from '@gravis-os/ui'
import createEmotionCache from '../src/createEmotionCache'
import getWebTheme from '../src/theme/webTheme'

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache()

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache
}

export default function MyApp(props: MyAppProps) {
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
