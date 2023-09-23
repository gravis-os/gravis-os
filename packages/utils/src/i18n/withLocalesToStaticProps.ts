import { CrudItem } from '@gravis-os/types'

import withLocales from './withLocales'

/**
 * withLocalesToStaticProps
 *
 * @usage
 * return flowRight(withLocalesToStaticProps(context))(staticPropsResult)
 *
 * @param context
 */
const withLocalesToStaticProps = (context) => (staticPropsResult) => {
  const { props }: any = staticPropsResult
  const { locale } = context

  // If no props, terminate
  if (!props) return staticPropsResult

  // Apply to all types of objects
  return {
    ...staticPropsResult,
    // Apply withLocales() to object type props
    props: Object.entries(props).reduce((acc, [key, value]) => {
      const isObjectOrArray = typeof value === 'object' && value !== null
      const nextValue = isObjectOrArray
        ? withLocales({ locale })(value as CrudItem | CrudItem[])
        : value
      return { ...acc, [key]: nextValue }
    }, {}),
  }
}

export default withLocalesToStaticProps
