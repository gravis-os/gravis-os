import type { Pool } from 'pg'
import { ApiRequestQuery } from '../types'
import getWhereClauseSql from './getWhereClauseSql'
import getWhereClauseValues from './getWhereClauseValues'
import fetchColumnNamesFromTable from '../fetchers/fetchColumnNamesFromTable'

const getDynamicWhereClauseSqlAndValues = async (props: {
  query: ApiRequestQuery
  table: string
  pool: Pool
}) => {
  const { query, table, pool } = props

  const columnKeys = await fetchColumnNamesFromTable({ table, pool })

  const whereClauseSql = getWhereClauseSql({ query, columnKeys })
  const whereClauseValues = getWhereClauseValues({ query, columnKeys })

  return [whereClauseSql, whereClauseValues]
}

export default getDynamicWhereClauseSqlAndValues
