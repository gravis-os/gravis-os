import getPersonRelationsFromPerson from './getPersonRelationsFromPerson'

const getPersonRelationsFromDbUser = (dbUser) => {
  const person = dbUser?.person?.[0] || {}
  return getPersonRelationsFromPerson(person)
}

export default getPersonRelationsFromDbUser
