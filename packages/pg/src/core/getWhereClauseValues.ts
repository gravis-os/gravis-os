import { ApiRequestQuery } from '../types'
import getQueryKey from '../utils/getQueryKey'

const getWhereClauseValues = (props: {
  columnKeys: string[]
  query: ApiRequestQuery
}): any[] => {
  const { columnKeys, query } = props
  return columnKeys
    .map((columnKey) => query[getQueryKey({ columnKey, query })])
    .filter(Boolean)
}

export default getWhereClauseValues
