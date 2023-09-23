import isNil from 'lodash/isNil'
import omitBy from 'lodash/omitBy'

import getRelationalObjectKey from './getRelationalObjectKey'

const getFilterFormValues = ({ values }) => {
  const idValues = Object.entries(values).reduce((acc, [key, value]) => {
    if (key.endsWith('_id') && value) {
      const relationalObjectKey = getRelationalObjectKey(key, false)
      return {
        ...acc,
        [key]: (value as { id: number }).id || value,
        [relationalObjectKey]: value,
      }
    }
    return acc
  }, {})

  const nextValues = omitBy(
    {
      ...values,
      ...idValues,
    },
    isNil // Omit null/undefined values
  )

  return nextValues
}

export default getFilterFormValues
