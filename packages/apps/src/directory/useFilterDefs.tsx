import React, { useState } from 'react'
import { useRouter, NextRouter } from 'next/router'
import omit from 'lodash/omit'
import startCase from 'lodash/startCase'
import { ChipProps } from '@gravis-os/ui'
import { useRouterQuery } from '@gravis-os/query'
import { FilterChip, FilterDef } from './types'

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
  ): FilterDef => {
    return filterDefs?.find((filterDef) => filterDef.name === name)
  }
  const getFilterChipLabel = (key, value) => {
    const getLabelFromFilterDefs = (
      filterDefs,
      key: string,
      value: string | string[]
    ) => {
      const currentFilterDef = getFilterDefByName(filterDefs, key)
      if (!currentFilterDef) return

      const currentOption = currentFilterDef.options.find((option) =>
        Array.isArray(value)
          ? value.includes(option.value)
          : option.value === value
      )
      if (!currentOption) return

      return currentOption.label
    }

    const labelValues = Array.isArray(value)
      ? value
          .map((val) => getLabelFromFilterDefs(filterDefs, key, val))
          .join(', ')
      : getLabelFromFilterDefs(filterDefs, key, value)

    if (!labelValues) return

    return (
      <span>
        <strong>{startCase(key)}</strong>: {labelValues}
      </span>
    )
  }
  const getFilterChipsFromQuery = (parsedQs) => {
    return Object.entries(parsedQs)
      .map(([key, value]) => {
        if (!value) return

        const filterChipLabel = getFilterChipLabel(key, value)
        if (!filterChipLabel) return

        return {
          label: filterChipLabel,
          key,
          value,
        }
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
