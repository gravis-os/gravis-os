import React from 'react'
import { useTheme } from '@mui/material/styles'
import { useMediaQuery } from '@mui/material'
import merge from 'lodash/merge'
import flowRight from 'lodash/flowRight'
import { ColDef } from 'ag-grid-community'
import { FormSectionsProps } from '@gravis-os/form'
import { CrudModule } from '@gravis-os/types'
import CrudTableActionsColumnCellRenderer, {
  CrudTableActionsColumnCellRendererProps,
  ManageMode,
} from '../CrudTableActionsColumnCellRenderer'
import {
  withHeaderNames,
  withHide,
  withPreview,
  withTimestampFormat,
  withTitle,
  withFallbackPlaceholder,
  withCheckboxSelection,
} from './hocs'
import { UsePreviewDrawerReturn } from '../usePreviewDrawer'
import { CrudTableColumnDef } from '../../types'

export interface UseGetCrudTableColumnDefsProps {
  columnDefs?: CrudTableColumnDef[]
  module?: CrudModule
  previewFormSections?: FormSectionsProps['sections']
  setPreview?: UsePreviewDrawerReturn['setPreview']
  disableDelete?: boolean
  disableManage?: boolean
  disablePreview?: boolean
  disableTitle?: boolean
  disableActions?: boolean
  disableFallbackPlaceholder?: boolean
  fallbackPlaceholder?: React.ReactNode
  manageMode?: ManageMode
  user?: Record<string, unknown> | any
  actionsCellRendererParams?: Omit<
    CrudTableActionsColumnCellRendererProps,
    'module' | 'data'
  >
}

const useGetCrudTableColumnDefs = (
  props: UseGetCrudTableColumnDefsProps
): ColDef[] => {
  const {
    columnDefs: injectedColumnDefs,
    module,
    previewFormSections,
    setPreview,
    disableDelete,
    disableManage,
    disablePreview,
    disableTitle,
    disableActions,
    disableFallbackPlaceholder,
    fallbackPlaceholder = '-',
    manageMode,
    user,
    actionsCellRendererParams,
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
        fallbackPlaceholder,
        disableFallbackPlaceholder,
      }),
      withTimestampFormat(),
      withPreview({
        setPreview,
        module,
        previewFormSections,
        disablePreview,
      }),
      withHeaderNames(),
      withTitle({ isDesktop, disableTitle }),
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
          field: 'actions',
          pinned: isDesktop && 'right',
          editable: false,
          maxWidth: 100,
          cellRenderer: CrudTableActionsColumnCellRenderer,
          cellRendererParams: {
            module,
            manageMode,
            disableDelete,
            disableManage,
            disablePreview,
            previewFormSections,
            setPreview,
            ...actionsCellRendererParams,
          },
        },
        hasInjectedActionsColumnDef ? injectedActionsColumnDef : null
      )

  return [...nextColumnDefs, actionColumnDef].filter(Boolean) as ColDef[]
}

export default useGetCrudTableColumnDefs
