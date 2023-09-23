import React, { useState } from 'react'

import startCase from 'lodash/startCase'

import useRouterQuery from './useRouterQuery'

export interface FilterChip {
  key: string
  label: React.ReactNode
  value: unknown
}

export type FilterDefOptionValue = boolean | number | string

export enum FilterDefTypeEnum {
  Checkbox = 'checkbox',
  Input = 'input',
}

export interface FilterDef {
  key: string
  label: React.ReactNode
  /**
   * The name of the column to filter on
   */
  name: string
  /**
   * The postgrest operator to use
   */
  op: string
  /**
   * An array of option values to filter on
   */
  options?: Array<{
    key: string
    label: string
    /**
     * The value to filter on
     */
    value: FilterDefOptionValue
  }>
  placeholder?: string
  /**
   * @default 'checkbox'
   */
  type?: FilterDefTypeEnum
}

export interface UseFilterDefsProps {
  filterDefs: FilterDef[]
}

export interface UseFilterDefsReturn {
  filterChips: FilterChip[]
  filterDefs: FilterDef[]
  getHasFilterChip: (key: string) => boolean
  handleDeleteFilterChip: (filterChipToDelete: FilterChip) => Promise<boolean>
  handleToggleIsFilterDrawerOpen: () => void
  isFilterDrawerOpen: boolean
  setFilterDrawerOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const getFilterDefByName = (filterDefs: FilterDef[], name: string): FilterDef =>
  filterDefs?.find((filterDef) => filterDef.name === name)

export const useFilterDefs = (
  props: UseFilterDefsProps
): UseFilterDefsReturn => {
  const { filterDefs: injectedFilterDefs } = props

  const filterDefs = injectedFilterDefs.filter(Boolean)

  // State
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(true)

  // Router
  const { parsedQs, removeQueryString } = useRouterQuery()

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

      if (!filterValue) return

      switch (currentFilterDef.type) {
        case FilterDefTypeEnum.Input: {
          return filterValue?.replaceAll('%', '')
        }
        default: {
          const currentOption = currentFilterDef.options.find((option) => {
            return Array.isArray(parsedQsValue)
              ? parsedQsValue.includes(String(option.value))
              : filterValue === String(option.value)
          })
          if (!currentOption) return
          return currentOption.label
        }
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

        return { key: name, label: filterChipLabel, value }
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

  return {
    filterChips,
    filterDefs,
    getHasFilterChip,
    handleDeleteFilterChip,
    handleToggleIsFilterDrawerOpen,
    isFilterDrawerOpen,
    setFilterDrawerOpen: setIsFilterDrawerOpen,
  }
}

export default useFilterDefs
