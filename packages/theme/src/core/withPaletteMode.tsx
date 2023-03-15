import React from 'react'
import { Theme } from '@mui/material'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import { useGravis } from '@gravis-os/config'

const defaultLightTheme = createTheme({ palette: { mode: 'light' } })
const defaultDarkTheme = createTheme({ palette: { mode: 'dark' } })

export interface WithPaletteModeProps {
  /**
   * Force a palette mode. Otherwise use the global mode
   * This allows us to get certain wrapped children to ignore the global palette
   *
   */
  mode?: 'light' | 'dark' | string
  /**
   * Shorthand method for mode
   */
  dark?: boolean
}

const withPaletteMode = (props: WithPaletteModeProps) => {
  const { dark: injectedDark, mode: injectedMode } = props

  // Calculate vars
  const mode = injectedMode || (injectedDark && 'dark')
  const dark = mode === 'dark'

  // Source config
  const onUseGravis = useGravis()
  const { mui } = onUseGravis

  return (children) => {
    if (!mode) return children

    return (
      <ThemeProvider
        theme={(outerTheme: Theme) => {
          const lightThemePalette =
            mui.theme?.light?.palette || defaultLightTheme.palette
          const darkThemePalette =
            mui.theme?.dark?.palette || defaultDarkTheme.palette

          const nextThemePalette = dark ? darkThemePalette : lightThemePalette

          const innerTheme = {
            ...outerTheme,
            palette: {
              ...outerTheme.palette,
              /**
               * Set to dark mode with the default changes to dark mode palette
               * @link https://mui.com/material-ui/customization/dark-mode/#dark-mode-by-default
               * @note that mode: 'dark', does nothing because we're using a custom palette
               */
              mode,
              text: nextThemePalette?.text,
              background: nextThemePalette?.background,
              divider: nextThemePalette?.divider,
              action: nextThemePalette?.action,
            },
          }

          return innerTheme
        }}
      >
        {children}
      </ThemeProvider>
    )
  }
}

export default withPaletteMode
