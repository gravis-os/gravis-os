import type { Pool } from 'pg'

import fetchColumnNamesFromTable from '../fetchers/fetchColumnNamesFromTable'
import { ApiRequestQuery } from '../types'
import getWhereClauseSql from './getWhereClauseSql'
import getWhereClauseValues from './getWhereClauseValues'

const getDynamicWhereClauseSqlAndValues = async (props: {
  pool: Pool
  query: ApiRequestQuery
  table: string
}) => {
  const { pool, query, table } = props

  const columnKeys = await fetchColumnNamesFromTable({ pool, table })

  const whereClauseSql = getWhereClauseSql({ columnKeys, query })
  const whereClauseValues = getWhereClauseValues({ columnKeys, query })

  return [whereClauseSql, whereClauseValues]
}

export default getDynamicWhereClauseSqlAndValues
