import React from 'react'
import { useTheme } from '@mui/material/styles'
import { useMediaQuery } from '@mui/material'
import startCase from 'lodash/startCase'
import merge from 'lodash/merge'
import get from 'lodash/get'
import flowRight from 'lodash/flowRight'
import { Stack, Link } from '@gravis-os/ui'
import { StorageAvatarWithUpload } from '@gravis-os/storage'
import { ColDef } from 'ag-grid-community'
import CrudTableActionsColumnCellRenderer from './CrudTableActionsColumnCellRenderer'

// ==============================
// Column Def HOCs (withColumnDefs)
// ==============================
const withTimestampFormat = () => (columnDefs) =>
  columnDefs.map((columnDef) =>
    columnDef.field?.endsWith('_at')
      ? {
          valueFormatter: ({ value }) => new Date(value).toLocaleString(),
          ...columnDef,
        }
      : columnDef
  )
const withHeaderNames = () => (columnDefs) =>
  columnDefs.map((columnDef) => ({
    headerName: columnDef.field && startCase(columnDef.field),
    ...columnDef,
  }))
const withPreview = (props) => {
  const {
    setPreview,
    module: injectedModule,
    previewFormSections: injectedPreviewFormSections,
    disablePreview,
  } = props
  return (columnDefs) => {
    return columnDefs.map((columnDef, i) => {
      const { field, previewFormSections } = columnDef

      // Always set first column as preview column
      const isFirst = i === 0
      const module = isFirst ? injectedModule : columnDef.module
      const hasPreview =
        !disablePreview && (isFirst || (module && previewFormSections))

      // Handle degenerate case
      if (!hasPreview) return columnDef

      // Dynamically calculate relation key to access the relation field
      const getRelationFieldKey = () => {
        const hasRelation = field?.includes('.')
        switch (true) {
          case hasRelation:
            // Return 'id' if current module is a join table
            const isModuleJoinTable = module.table.isJoinTable
            if (isModuleJoinTable) return 'id'

            // Dynamically calculate relation key to access the relation field
            return `${field.split('.').slice(0, -1).join('.')}.${module.sk}`
          default:
            // No relations, so just return the current item's sk
            return module.sk
        }
      }
      const relationFieldKey = getRelationFieldKey()

      // Show preview drawer when clicking on related item
      return {
        ...columnDef,
        cellRenderer: (params) => {
          // Methods
          const handlePreviewClick = async () => {
            const previewSlug = get(params.data, relationFieldKey)
            const previewArgs = {
              module,
              previewSlug,
              previewFormSections,
              columnDef,
            }
            setPreview(previewArgs)
          }

          // Show with avatar if avatar_src is present
          const { hasAvatar } = columnDef

          const linkProps = {
            href: disablePreview
              ? module.route?.plural?.concat(`/${params.data[module.sk]}`) ?? ''
              : null,
            onClick: disablePreview ? null : handlePreviewClick,
            underline: 'hover' as const,
            color: 'inherit',
            pointer: true,
          }

          return (
            <Stack direction="row" alignItems="center" spacing={1}>
              {hasAvatar && (
                <StorageAvatarWithUpload
                  module={module}
                  src={params.data.avatar_src}
                  alt={params.data.avatar_alt || params.data.title}
                  size={32}
                />
              )}
              <Link {...linkProps}>{params.value}</Link>
            </Stack>
          )
        },
      }
    })
  }
}
const withTitle =
  ({ isDesktop, disableTitle }) =>
  (columnDefs) =>
    disableTitle
      ? columnDefs
      : [
          {
            headerName: 'Name',
            minWidth: 160,
            pinned: isDesktop && 'left',
            ...columnDefs[0],
          },
          ...columnDefs.slice(1),
        ]
const withHide =
  ({ user }) =>
  (columnDefs) =>
    columnDefs.map(({ hide, ...rest }) => ({
      ...rest,
      hide: typeof hide === 'function' ? hide({ user }) : hide,
    }))

const useGetCrudTableColumnDefs = (props) => {
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
    user,
  } = props

  // Responsive
  const theme = useTheme()
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'))

  // Column addons
  const nextColumnDefs = React.useMemo(
    () =>
      flowRight([
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
      ])(injectedColumnDefs).filter(({ field }) => field !== 'actions'),
    [
      disablePreview,
      disableTitle,
      injectedColumnDefs,
      isDesktop,
      module,
      previewFormSections,
      setPreview,
      user,
    ]
  )

  // Actions column
  const injectedActionsColumnDef = injectedColumnDefs.find(
    ({ field }) => field === 'actions'
  )
  const hasInjectedActionsColumnDef = Boolean(injectedActionsColumnDef)
  const { renderMoreItems } = injectedActionsColumnDef || {}

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
            disableDelete,
            disableManage,
            renderMoreItems,
          },
        },
        hasInjectedActionsColumnDef ? injectedActionsColumnDef : null
      )

  return [...nextColumnDefs, actionColumnDef].filter(Boolean) as ColDef[]
}

export default useGetCrudTableColumnDefs
