import React from 'react'
import { CrudItem } from '@gravis-os/types'

export interface FilterChip {
  key: string
  value: unknown
  label: React.ReactNode
}

export type FilterDefOptionValue = string | number | boolean

export enum FilterDefTypeEnum {
  Input = 'input',
  Checkbox = 'checkbox',
}

export interface FilterDef {
  key: string
  /**
   * @default 'checkbox'
   */
  type?: FilterDefTypeEnum
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
  options?: Array<{
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

export interface AttributeOption {
  id: number
  title: string
}

export interface Attribute {
  id: number
  title: string
  options: AttributeOption[]
}

export interface AttributeValue {
  id: number
  attribute: Attribute
  attribute_option: AttributeOption
}

export interface Listing extends CrudItem {
  id: number
  attribute_value?: AttributeValue[]
  avatar_src?: string
  avatar_alt?: string
  title: string
  subtitle?: string
  brand: any
  directory_category: {
    directory: any
  }
}

export enum DirectoryVariantEnum {
  Grid = 'grid',
  List = 'list',
}

export enum DirectoryPaginationTypeEnum {
  InfiniteScroll = 'infinite-scroll',
  Pagination = 'pagination',
  LoadMore = 'load-more',
}
