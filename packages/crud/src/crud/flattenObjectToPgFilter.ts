import assign from 'lodash/assign'
import get from 'lodash/get'
import isEmpty from 'lodash/isEmpty'
import isObject from 'lodash/isObject'
import reduce from 'lodash/reduce'
import some from 'lodash/some'

const flattenObjectToPgFilter = (obj, parentKey = '', fieldDefs) => {
  return reduce(
    obj,
    (result, value, key) => {
      const newKey = parentKey ? `${parentKey}.${key}` : key

      if (isObject(value) && !isEmpty(value) && !some(value, isObject)) {
        // If the value is an object without nested objects, flatten it
        assign(result, flattenObjectToPgFilter(value, newKey, fieldDefs))
      } else if (value) {
        // value is not nullable
        const op = get(fieldDefs, newKey)?.op ?? 'eq'
        assign(result, { [newKey]: `${op}.${value}` })
      }

      return result
    },
    {}
  )
}

export default flattenObjectToPgFilter
