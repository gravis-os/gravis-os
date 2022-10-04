import React from 'react'
import { CrudItem } from '@gravis-os/types'

export interface FilterChip {
  key: string
  value: string | string[]
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

// @link https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/react-infinite-scroller/index.d.ts
export interface InfiniteScrollProps {
  element?: React.ReactElement | any // Fix issue with TS
  hasMore?: boolean | undefined
  initialLoad?: boolean | undefined
  isReverse?: boolean | undefined
  loadMore(page: number): void
  pageStart?: number | undefined
  threshold?: number | undefined
  useCapture?: boolean | undefined
  useWindow?: boolean | undefined
  loader?: React.ReactElement | undefined
  getScrollParent?(): HTMLElement | null
}

export interface Listing extends CrudItem {
  avatar_src?: string
  avatar_alt?: string

  brand: any
  directory_category: {
    directory: any
  }
}
