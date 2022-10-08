import React from 'react'
import { CrudItem } from '@gravis-os/types'

export interface FilterChip {
  key: string
  value: unknown
  label: React.ReactNode
}

export interface FilterDef {
  key: string
  name: string
  label?: React.ReactNode
  placeholder?: string
  options: Array<{
    key: string
    label: string
    value: string
    children?: React.ReactNode
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
