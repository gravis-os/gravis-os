import type { Pool } from 'pg'

const fetchColumnNamesFromTable = async (props: {
  pool: Pool
  table: string
}) => {
  const { pool, table } = props

  const getColumnNamesQuery = {
    name: `get-column-names-from-${table}`,
    text: `SELECT "column_name" FROM information_schema.columns WHERE table_name = '${table}';`,
  }

  const result = await pool.query(getColumnNamesQuery)
  return result.rows.map((row) => row.column_name)
}

export default fetchColumnNamesFromTable
