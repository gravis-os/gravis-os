import type {
  ClientHighlight,
  ClientLogo,
  ClientTestimonial,
  Industry,
  Page,
  PostCategory,
  Service,
  ServiceCategory,
  Showcase,
  Site,
  Technology,
  Workspace,
} from '@gravis-os/types'

import React, { createContext, useContext, useEffect } from 'react'

import { useUserPreferences } from '@gravis-os/theme'
import { FooterProps, ImageProps } from '@gravis-os/ui'
import merge from 'lodash/merge'

// ==============================
// Types
// ==============================
export interface LayoutContextValue {
  clientHighlights?: ClientHighlight[]
  clientLogos?: ClientLogo[]

  clientTestimonials?: ClientTestimonial[]
  industrys?: Industry[]
  legalItems?: FooterProps['legalItems']

  // Calculated
  logoProps?: ImageProps
  pages?: Page[]
  postCategorys?: PostCategory[]
  routeConfig?: Record<string, string>
  serviceCategorys?: ServiceCategory[]
  // Modules
  services?: Service[]
  showcases?: Showcase[]
  site?: Site
  socialMediaItems?: FooterProps['socialMediaItems']
  technologys?: Technology[]
  workspaces?: Workspace[]
}

// ==============================
// Initial State
// ==============================
export const layoutContextInitialState = {
  clientHighlights: [],
  clientLogos: [],
  clientTestimonials: [],
  industrys: [],
  legalItems: {},

  logoProps: {
    alt: '',
    height: '',
    src: '',
    width: '',
  },
  pages: [],
  postCategorys: [],
  routeConfig: {},
  serviceCategorys: [],
  services: [],
  showcases: [],
  site: {},
  socialMediaItems: {},
  technologys: [],
  workspaces: [],
}

// ==============================
// Context
// ==============================
export const LayoutContext = createContext<LayoutContextValue>(
  layoutContextInitialState
)

// ==============================
// Hook
// ==============================
export const useLayout = () => {
  const context = useContext(LayoutContext)

  if (!context)
    throw new Error('useLayout must be used within a LayoutProvider')

  return context
}

// ==============================
// Provider
// ==============================
export interface LayoutProviderProps {
  children?: React.ReactNode
  value?: LayoutContextValue
}

const LayoutProvider: React.FC<LayoutProviderProps> = (props) => {
  const { children, value: injectedValue } = props

  const { setDefaultThemeMode } = useUserPreferences()

  // Calculated state
  const { routeConfig, site } = injectedValue
  const calculatedValues = {
    legalItems: {
      cookies: routeConfig?.COOKIES,
      PDPA: routeConfig?.PDPA,
      privacy: routeConfig?.PRIVACY,
      terms: routeConfig?.TERMS,
    },
    logoProps: {
      alt: site?.logo_alt,
      height: site?.logo_height,
      invertImageOnMode: 'dark' as const,
      src: site?.logo_src,
      width: site?.logo_width,
      ...(site?.logo_offset_y && {
        boxSx: { position: 'relative', top: site?.logo_offset_y },
      }),
    },
    socialMediaItems: Object.entries(site).reduce((acc, [key, value]) => {
      if (!key.startsWith('social_media_')) return acc
      // Rename 'social_media_github_url' to 'github'
      const nextKey = key.replace('social_media_', '').replace('_url', '')
      return { ...acc, [nextKey]: value }
    }, {}),
  }

  const value = merge(
    {},
    layoutContextInitialState,
    injectedValue,
    calculatedValues
  )

  useEffect(() => {
    if (!(setDefaultThemeMode && site.default_theme_mode)) return
    setDefaultThemeMode(site.default_theme_mode)
  }, [site.default_theme_mode, setDefaultThemeMode])

  return (
    <LayoutContext.Provider value={value}>{children}</LayoutContext.Provider>
  )
}

export default LayoutProvider
