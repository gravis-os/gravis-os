import React from 'react'
import { CrudItem } from '@gravis-os/types'

export interface FilterChip {
  key: string
  value: unknown
  label: React.ReactNode
}

export type FilterDefOptionValue = string | number | boolean

export interface FilterDef {
  key: string
  placeholder?: string
  /**
   * The name of the column to filter on
   */
  name: string
  /**
   * The postgrest operator to use
   */
  op: string
  label: React.ReactNode
  /**
   * An array of option values to filter on
   */
  options: Array<{
    key: string
    /**
     * The value to filter on
     */
    value: FilterDefOptionValue
    label: string
  }>
}

export interface SortDef {
  key: string
  value: Record<
    string,
    string | Array<string | string | Record<string, unknown>>
  >
  label: string
}

export interface Listing extends CrudItem {
  avatar_src?: string
  avatar_alt?: string

  brand: any
  directory_category: {
    directory: any
  }
}
