import isNil from 'lodash/isNil'

// ==============================
// ResponsiveSxProp
// ==============================
export type ResponsiveSxProp =
  | Record<string, unknown>
  | string
  | number
  | boolean

/**
 * getResponsiveSxProp
 * Get the responsive sx prop from the given props.
 * @param targetCssKey
 * @param cssValue
 * @param setCssValue
 *
 * @example
 * getResponsiveSxProp({
 *   targetCssKey: 'flexWrap',
 *   cssValue: reverse, // { xs: true, md: false }
 *   setCssValue: (cssValue) => {
 *     switch (true) {
 *       case cssValue === true:
 *         return 'wrap-reverse'
 *       case cssValue === false:
 *       default:
 *         return 'wrap'
 *     }
 *   },
 * })
 */
export const getResponsiveSxProp = ({
  targetCssKey,
  cssValue,
  setCssValue,
}: {
  // User-defined value
  cssValue: ResponsiveSxProp
  // Remap css key
  targetCssKey: string
  // Remap css value
  setCssValue?: (cssValue: ResponsiveSxProp) => ResponsiveSxProp
}): Record<string, string | number | boolean> => {
  // Handle case where cssValue is nil
  if (isNil(cssValue)) return {}

  const getNextCssValue = ({ cssValue, setCssValue }) => {
    if (!setCssValue) return cssValue

    // Apply transformation to every value in the object
    if (typeof cssValue === 'object') {
      return Object.entries(cssValue).reduce((acc, [key, value]) => {
        return { ...acc, [key]: setCssValue(value) }
      }, {})
    }

    return setCssValue(cssValue)
  }
  const nextCssValue = getNextCssValue({ cssValue, setCssValue })

  // Handle case where cssValue is a primitive
  if (typeof cssValue !== 'object') {
    return { [targetCssKey]: nextCssValue }
  }

  // Handle case where cssValue is an object with responsive keys
  return { [targetCssKey]: nextCssValue }
}

export default getResponsiveSxProp
