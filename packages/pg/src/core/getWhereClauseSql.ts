import { ApiRequestQuery } from '../types'
import getQueryKey from '../utils/getQueryKey'

const getWhereClauseSql = (props: {
  columnKeys: string[]
  query: ApiRequestQuery
}): string => {
  const { columnKeys, query } = props

  // Remove columnKeys that are not in the query
  const columnKeysThatExistInQuery = columnKeys.filter((columnKey) => {
    const queryKey = getQueryKey({ columnKey, query })
    return queryKey
  })

  const whereArr = columnKeysThatExistInQuery
    .map((columnKey, i) => {
      const queryKey = getQueryKey({ columnKey, query })

      // Key not found in query
      if (!queryKey) return

      const hasOp = queryKey.includes('.')

      const defaultOpValue = `$${i + 1}` // Default to the parameterized value $1, $2, $3, etc

      // Extract the operator from the queryKey
      const op = hasOp ? queryKey.split('.')[1] : '='

      const getOpValueByOp = (op) => {
        switch (op) {
          case 'ilike': {
            // Concatenate % to the value via the || command
            // @link: https://github.com/knex/knex/issues/1207#issuecomment-185079698
            return `'%'||${defaultOpValue}||'%'`
          }
          default: {
            return defaultOpValue
          }
        }
      }

      // Determine the value of the operator
      const opValue = hasOp ? getOpValueByOp(op) : defaultOpValue

      return `${columnKey} ${op} ${opValue}`
    })
    .filter(Boolean)

  // 'WHERE cea_registration_number = $1 AND trans_type = $2'
  return whereArr.length > 0 ? 'WHERE '.concat(whereArr.join(' AND ')) : ''
}

export default getWhereClauseSql
