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
import getCrudItemHref from './getCrudItemHref'
import useCrud from './useCrud'

type RenderMoreItemsFunction<CrudItem> = ({
  data,
}: {
  data: CrudItem
}) => MoreIconButtonProps['items']

export interface CrudTableActionsColumnCellRendererProps {
  module: CrudModule
  data: CrudItem
  disableManage?: boolean
  disableDelete?: boolean
  renderMoreItems?: RenderMoreItemsFunction<CrudItem>
  children?: React.ReactNode
  afterDelete?: ({ data }: { data: CrudItem | any }) => Promise<void>
}

const CrudTableActionsColumnCellRenderer: React.FC<
  CrudTableActionsColumnCellRendererProps
> = (props) => {
  const {
    module,
    data: item,
    disableDelete,
    disableManage,
    renderMoreItems,
    children,
    afterDelete,
  } = props

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
          href={getCrudItemHref({ module, item })}
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
