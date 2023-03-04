import React, { createContext, useContext } from 'react'
import merge from 'lodash/merge'
import { GravisConfig } from '@gravis-os/types'
import { createTheme } from '@mui/material/styles'

const muiDefaultTheme = createTheme()

// ==============================
// Context
// ==============================
const gravisConfigInitialState = {
  next: {
    version: process.env.NEXT_PUBLIC_GRAVIS_NEXTJS_VERSION
      ? Number(process.env.NEXT_PUBLIC_GRAVIS_NEXTJS_VERSION)
      : 12,
  },
  mui: {
    theme: {
      light: muiDefaultTheme,
      dark: muiDefaultTheme,
    },
  },
} as GravisConfig

export const GravisContext = createContext<GravisConfig>(
  gravisConfigInitialState
)

// ==============================
// Hook
// ==============================
export const useGravis = () => useContext(GravisContext)

export interface GravisProviderProps {
  children?: React.ReactNode
  config?: GravisConfig
}

// ==============================
// Provider
// ==============================
const GravisProvider: React.FC<GravisProviderProps> = (props) => {
  const { children, config } = props

  const value = merge({}, gravisConfigInitialState, config)

  return (
    <GravisContext.Provider value={value}>{children}</GravisContext.Provider>
  )
}

export default GravisProvider
