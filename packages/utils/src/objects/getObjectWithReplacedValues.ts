/**
 * Replace multiple strings with multiple other strings in an object recursively
 * @link https://stackoverflow.com/a/15604206/3532313
 * @param object
 * @param replacementMap
 */
const getObjectWithReplacedValues = (
  object: Record<string, any>,
  replacementMap: Record<string, string>
) => {
  const regex = new RegExp(
    Object.keys(replacementMap)
      .map((key) => `{${key}}`)
      .join('|'),
    'gi'
  )
  const stringifiedObject = JSON.stringify(object)
  const nextObject = JSON.parse(
    stringifiedObject.replace(regex, (matched) => {
      // Remove the enclosing curly braces to access the value
      const nextMatched = matched.slice(1, -1)
      return replacementMap[nextMatched]
    })
  )
  return nextObject
}

export default getObjectWithReplacedValues
