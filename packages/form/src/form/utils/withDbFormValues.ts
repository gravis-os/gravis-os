import kebabCase from 'lodash/kebabCase'
import omit from 'lodash/omit'
import { ARRAY_COLUMN_KEY_SUFFIXES } from '../../constants'
import getRelationalObjectKey from './getRelationalObjectKey'

// A recursive function to get the `id` value of relation objects e.g. product_id = 1
const getIdValuesWithRelationalKeysFromRelationalObjects = (values) => {
  return Object.entries(values).reduce((acc, [key, value]) => {
    if (key.endsWith('_id') && value) {
      return { ...acc, [key]: (value as { id: number }).id || value }
    }

    const isArrayColumn = ARRAY_COLUMN_KEY_SUFFIXES.some((char) =>
      key.endsWith(char)
    )
    if (Array.isArray(value) && !isArrayColumn) {
      return {
        ...acc,
        [key]: value.map(getIdValuesWithRelationalKeysFromRelationalObjects),
      }
    }

    if (
      typeof value === 'object' &&
      value !== null &&
      !(value instanceof Date) &&
      !isArrayColumn
    ) {
      return {
        ...acc,
        [key]: getIdValuesWithRelationalKeysFromRelationalObjects(value),
      }
    }

    return { ...acc, [key]: value }
  }, {})
}

const omitRelationalObjects = (obj) => {
  const relationalObjectKeysToOmit: string[] = Object.entries(obj).reduce(
    (acc, [key, value]) => {
      // Remove belongs to relations
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

export interface WithDbFormValuesOptions {
  isNew: boolean
}

/**
 * Strip out relational keys from values to send to the db
 * @param options
 * @param values - CrudItem
 */
const withDbFormValues = (options: WithDbFormValuesOptions) => (values) => {
  const { isNew } = options
  const { title } = values

  // Add default value for `created_at` column in new records
  const isNewValues = isNew && { created_at: new Date().toISOString() }

  // Add default value for `slug` column
  const slugValues = values.title && { slug: kebabCase(title) }

  // Get the id values of relational objects e.g. product_id = 1
  const idValues = getIdValuesWithRelationalKeysFromRelationalObjects(values)

  const nextValues = {
    ...values,
    ...idValues,
    updated_at: new Date().toISOString(),
    ...isNewValues,
    ...slugValues,
  }

  return omitRelationalObjects(nextValues)
}

export default withDbFormValues
