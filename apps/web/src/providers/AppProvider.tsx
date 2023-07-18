import React, { PropsWithChildren } from 'react'
import { ThemeProvider, useUserPreferences } from '@gravis-os/theme'
import { CssBaseline } from '@mui/material'
import getWebTheme from '@web/app/getWebTheme'
import { Toaster } from 'react-hot-toast'

export default function AppProvider(props: PropsWithChildren) {
  const { children } = props
  const { isDarkMode } = useUserPreferences()
  return (
    <ThemeProvider theme={getWebTheme(isDarkMode ? 'dark' : 'light')}>
      <CssBaseline />
      {children}
      <Toaster position="top-right" reverseOrder={false} />
    </ThemeProvider>
  )
}
