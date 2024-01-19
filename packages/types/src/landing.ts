import { SxProps } from '@mui/material'

import { CrudItem } from './crud'

export interface ClientHighlight extends Omit<CrudItem, 'title'> {
  alt?: string
  height?: number
  src?: string
  width?: number
}

export interface ClientLogo extends Omit<CrudItem, 'title'> {
  avatar_alt?: string
  avatar_height?: number
  avatar_src?: string
  avatar_width?: number
  sx?: SxProps
}

export interface ClientTestimonial extends CrudItem {
  author_company_title?: string
  author_job_title?: string
  author_title?: string
  avatar_alt?: string
  avatar_src?: string
  rating_count?: number
}

export enum FormCategoryEnum {
  CONTACT = 'contact-form',
  HONEYPOT = 'honeypot-form',
  LEAD = 'lead-form',
  NEWSLETTER = 'newsletter-form',
}

export interface Industry extends Page {
  fa_icon?: string
  is_featured?: boolean
  is_hidden_from_nav?: boolean
}

export interface Job extends CrudItem {
  ctaUrl?: string
  html?: string
}

export type PageSection =
  | 'benefits'
  | 'callout'
  | 'checklist'
  | 'cta'
  | 'faqs'
  | 'features'
  | 'gallery'
  | 'halfGrids'
  | 'hero'
  | 'howItWorks'
  | 'leftGridSticky'
  | 'rightGridSticky'
  | 'secondaryHero'
  | 'stats'
  | 'summary'

export interface Page extends CrudItem {
  hero_alt?: string
  hero_src?: string
  html?: string

  is_active?: boolean
  // Display
  is_featured?: boolean
  is_hidden_from_nav?: boolean
  // Hero
  overline?: string
  // Sections
  sections?: {
    [key in PageSection]?: {
      buttons?: Array<{
        href?: string
        overline?: string
        title?: string
      }>
      hero_alt?: string
      hero_src?: string
      items?: Array<{
        avatar_alt?: string
        avatar_src?: string
        content?: string
        fa_icon?: string
        href?: string
        overline?: string
        subtitle?: string
        title: string
        titleProps?: any
      }>
      overline?: string
      subtitle?: string
      title: string
    }
  }
  seo?: {
    description?: string
    title?: string
  }

  seo_description?: string
  // Seo
  seo_title?: string
  subtitle?: string

  title: string
}

export interface Post extends CrudItem {
  author_avatar_alt?: string
  // Author
  author_avatar_src?: string
  author_job_title?: string
  author_title?: string
  avatar_alt?: string
  avatar_src?: string
  category?: PostCategory
  category_id?: number
  hero_alt?: string
  hero_src?: string
  // Html
  html?: string
  is_featured?: boolean
  is_hero?: boolean
  published_at?: string
  // Tags
  tags?: CrudItem[]
}

export interface PostCategory extends CrudItem {
  description?: string
  hero_alt?: string
  hero_src?: string
}

export interface PressRelease extends Omit<Post, 'category' | 'category_id'> {}

export interface Resource extends Page {
  filename: string
}

export interface Service extends Page {
  category?: ServiceCategory
  category_id?: number
  hero_alt?: string
  hero_src?: string
  is_hidden_from_nav?: boolean
  // Tags
  tags?: CrudItem[]
}

export interface ServiceCategory extends CrudItem {
  description?: string
  hero_alt?: string
  hero_src?: string
}

export interface SiteLocale {
  iso_alpha_2: string
  key: string
  title: string
}

export interface SiteNavItem {
  id: string
  subtitle?: string
  title: string
}

export interface Site {
  absolute_url?: string
  company_absolute_url?: string
  // Company
  company_title?: string

  cta_button_title?: string
  // Cta
  cta_title?: string
  // Color mode
  default_theme_mode?: DEFAULT_THEME_MODE_ENUM
  // Hide faqs
  disable_faqs_on_home_page?: boolean
  // Hide serviceCategorys from contact form
  disable_service_categorys?: boolean
  // Hide testimonials
  disable_testimonials?: boolean

  // Contact
  general_email?: string
  general_phone?: string

  general_whatsapp?: string

  google_tag_manager_id?: string

  // Locale
  locales?: SiteLocale[]
  logo_alt?: string

  logo_height?: number
  logo_offset_y?: number

  // Logo
  logo_src?: string
  logo_width?: number
  nav_is_ecosystem_visible?: boolean

  // System
  nav_is_open_on_hover?: boolean
  nav_items?: SiteNavItem[]

  office_address?: string

  // Address
  office_title?: string
  seo_description?: string
  // Seo
  seo_title?: string

  social_media_behance_url?: string
  social_media_dribbble_url?: string
  social_media_facebook_url?: string
  // Social Media
  social_media_github_url?: string
  social_media_instagram_url?: string
  social_media_linkedin_url?: string
  social_media_medium_url?: string
  social_media_twitter_url?: string
  social_media_youtube_url?: string

  // App
  title?: string
}

export enum DEFAULT_THEME_MODE_ENUM {
  DARK = 'dark',
  LIGHT = 'light',
  SYSTEM = 'system',
  USER_LOCAL_STORAGE = 'user_local_storage',
}

export interface Technology extends Page {
  avatar_alt?: string
  avatar_height?: number
  avatar_src?: string
  avatar_width?: number
  hero_alt?: string
  hero_src?: string
  is_featured?: boolean
  is_hidden_from_nav?: boolean
}

export interface Showcase extends Page {
  backgroundColor?: string
  hero_src: string
  mode?: 'dark' | 'light' | string
  reverse?: boolean
}
