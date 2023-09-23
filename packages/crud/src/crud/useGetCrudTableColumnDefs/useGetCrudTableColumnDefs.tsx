import React from 'react'

import { FormSectionsProps } from '@gravis-os/form'
import { CrudModule } from '@gravis-os/types'
import { useMediaQuery } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { ColDef } from 'ag-grid-community'
import flowRight from 'lodash/flowRight'
import merge from 'lodash/merge'

import { CrudTableColumnDef } from '../../types'
import CrudTableActionsColumnCellRenderer, {
  CrudTableActionsColumnCellRendererProps,
} from '../CrudTableActionsColumnCellRenderer'
import { UsePreviewDrawerReturn } from '../usePreviewDrawer'
import {
  withCheckboxSelection,
  withFallbackPlaceholder,
  withHeaderNames,
  withHide,
  withPreview,
  withTimestampFormat,
  withTitle,
} from './hocs'

export interface UseGetCrudTableColumnDefsProps {
  actionsCellRendererParams?: Partial<
    Omit<CrudTableActionsColumnCellRendererProps, 'data' | 'module'>
  >
  columnDefs?: CrudTableColumnDef[]
  disableActions?: boolean
  disableDelete?: boolean
  disableFallbackPlaceholder?: boolean
  disableManage?: boolean
  disablePreview?: boolean
  disableTitle?: boolean
  fallbackPlaceholder?: React.ReactNode
  module?: CrudModule
  previewFormSections?: FormSectionsProps['sections']
  setPreview?: UsePreviewDrawerReturn['setPreview']
  user?: Record<string, unknown> | any
}

const useGetCrudTableColumnDefs = (
  props: UseGetCrudTableColumnDefsProps
): ColDef[] => {
  const {
    actionsCellRendererParams,
    columnDefs: injectedColumnDefs,
    disableActions,
    disableDelete,
    disableFallbackPlaceholder,
    disableManage,
    disablePreview,
    disableTitle,
    fallbackPlaceholder = '-',
    module,
    previewFormSections,
    setPreview,
    user,
  } = props

  // Responsive
  const theme = useTheme()
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'))

  // Column addons
  const columnDefsUseMemoDeps = [
    disablePreview,
    disableTitle,
    injectedColumnDefs,
    isDesktop,
    module,
    previewFormSections,
    user,
  ]
  const nextColumnDefs = React.useMemo(() => {
    return flowRight([
      withCheckboxSelection(),
      withFallbackPlaceholder({
        disableFallbackPlaceholder,
        fallbackPlaceholder,
      }),
      withTimestampFormat(),
      withPreview({
        disablePreview,
        module,
        previewFormSections,
        setPreview,
      }),
      withHeaderNames(),
      withTitle({ disableTitle, isDesktop }),
      withHide({ user }),
    ])(injectedColumnDefs).filter(({ field }) => field !== 'actions')
  }, columnDefsUseMemoDeps)

  // Actions column
  const injectedActionsColumnDef = injectedColumnDefs.find(
    ({ field }: CrudTableColumnDef) => field === 'actions'
  )
  const hasInjectedActionsColumnDef = Boolean(injectedActionsColumnDef)

  // Merge outer and inner action columns to create a single actions column
  const actionColumnDef = disableActions
    ? null
    : merge(
        {},
        {
          cellRenderer: CrudTableActionsColumnCellRenderer,
          cellRendererParams: {
            disableDelete,
            disableManage,
            disablePreview,
            module,
            previewFormSections,
            setPreview,
            ...actionsCellRendererParams,
          },
          editable: false,
          field: 'actions',
          maxWidth: 100,
          pinned: isDesktop && 'right',
        },
        hasInjectedActionsColumnDef ? injectedActionsColumnDef : null
      )

  return [...nextColumnDefs, actionColumnDef].filter(Boolean) as ColDef[]
}

export default useGetCrudTableColumnDefs
