import React from 'react'
import { useTheme } from '@mui/material/styles'
import { useMediaQuery } from '@mui/material'
import startCase from 'lodash/startCase'
import get from 'lodash/get'
import flowRight from 'lodash/flowRight'
import { Stack, Link } from '@gravis-os/ui'
import { StorageAvatarWithUpload } from '@gravis-os/storage'
import CrudTableActionsColumnCellRenderer from './CrudTableActionsColumnCellRenderer'

// ==============================
// Column Def HOCs (withColumnDefs)
// ==============================
const withTimestampFormat = () => columnDefs =>
  columnDefs.map(columnDef =>
    columnDef.field.endsWith('_at')
      ? {
          valueFormatter: ({ value }) => new Date(value).toLocaleString(),
          ...columnDef,
        }
      : columnDef
  )
const withHeaderNames = () => columnDefs =>
  columnDefs.map(columnDef => ({
    headerName: startCase(columnDef.field),
    ...columnDef,
  }))
const withPreview =
  ({
    setPreview,
    module: injectedModule,
    previewFormSections: injectedPreviewFormSections,
  }) =>
  columnDefs =>
    columnDefs.map((columnDef, i) => {
      const { field } = columnDef

      // Always set first column as preview column
      const isFirst = i === 0
      const module = isFirst ? injectedModule : columnDef.module
      const previewFormSections =
        columnDef.previewFormSections ||
        (isFirst && injectedPreviewFormSections)
      const hasPreview = isFirst || (module && previewFormSections)
      if (!hasPreview) return columnDef

      // Dynamically calculate relation key to access the relation field
      const getRelationFieldKey = () => {
        const hasRelation = field.includes('.')
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
        cellRenderer: params => {
          // Methods
          const handlePreviewClick = async () => {
            const previewSlug = get(params.data, relationFieldKey)
            const previewArgs = { module, previewSlug, previewFormSections }
            setPreview(previewArgs)
          }

          // Show with avatar if avatar_src is present
          const { hasAvatar } = columnDef

          return (
            <Stack direction="row" alignItems="center" spacing={1}>
              {hasAvatar && (
                <StorageAvatarWithUpload
                  module={module}
                  src={params.data.avatar_src}
                  size={32}
                />
              )}
              <Link color="inherit" onClick={handlePreviewClick} pointer>
                {params.value}
              </Link>
            </Stack>
          )
        },
      }
    })
const withTitle =
  ({ isDesktop }) =>
  columnDefs =>
    [
      {
        headerName: 'Name',
        minWidth: 160,
        pinned: isDesktop && 'left',
        ...columnDefs[0],
      },
      ...columnDefs.slice(1),
    ]

const getCrudTableColumnDefs = args => {
  const {
    columnDefs: injectedColumnDefs,
    module,
    previewFormSections,
    setPreview,
    disableDelete,
    disableManage,
  } = args

  // Responsive
  const theme = useTheme()
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'))

  // Column addons
  const nextColumnDefs = React.useMemo(
    () =>
      flowRight([
        withTimestampFormat(),
        withPreview({ setPreview, module, previewFormSections }),
        withHeaderNames(),
        withTitle({ isDesktop }),
      ])(injectedColumnDefs),
    [injectedColumnDefs, isDesktop, module, previewFormSections]
  )

  return [
    ...(nextColumnDefs as any),
    {
      field: 'actions',
      pinned: isDesktop && 'right',
      minWidth: 160,
      editable: false,
      cellRenderer: CrudTableActionsColumnCellRenderer,
      cellRendererParams: { module, disableDelete, disableManage },
    },
  ].filter(Boolean)
}

export default getCrudTableColumnDefs
