import React from 'react'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined'
import ArrowCircleRightOutlinedIcon from '@mui/icons-material/ArrowCircleRightOutlined'
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined'
import {
  IconButton,
  MoreIconButton,
  MoreIconButtonProps,
  Stack,
} from '@gravis-os/ui'
import { CrudItem, CrudModule } from '@gravis-os/types'
import { FormSectionsProps } from '@gravis-os/form'
import { ICellRendererParams } from 'ag-grid-community'
import getCrudItemHref, { GetCrudItemHrefParams } from './getCrudItemHref'
import useCrud from './useCrud'
import { UsePreviewDrawerReturn } from './usePreviewDrawer'
import { handlePreview } from './useGetCrudTableColumnDefs/hocs/withPreview'

type RenderMoreItemsFunction<CrudItem> = ({
  data,
}: {
  data: CrudItem
}) => MoreIconButtonProps['items']

export interface CrudTableActionsColumnCellRendererProps
  extends ICellRendererParams {
  module: CrudModule
  data: CrudItem
  disableManage?: boolean
  disableDelete?: boolean
  disablePreview?: boolean
  previewFormSections?: FormSectionsProps['sections']
  setPreview?: UsePreviewDrawerReturn['setPreview']
  renderMoreItems?: RenderMoreItemsFunction<CrudItem>
  children?: React.ReactNode
  afterDelete?: ({ data }: { data: CrudItem | any }) => Promise<void>
  getCrudItemHref?: ({ module, item }: GetCrudItemHrefParams) => string
}

const CrudTableActionsColumnCellRenderer: React.FC<
  CrudTableActionsColumnCellRendererProps
> = (props) => {
  const {
    node,
    module,
    data: item,
    disableDelete,
    disableManage,
    disablePreview,
    previewFormSections,
    setPreview,
    renderMoreItems,
    children,
    afterDelete,
    getCrudItemHref: injectedGetCrudItemHref,
  } = props

  // Delete Dialog
  const { handleDeleteDialogOpen, setSelectedItems } = useCrud()

  // MoreItems
  const moreItems = [
    ...(renderMoreItems ? renderMoreItems({ data: item }) : []),
    !disablePreview && {
      key: 'preview',
      value: 'preview',
      label: 'Preview',
      icon: <VisibilityOutlinedIcon fontSize="small" />,
      onClick: () =>
        handlePreview({
          module,
          previewFormSections,
          setPreview,
          params: props,
        }),
    },
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

  if (node?.footer) return null

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
        <IconButton
          size="small"
          href={(injectedGetCrudItemHref || getCrudItemHref)({ module, item })}
          sx={{ '&:hover': { color: 'primary.main' } }}
          tooltip="Manage"
        >
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
