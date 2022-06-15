import kebabCase from 'lodash/kebabCase'
import omit from 'lodash/omit'
import getRelationalObjectKey from './getRelationalObjectKey'

const getValuesWithRelationalKeysFromRelationalObjects = (values) => {
  return Object.entries(values).reduce((acc, [key, value]) => {
    if (key.endsWith('_id') && value) {
      return { ...acc, [key]: (value as { id: number }).id || value }
    }
    if (Array.isArray(value)) {
      return {
        ...acc,
        [key]: value.map(getValuesWithRelationalKeysFromRelationalObjects),
      }
    }
    if (typeof value === 'object' && value !== null) {
      return {
        ...acc,
        [key]: getValuesWithRelationalKeysFromRelationalObjects(value),
      }
    }
    return { ...acc, [key]: value }
  }, {})
}

const withDbFormValues = (options) => (values) => {
  const { isNew } = options
  const { title } = values

  const isNewValues = isNew && { created_at: new Date().toISOString() }
  const slugValues = values.title && { slug: kebabCase(title) }
  const idValues = getValuesWithRelationalKeysFromRelationalObjects(values)

  const nextValues = {
    ...values,
    updated_at: new Date().toISOString(),
    ...slugValues,
    ...isNewValues,
    ...idValues,
  }

  const omitRelationalObjects = (obj) => {
    const relationalObjectKeysToOmit = Object.entries(obj).reduce(
      (acc, [key, value]) => {
        if (key.endsWith('_id')) {
          const relationalObjectKey = getRelationalObjectKey(key)
          return acc.concat(relationalObjectKey)
        }
        return acc
      },
      [] as string[]
    )

    return omit(obj, relationalObjectKeysToOmit)
  }

  return omitRelationalObjects(nextValues)
}

export default withDbFormValues
