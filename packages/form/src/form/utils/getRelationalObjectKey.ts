import last from 'lodash/last'

// Always returns the singular version of the key
const getRelationalObjectKey = (key: string, keepPrefix: boolean = true) =>
  keepPrefix
    ? key.split('_id')[0]
    : `${(last(key.split('.')) as string).split('_id')[0]}`

export default getRelationalObjectKey
