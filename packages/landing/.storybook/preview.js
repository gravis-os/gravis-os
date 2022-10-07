import React from 'react'
import { addDecorator } from '@storybook/react'
import { useDarkMode } from 'storybook-dark-mode'
import Layout from './Layout'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import { gravisLandingTheme } from '../src/themes'
import { CssBaseline } from '@mui/material'
// Next 12
import { RouterContext } from "next/dist/shared/lib/router-context"
// React Query
import { QueryClientProvider, QueryClient } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
// Msw
import { initialize as initializeMsw, mswDecorator } from 'msw-storybook-addon'
import mswHandlers from '../src/mocks/mswHandlers'
import 'quill/dist/quill.snow.css'

// ==============================
// Storybook Parameters
// ==============================
export const parameters = {
  // @link https://github.com/storybookjs/storybook/issues/17025#issuecomment-1055654634
  docs: {
    source: { type: 'code' }, // Default here is 'dynamic'
  },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  darkMode: { current: 'light' }, // 'light' | 'dark'
  nextRouter: { Provider: RouterContext.Provider },
  msw: { handlers: mswHandlers },
}

// ==============================
// Decorators
// ==============================
// Style
addDecorator(storyFn => <Layout>{storyFn()}</Layout>)

// Theme
const selectedTheme = gravisLandingTheme
const lightTheme = createTheme(selectedTheme.light)
const darkTheme = createTheme(selectedTheme.dark)
addDecorator(storyFn => {
  const isDarkMode = useDarkMode()
  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <CssBaseline />
      {storyFn()}
    </ThemeProvider>
  )
})

// React Query
const queryClient = new QueryClient()
addDecorator(storyFn => (
  <QueryClientProvider client={queryClient}>
    {storyFn()}
    <ReactQueryDevtools />
  </QueryClientProvider>
))

// Msw
initializeMsw()
addDecorator(mswDecorator)
