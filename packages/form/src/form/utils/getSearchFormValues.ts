import isNil from 'lodash/isNil'
import omitBy from 'lodash/omitBy'

import omitRelationalObjects from './omitRelationalObjects'

const getSearchFormValues = ({ values }) => {
  const idValues = Object.entries(values).reduce((acc, [key, value]) => {
    if (key.endsWith('_id') && value) {
      return { ...acc, [key]: (value as { id: number }).id || value }
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

  return omitRelationalObjects(nextValues)
}

export default getSearchFormValues
