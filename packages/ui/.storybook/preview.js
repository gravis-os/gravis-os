import React from 'react'
import { addDecorator } from '@storybook/react'
import { useDarkMode } from 'storybook-dark-mode'
import { themes } from '@storybook/theming'
import Layout from './Layout'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import { landingTheme } from '../src/themes'
import { CssBaseline } from '@mui/material'
// Next 12
import { RouterContext } from "next/dist/shared/lib/router-context"
// React Query
import { QueryClientProvider, QueryClient } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
// Msw
import { initialize as initializeMsw, mswDecorator } from 'msw-storybook-addon'
import mswHandlers from '../src/mocks/mswHandlers'
// Styles
import 'ag-grid-community/dist/styles/ag-grid.css'
import 'ag-grid-community/dist/styles/ag-theme-alpine.css'
import 'quill/dist/quill.snow.css'
// Custom Fonts
import '../src/styles/fonts.css'

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
  darkMode: {
    // Current theme
    current: 'light',
  },
  nextRouter: { Provider: RouterContext.Provider },
  msw: { handlers: mswHandlers },
}

// ==============================
// Decorators
// ==============================
// Style
addDecorator(storyFn => <Layout>{storyFn()}</Layout>)

// Theme
const selectedTheme = landingTheme
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

// Next Router
const mockRouter = {
  basePath: '',
  pathname: '/',
  route: '/',
  asPath: '/',
  query: {},
  push: () => {},
  replace: () => {},
  reload: () => {},
  back: () => {},
  prefetch: () => {},
  beforePopState: () => {},
  events: {
    on: () => {},
    off: () => {},
    emit: () => {},
  },
  isFallback: false,
};
addDecorator(storyFn => (
  <RouterContext.Provider value={mockRouter}>
    {storyFn()}
  </RouterContext.Provider>
))

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
