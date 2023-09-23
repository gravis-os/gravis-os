import React from 'react'

import { FormSectionsProps } from '@gravis-os/form'
import { CrudItem, CrudModule } from '@gravis-os/types'
import {
  IconButton,
  MoreIconButton,
  MoreIconButtonProps,
  Stack,
} from '@gravis-os/ui'
import ArrowCircleRightOutlinedIcon from '@mui/icons-material/ArrowCircleRightOutlined'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined'
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined'
import { ICellRendererParams } from 'ag-grid-community'

import getCrudItemHref, { GetCrudItemHrefParams } from './getCrudItemHref'
import useCrud from './useCrud'
import { handlePreview } from './useGetCrudTableColumnDefs/hocs/withPreview'
import { UsePreviewDrawerReturn } from './usePreviewDrawer'

type RenderMoreItemsFunction<CrudItem> = ({
  data,
}: {
  data: CrudItem
}) => MoreIconButtonProps['items']

export interface CrudTableActionsColumnCellRendererProps
  extends ICellRendererParams {
  afterDelete?: ({ data }: { data: CrudItem | any }) => Promise<void>
  children?: React.ReactNode
  data: CrudItem
  disableDelete?: boolean
  disableManage?: boolean
  disablePreview?: boolean
  getCrudItemHref?: ({ item, module }: GetCrudItemHrefParams) => string
  module: CrudModule
  previewFormSections?: FormSectionsProps['sections']
  renderMoreItems?: RenderMoreItemsFunction<CrudItem>
  setPreview?: UsePreviewDrawerReturn['setPreview']
}

const CrudTableActionsColumnCellRenderer: React.FC<
  CrudTableActionsColumnCellRendererProps
> = (props) => {
  const {
    afterDelete,
    children,
    data: item,
    disableDelete,
    disableManage,
    disablePreview,
    getCrudItemHref: injectedGetCrudItemHref,
    module,
    node,
    previewFormSections,
    renderMoreItems,
    setPreview,
  } = props

  // Delete Dialog
  const { handleDeleteDialogOpen, setSelectedItems } = useCrud()

  // MoreItems
  const moreItems = [
    ...(renderMoreItems ? renderMoreItems({ data: item }) : []),
    !disablePreview && {
      icon: <VisibilityOutlinedIcon fontSize="small" />,
      key: 'preview',
      label: 'Preview',
      onClick: () =>
        handlePreview({
          module,
          params: props,
          previewFormSections,
          setPreview,
        }),
      value: 'preview',
    },
    !disableDelete && {
      icon: <DeleteOutlineOutlinedIcon fontSize="small" />,
      key: 'delete',
      label: 'Delete',
      onClick: () => {
        setSelectedItems([item])
        handleDeleteDialogOpen()
      },
      value: 'delete',
    },
  ].filter(Boolean)

  if (node?.footer) return null

  return (
    <Stack
      alignItems="center"
      direction="row"
      justifyContent="flex-start"
      spacing={1}
      sx={{ pr: 2 }}
    >
      {/* Manage */}
      {!disableManage && (
        <IconButton
          href={(injectedGetCrudItemHref || getCrudItemHref)({ item, module })}
          size="small"
          sx={{ '&:hover': { color: 'primary.main' } }}
          tooltip="Manage"
        >
          <ArrowCircleRightOutlinedIcon fontSize="small" />
        </IconButton>
      )}

      {children}

      {/* More */}
      <MoreIconButton items={moreItems} size="small" />
    </Stack>
  )
}

export default CrudTableActionsColumnCellRenderer
