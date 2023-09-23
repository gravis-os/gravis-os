/* eslint-disable unicorn/consistent-function-scoping */

import {
  getObjectWithGroupedKeyFromPrefix,
  getObjectWithReplacedValues,
} from '@gravis-os/utils'
import flowRight from 'lodash/flowRight'

// ==============================
// Plugins
// ==============================
const withSiteVariablesReplacement =
  (routeConfig: Record<string, string>) => (props) => {
    const { context, page, site } = props
    const { locale } = context

    const localeTitle = site?.locales?.find(
      ({ iso_alpha_2 }) => iso_alpha_2 === locale
    )?.title

    return getObjectWithReplacedValues(page, {
      // Replace `{title}` with page.title
      title: page.title,
      // Replace `{appTitle}` with site.title
      appTitle: site?.title,
      // Replace `{companyTitle}` with site.companyTitle
      companyTitle: site?.company_title,
      // Replace `{localeTitle}` with site.title
      localeTitle,
      // Replace routes e.g. `{routes.SERVICES}` to `/services`
      ...Object.entries(routeConfig).reduce((acc, [key, value]) => {
        return { ...acc, [`routes.${key}`]: value }
      }, {}),
    })
  }

const withSeoTitleFromPageTitle = () => (props) => {
  const { page } = props
  if (page.seo?.title) return props
  return {
    ...props,
    page: {
      ...page,
      seo: {
        title: page.seo_title || page.title,
        description: page.seo_description,
      },
    },
  }
}

const withSeoGrouping = () => (props) => {
  const { page } = props
  return {
    ...props,
    ...getObjectWithGroupedKeyFromPrefix(page, 'seo'),
  }
}

// ==============================
// Main
// ==============================
/**
 * Replace values in pageItem with values from site
 * For example replace 'My App Name is {appTitle}' with 'My App Name is Foo'
 * @param pageItem
 * @param site
 */
const makeGetDynamicPage = (routeConfig: Record<string, string>) =>
  flowRight(
    withSiteVariablesReplacement(routeConfig),
    withSeoTitleFromPageTitle(),
    withSeoGrouping()
  )

export default makeGetDynamicPage
