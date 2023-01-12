import React from 'react'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined'
import ArrowCircleRightOutlinedIcon from '@mui/icons-material/ArrowCircleRightOutlined'
import {
  IconButton,
  MoreIconButton,
  MoreIconButtonProps,
  Stack,
} from '@gravis-os/ui'
import { CrudItem, CrudModule } from '@gravis-os/types'
import { ICellRendererParams } from 'ag-grid-community'
import get from 'lodash/get'
import { FormSectionsProps } from '@gravis-os/form'
import getCrudItemHref from './getCrudItemHref'
import useCrud from './useCrud'
import { UsePreviewDrawerReturn } from './usePreviewDrawer'
import getRelationFieldKey from '../utils/getRelationFieldKey'

export type ManageMode = 'redirect' | 'preview'

type RenderMoreItemsFunction<CrudItem> = ({
  data,
}: {
  data: CrudItem
}) => MoreIconButtonProps['items']

export interface CrudTableActionsColumnCellRendererProps
  extends ICellRendererParams {
  module: CrudModule
  data: CrudItem
  manageMode?: ManageMode
  disablePreview?: boolean
  disableManage?: boolean
  disableDelete?: boolean
  renderMoreItems?: RenderMoreItemsFunction<CrudItem>
  children?: React.ReactNode
  previewFormSections?: FormSectionsProps['sections']
  setPreview?: UsePreviewDrawerReturn['setPreview']
  afterDelete?: ({ data }: { data: CrudItem | any }) => Promise<void>
}

const CrudTableActionsColumnCellRenderer: React.FC<
  CrudTableActionsColumnCellRendererProps
> = (props) => {
  const {
    module,
    data: item,
    colDef,
    manageMode = 'redirect',
    disablePreview,
    disableDelete,
    disableManage,
    renderMoreItems,
    children,
    previewFormSections,
    setPreview,
    afterDelete,
  } = props
  const { field } = colDef

  // Delete Dialog
  const { handleDeleteDialogOpen, setSelectedItems } = useCrud()

  // MoreItems
  const moreItems = [
    ...(renderMoreItems ? renderMoreItems({ data: item }) : []),
    !disableDelete && {
      key: 'delete',
      value: 'delete',
      label: 'Delete',
      icon: <DeleteOutlineOutlinedIcon fontSize="small" />,
      onClick: () => {
        setSelectedItems([item])
        handleDeleteDialogOpen()
      },
    },
  ].filter(Boolean)

  const relationFieldKey = getRelationFieldKey({ field, module })
  const handlePreviewClick = async () => {
    const previewSlug = get(item, relationFieldKey)
    const previewArgs = {
      module,
      previewSlug,
      previewFormSections,
      columnDef: colDef,
    }
    setPreview?.(previewArgs)
  }

  const manageButtonProps = {
    size: 'small' as const,
    tooltip: 'Manage',
    href: manageMode === 'redirect' ? getCrudItemHref({ module, item }) : null,
    onClick:
      manageMode === 'preview' && !disablePreview ? handlePreviewClick : null,
    sx: { '&:hover': { color: 'primary.main' } },
  }

  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="flex-start"
      spacing={1}
      sx={{ pr: 2 }}
    >
      {/* Manage */}
      {!disableManage && (
        <IconButton {...manageButtonProps}>
          <ArrowCircleRightOutlinedIcon fontSize="small" />
        </IconButton>
      )}

      {children}

      {/* More */}
      <MoreIconButton size="small" items={moreItems} />
    </Stack>
  )
}

export default CrudTableActionsColumnCellRenderer
