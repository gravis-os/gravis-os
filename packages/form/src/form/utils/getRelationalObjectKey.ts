// Always returns the singular version of the key
const getRelationalObjectKey = (key) => `${key.split('_id')[0]}`

export default getRelationalObjectKey
