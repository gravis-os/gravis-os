import {
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

export interface LayoutConfig {
  clientHighlights?: ClientHighlight[]
  clientLogos?: ClientLogo[]
  clientTestimonials?: ClientTestimonial[]
  industrys?: Industry[]
  pages?: Page[]
  postCategorys?: PostCategory[]
  routeConfig?: Record<string, string>
  serviceCategorys?: ServiceCategory[]
  services?: Service[]
  showcases?: Showcase[]
  site?: Site
  technologys?: Technology[]
  workspaces?: Workspace[]
}
