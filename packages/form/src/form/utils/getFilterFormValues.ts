import isNil from 'lodash/isNil'
import omitBy from 'lodash/omitBy'

const getFilterFormValues = ({ values }) => {
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

  return nextValues
}

export default getFilterFormValues
