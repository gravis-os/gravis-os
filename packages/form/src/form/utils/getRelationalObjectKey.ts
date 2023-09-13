import last from 'lodash/last'

// Always returns the singular version of the key
const getRelationalObjectKey = (key) =>
  `${(last(key.split('.')) as string).split('_id')[0]}`

export default getRelationalObjectKey
