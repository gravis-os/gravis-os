import getRelationalObjectKey from './getRelationalObjectKey'

const getDefaultValues = (args) => {
  const { item } = args

  const relationalObjects = Object.entries(item).reduce((acc, [key, value]) => {
    if (key.endsWith('_id') && value) {
      const relationalObjectKey = getRelationalObjectKey(key)
      const relationalObject = item[relationalObjectKey]
      return { ...acc, [key]: relationalObject }
    }
    return acc
  }, {})

  const nextItem = {
    ...item,
    ...relationalObjects,
  }

  return nextItem
}

export default getDefaultValues
