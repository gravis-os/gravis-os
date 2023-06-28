import { getCrudItemsByCategory, withLocales } from '@gravis-os/utils'
import { LayoutConfig } from './types'

const makeGetLayoutProviderProps =
  (layoutConfig: LayoutConfig) =>
  ({ context }) => {
    const {
      routeConfig = {},
      site = {},
      clientLogos = [],
      clientHighlights = [],
      clientTestimonials = [],
      industrys = [],
      pages = [],
      postCategorys = [],
      serviceCategorys = [],
      services = [],
      technologys = [],
      showcases = [],
      workspaces = [],
    } = layoutConfig
    return {
      // Configs
      routeConfig,

      // Site
      site,

      // Modules
      clientLogos,
      clientHighlights,
      clientTestimonials,
      industrys: industrys
        ?.filter(({ is_hidden_from_nav }) => !is_hidden_from_nav)
        ?.map((industry) => ({
          ...industry,
          href: `${routeConfig.INDUSTRYS}/${industry.slug}`,
        })),
      pages: pages?.filter(({ is_hidden_from_nav }) => !is_hidden_from_nav),
      postCategorys: postCategorys?.map((postCategory) => ({
        ...postCategory,
        href: `${routeConfig.POSTS}/${postCategory.slug}`,
      })),
      serviceCategorys,
      services: getCrudItemsByCategory(services, serviceCategorys).map(
        (service) => ({
          ...service,
          href: `${routeConfig.SERVICES}/${service.slug}`,
          items: withLocales(context)(
            service.items.map((item) => ({
              ...item,
              href: `${routeConfig.SERVICES}/${service.slug}/${item.slug}`,
            }))
          ),
        })
      ),
      technologys: technologys
        .filter(({ is_hidden_from_nav }) => !is_hidden_from_nav)
        .map((technology) => ({
          ...technology,
          href: `${routeConfig.TECHNOLOGYS}/${technology.slug}`,
        })),
      showcases,
      workspaces,
    }
  }

export default makeGetLayoutProviderProps
