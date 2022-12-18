import { ApiRequestQuery } from '../types'
import getQueryKey from '../utils/getQueryKey'

const getWhereClauseValues = (props: {
  query: ApiRequestQuery
  columnKeys: string[]
}): any[] => {
  const { query, columnKeys } = props
  return columnKeys
    .map((columnKey) => query[getQueryKey({ query, columnKey })])
    .filter(Boolean)
}

export default getWhereClauseValues
