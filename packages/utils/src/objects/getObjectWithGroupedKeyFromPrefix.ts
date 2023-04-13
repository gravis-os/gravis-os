const getObjectWithGroupedKeyFromPrefix = (object, prefix: string) => {
  const group = Object.entries(object).reduce((acc, [key, value]) => {
    const groupColumnPrefix = `${prefix}_`

    if (!key.startsWith(groupColumnPrefix)) return acc
    const nextKey = key.replace(groupColumnPrefix, '')

    return {
      ...acc,
      [nextKey]: value,
    }
  }, {})
  return { ...object, [prefix]: group }
}

export default getObjectWithGroupedKeyFromPrefix
