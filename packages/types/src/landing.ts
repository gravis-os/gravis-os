import { CrudItem } from './crud'

export interface ClientHighlight extends Omit<CrudItem, 'title'> {
  src?: string
  alt?: string
  width?: number
  height?: number
}

export interface ClientLogo extends Omit<CrudItem, 'title'> {
  avatar_src?: string
  avatar_alt?: string
  avatar_width?: number
  avatar_height?: number
}

export interface ClientTestimonial extends CrudItem {
  avatar_src?: string
  avatar_alt?: string
  author_title?: string
  author_job_title?: string
  author_company_title?: string
  rating_count?: number
}

export enum FormCategoryEnum {
  LEAD = 'lead-form',
  CONTACT = 'contact-form',
  NEWSLETTER = 'newsletter-form',
  HONEYPOT = 'honeypot-form',
}

export interface Industry extends Page {
  fa_icon?: string
  is_featured?: boolean
  is_hidden_from_nav?: boolean
}

export interface Job extends CrudItem {
  html?: string
  ctaUrl?: string
}

export type PageSection =
  | 'hero'
  | 'summary'
  | 'benefits'
  | 'features'
  | 'howItWorks'
  | 'faqs'
  | 'checklist'
  | 'callout'
  | 'cta'
  | 'halfGrids'
  | 'leftGridSticky'
  | 'rightGridSticky'
  | 'gallery'
  | 'stats'
  | 'secondaryHero'

export interface Page extends CrudItem {
  // Seo
  seo_title?: string
  seo_description?: string
  seo?: {
    title?: string
    description?: string
  }

  // Hero
  overline?: string
  title: string
  subtitle?: string
  hero_src?: string
  hero_alt?: string
  html?: string

  // Display
  is_featured?: boolean
  is_hidden_from_nav?: boolean
  is_active?: boolean

  // Sections
  sections?: {
    [key in PageSection]?: {
      overline?: string
      title: string
      subtitle?: string
      hero_src?: string
      hero_alt?: string
      buttons?: Array<{
        overline?: string
        title?: string
        href?: string
      }>
      items?: Array<{
        avatar_src?: string
        avatar_alt?: string
        fa_icon?: string
        title: string
        titleProps?: any
        subtitle?: string
        overline?: string
        href?: string
        content?: string
      }>
    }
  }
}

export interface Post extends CrudItem {
  category_id?: number
  category?: PostCategory
  avatar_src?: string
  avatar_alt?: string
  hero_src?: string
  hero_alt?: string
  // Author
  author_avatar_src?: string
  author_avatar_alt?: string
  author_title?: string
  author_job_title?: string
  // Tags
  tags?: CrudItem[]
  // Html
  html?: string
  published_at?: string
  is_featured?: boolean
  is_hero?: boolean
}

export interface PostCategory extends CrudItem {
  description?: string
  hero_src?: string
  hero_alt?: string
}

export interface PressRelease extends Omit<Post, 'category' | 'category_id'> {}

export interface Resource extends Page {}

export interface Service extends Page {
  category_id?: number
  category?: ServiceCategory
  hero_src?: string
  hero_alt?: string
  is_hidden_from_nav?: boolean
  enable_locales?: SiteLocale[]
  // Tags
  tags?: CrudItem[]
}

export interface ServiceCategory extends CrudItem {
  description?: string
  hero_src?: string
  hero_alt?: string
}

export interface SiteLocale {
  key: string
  iso_alpha_2: string
  title: string
}

export interface SiteNavItem {
  key: string
  title: string
  subtitle?: string
}

export interface Site {
  // Seo
  seo_title?: string
  seo_description?: string
  google_tag_manager_id?: string

  // Logo
  logo_src?: string
  logo_alt?: string
  logo_width?: number
  logo_height?: number

  // App
  title?: string
  absolute_url?: string

  // Hide testimonials
  disable_testimonials?: boolean

  // Hide faqs
  disable_faqs_on_home_page?: boolean

  // Company
  company_title?: string
  company_absolute_url?: string

  // Cta
  cta_title?: string
  cta_button_title?: string

  // Contact
  general_email?: string
  general_phone?: string
  general_whatsapp?: string

  // Address
  office_title?: string
  office_address?: string

  // Locale
  locales?: SiteLocale[]

  // System
  nav_is_open_on_hover?: boolean
  nav_is_ecosystem_visible?: boolean
  nav_items?: SiteNavItem[]

  // Social Media
  social_media_github_url?: string
  social_media_medium_url?: string
  social_media_behance_url?: string
  social_media_twitter_url?: string
  social_media_dribbble_url?: string
  social_media_facebook_url?: string
  social_media_linkedin_url?: string
  social_media_instagram_url?: string
  social_media_youtube_url?: string
}

export interface Technology extends Page {
  avatar_src?: string
  avatar_alt?: string
  avatar_width?: number
  avatar_height?: number
  hero_src?: string
  hero_alt?: string
  is_featured?: boolean
  is_hidden_from_nav?: boolean
}

export interface Showcase extends Page {
  hero_src: string
  mode?: 'light' | 'dark' | string
  backgroundColor?: string
  reverse?: boolean
}
