import React, { useState } from 'react'
import startCase from 'lodash/startCase'
import { ChipProps } from '@gravis-os/ui'
import { useRouterQuery } from '@gravis-os/query'
import { FilterChip, FilterDef, FilterDefTypeEnum } from './types'

export interface UseFilterDefsProps {
  filterDefs: FilterDef[]
}

export interface UseFilterDefsReturn {
  filterDefs: FilterDef[]
  filterChips: FilterChip[]
  isFilterDrawerOpen: boolean
  getHasFilterChip: (key: string) => boolean
  handleDeleteFilterChip: (filterChipToDelete: ChipProps) => Promise<boolean>
  handleToggleIsFilterDrawerOpen: () => void
  setFilterDrawerOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export const useFilterDefs = (
  props: UseFilterDefsProps
): UseFilterDefsReturn => {
  const { filterDefs } = props

  // tate
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(true)

  // Router
  const { parsedQs, removeQueryString } = useRouterQuery()

  // Methods
  const getFilterDefByName = (
    filterDefs: FilterDef[],
    name: string
  ): FilterDef => filterDefs?.find((filterDef) => filterDef.name === name)

  const getFilterChipLabel = (
    name: FilterDef['name'],
    parsedQsValue: string
  ) => {
    // Get labelValues from filterDefs
    const getLabelValuesFromFilterDefs = (filterDefs, name, parsedQsValue) => {
      const currentFilterDef = getFilterDefByName(filterDefs, name)
      if (!currentFilterDef) return

      // @example parsedQsValue = 'eq.4'
      const [op, filterValue] = parsedQsValue.split('.')

      switch (currentFilterDef.type) {
        case FilterDefTypeEnum.Input:
          return filterValue.replaceAll('%', '')
        default:
          const currentOption = currentFilterDef.options.find((option) => {
            return Array.isArray(parsedQsValue)
              ? parsedQsValue.includes(String(option.value))
              : filterValue === String(option.value)
          })
          if (!currentOption) return
          return currentOption.label
      }
    }

    const labelValues = Array.isArray(parsedQsValue)
      ? parsedQsValue
          .map((val) => getLabelValuesFromFilterDefs(filterDefs, name, val))
          .filter(Boolean)
          .join(', ')
      : getLabelValuesFromFilterDefs(filterDefs, name, parsedQsValue)

    if (!labelValues) return

    // Display label
    const currentFilterDef = getFilterDefByName(filterDefs, name)
    const displayLabel =
      typeof currentFilterDef.label === 'string'
        ? startCase(currentFilterDef.label)
        : currentFilterDef.label

    return (
      <span>
        <strong>{displayLabel}</strong>: {labelValues}
      </span>
    )
  }
  const getFilterChipsFromQuery = (parsedQs) => {
    return Object.entries(parsedQs)
      .map(([name, value]: [name: string, value: string]) => {
        if (!value) return

        const filterChipLabel = getFilterChipLabel(name, value)
        if (!filterChipLabel) return

        return { key: name, value, label: filterChipLabel }
      })
      .filter(Boolean)
  }

  const filterChips = getFilterChipsFromQuery(parsedQs)

  // Methods
  const handleDeleteFilterChip = (filterChipToDelete: FilterChip) => {
    return removeQueryString(filterChipToDelete.key)
  }
  const getHasFilterChip = (key: string): boolean => {
    return filterChips.some((filterChip) => filterChip.key === key)
  }
  const handleToggleIsFilterDrawerOpen = () =>
    setIsFilterDrawerOpen(!isFilterDrawerOpen)

  const result = {
    filterDefs,
    filterChips,
    isFilterDrawerOpen,
    setFilterDrawerOpen: setIsFilterDrawerOpen,
    getHasFilterChip,
    handleDeleteFilterChip,
    handleToggleIsFilterDrawerOpen,
  }

  return result
}

export default useFilterDefs
