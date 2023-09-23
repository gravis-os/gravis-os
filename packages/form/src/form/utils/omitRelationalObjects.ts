import omit from 'lodash/omit'

import getRelationalObjectKey from './getRelationalObjectKey'

const omitRelationalObjects = (obj) => {
  const relationalObjectKeysToOmit = Object.entries(obj).reduce(
    (acc, [key, value]) => {
      if (key.endsWith('_id')) {
        const relationalObjectKey = getRelationalObjectKey(key)
        return [...acc, relationalObjectKey]
      }
      return acc
    },
    [] as string[]
  )

  return omit(obj, relationalObjectKeysToOmit)
}

export default omitRelationalObjects
