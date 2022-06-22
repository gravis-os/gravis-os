import React from 'react'
import { addDecorator } from '@storybook/react'
import Layout from './Layout'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import themeConfig from '../src/config/themeConfig'
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
  nextRouter: { Provider: RouterContext.Provider },
  msw: { handlers: mswHandlers },
  backgrounds: {
    default: 'light',
    values: [
      {
        name: 'dark',
        value: '#222',
      },
      {
        name: 'light',
        value: '#eee',
      },
    ],
  }
}

// ==============================
// Decorators
// ==============================
// Style
addDecorator(storyFn => <Layout>{storyFn()}</Layout>)

// Theme
const theme = createTheme(themeConfig.theme.light)
addDecorator(storyFn => (
  <ThemeProvider theme={theme}>
    {storyFn()}
  </ThemeProvider>
))

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
