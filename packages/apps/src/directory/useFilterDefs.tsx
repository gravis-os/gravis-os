import React, { useState } from 'react'
import { useRouter, NextRouter } from 'next/router'
import omit from 'lodash/omit'
import startCase from 'lodash/startCase'
import { ChipProps } from '@gravis-os/ui'
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
}

export const useFilterDefs = (
  props: UseFilterDefsProps
): UseFilterDefsReturn => {
  const { filterDefs } = props

  // tate
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(true)

  // Router
  const router = useRouter()
  const { pathname, asPath, query } = router

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
  const getFilterChipsFromQuery = (query: NextRouter['query']) => {
    return Object.entries(query)
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

  const filterChips = getFilterChipsFromQuery(query)

  // Methods
  const handleDeleteFilterChip = (filterChipToDelete: ChipProps) => {
    console.log('jjj: handleDeleteFilterChip', {
      filterChipToDelete,
      pathname,
      asPath,
      query,
      router,
    })
    return router.push(
      {
        pathname,
        query: omit(query, filterChipToDelete.key),
      },
      asPath,
      { scroll: false }
    )
  }
  const getHasFilterChip = (key: string): boolean => {
    return filterChips.some((filterChip) => filterChip.key === key)
  }
  const handleToggleIsFilterDrawerOpen = () =>
    setIsFilterDrawerOpen(!isFilterDrawerOpen)

  return {
    filterDefs,
    filterChips,
    isFilterDrawerOpen,
    getHasFilterChip,
    handleDeleteFilterChip,
    handleToggleIsFilterDrawerOpen,
  }
}

export default useFilterDefs
