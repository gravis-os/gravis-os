import { ApiRequestQuery } from '../types'

const getQueryKey = (props: { query: ApiRequestQuery; columnKey: string }) => {
  const { query, columnKey } = props
  return Object.keys(query).find((queryKey) => queryKey.startsWith(columnKey))
}

export default getQueryKey
