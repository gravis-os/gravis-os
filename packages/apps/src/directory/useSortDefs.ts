import { SortDef } from './types'

export interface UseSortDefsProps {
  sortDefs: SortDef[]
}

export interface UseSortDefsReturn {
  sortDefs: SortDef[]
}

export const useSortDefs = (props: UseSortDefsProps): UseSortDefsReturn => {
  const { sortDefs } = props

  return { sortDefs }
}

export default useSortDefs
