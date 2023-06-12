import React, { createContext, useContext } from 'react'
import merge from 'lodash/merge'
import {
  ClientHighlight,
  ClientLogo,
  ClientTestimonial,
  Industry,
  Page,
  PostCategory,
  Service,
  ServiceCategory,
  Site,
  Technology,
  Workspace,
} from '@gravis-os/types'
import { FooterProps, ImageProps } from '@gravis-os/ui'
import { BlockItemProps } from '@gravis-os/landing'

// ==============================
// Types
// ==============================

export interface Showcase extends Page {
  hero_src: string
  mode?: BlockItemProps['mode']
  backgroundColor?: string
  reverse?: boolean
}

export interface LayoutContextValue {
  site?: Site
  routeConfig?: Record<string, string>

  // Calculated
  logoProps?: ImageProps
  socialMediaItems?: FooterProps['socialMediaItems']
  legalItems?: FooterProps['legalItems']

  // Modules
  services?: Service[]
  industrys?: Industry[]
  postCategorys?: PostCategory[]
  pages?: Page[]
  technologys?: Technology[]
  showcases?: Showcase[]
  serviceCategorys?: ServiceCategory[]
  clientTestimonials?: ClientTestimonial[]
  clientLogos?: ClientLogo[]
  clientHighlights?: ClientHighlight[]
  workspaces?: Workspace[]
}

// ==============================
// Initial State
// ==============================
export const layoutContextInitialState = {
  services: [],
  industrys: [],
  postCategorys: [],
  pages: [],
  technologys: [],
  showcases: [],
  serviceCategorys: [],
  clientTestimonials: [],
  clientLogos: [],
  clientHighlights: [],
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

  // Calculated state
  const { site, routeConfig } = injectedValue
  const calculatedValues = {
    logoProps: {
      src: site?.logo_src,
      alt: site?.logo_alt,
      width: site?.logo_width,
      height: site?.logo_height,
      invertImageOnMode: 'dark' as const,
    },
    legalItems: {
      terms: routeConfig?.TERMS,
      privacy: routeConfig?.PRIVACY,
      cookies: routeConfig?.COOKIES,
      PDPA: routeConfig?.PDPA,
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

  return (
    <LayoutContext.Provider value={value}>{children}</LayoutContext.Provider>
  )
}

export default LayoutProvider
