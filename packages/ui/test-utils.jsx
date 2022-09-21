import React from 'react'
import '@testing-library/jest-dom'
import { render } from '@testing-library/react'
import { createTheme, ThemeProvider } from '@mui/material/styles'

// Adapted from: https://testing-library.com/docs/react-testing-library/setup/
const AllTheProviders = ({ children }) => {
  return <ThemeProvider theme={createTheme()}>{children}</ThemeProvider>
}

const customRender = (ui, options) =>
  render(ui, { wrapper: AllTheProviders, ...options })

// re-export everything
export * from '@testing-library/react'

// override render method
export { customRender as render }
