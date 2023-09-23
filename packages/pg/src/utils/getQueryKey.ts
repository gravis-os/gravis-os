import { ApiRequestQuery } from '../types'

const getQueryKey = (props: { columnKey: string; query: ApiRequestQuery }) => {
  const { columnKey, query } = props
  return Object.keys(query).find((queryKey) => queryKey.startsWith(columnKey))
}

export default getQueryKey
