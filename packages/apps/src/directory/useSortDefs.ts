import { useRouterQuery } from '@gravis-os/query'
import { SortDef } from './types'

export interface UseSortDefsProps {
  sortDefs: SortDef[]
}

export interface UseSortDefsReturn {
  sortDefs: SortDef[]
  currentSortDef?: SortDef
  handleSortDefClick: (sortDef: SortDef) => Promise<boolean>
}

export const useSortDefs = (props: UseSortDefsProps): UseSortDefsReturn => {
  const { sortDefs } = props

  const { addQueryString, parsedQs } = useRouterQuery()

  const handleSortDefClick = (sortDef) => {
    const { value } = sortDef
    if (!value) return

    // @example value = { order: ['created_at', { ascending: false }] }
    const [filterKey, filterValue] = Object.entries(value)[0]
    const isAscending =
      Array.isArray(filterValue) && filterValue.length > 1
        ? filterValue[1].ascending
        : true

    const filterColumn = Array.isArray(filterValue)
      ? filterValue[0]
      : filterValue

    // returns order=created_at.desc
    return addQueryString({
      [filterKey]: `${filterColumn}.${isAscending ? 'asc' : 'desc'}`,
    })
  }

  const hasActiveSortDef = Object.keys(parsedQs).includes('order')
  const currentSortDef =
    hasActiveSortDef &&
    sortDefs?.find(
      (sortDef) =>
        sortDef.value.order[0] === String(parsedQs.order).split('.')[0]
    )

  return { currentSortDef, sortDefs, handleSortDefClick }
}

export default useSortDefs
