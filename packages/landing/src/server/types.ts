import {
  Site,
  ClientLogo,
  ClientHighlight,
  ClientTestimonial,
  Industry,
  Page,
  PostCategory,
  ServiceCategory,
  Service,
  Technology,
  Workspace,
  Showcase,
} from '@gravis-os/types'

export interface LayoutConfig {
  routeConfig?: Record<string, string>
  site?: Site
  clientLogos?: ClientLogo[]
  clientHighlights?: ClientHighlight[]
  clientTestimonials?: ClientTestimonial[]
  industrys?: Industry[]
  pages?: Page[]
  postCategorys?: PostCategory[]
  serviceCategorys?: ServiceCategory[]
  services?: Service[]
  technologys?: Technology[]
  showcases?: Showcase[]
  workspaces?: Workspace[]
}