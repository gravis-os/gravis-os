import React, { useState } from 'react'
import {
  DialogActions,
  DialogTitle,
  DialogContent,
  DialogContentText,
} from '@mui/material'
import { supabaseClient } from '@supabase/auth-helpers-nextjs'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined'
import ArrowCircleRightOutlinedIcon from '@mui/icons-material/ArrowCircleRightOutlined'
import { useQueryClient } from 'react-query'
import {
  Stack,
  Dialog,
  Button,
  IconButton,
  MoreIconButton,
  MoreIconButtonProps,
} from '@gravis-os/ui'
import toast from 'react-hot-toast'
import { CrudItem, CrudModule } from '@gravis-os/types'
import getCrudItemHref from './getCrudItemHref'

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
  afterDelete?: ({ data }: { data: CrudItem | any }) => Promise<void>
  renderMoreItems?: RenderMoreItemsFunction<CrudItem>
  children?: React.ReactNode
}

const CrudTableActionsColumnCellRenderer: React.FC<
  CrudTableActionsColumnCellRendererProps
> = (props) => {
  const {
    module,
    data,
    disableDelete,
    afterDelete,
    disableManage,
    renderMoreItems,
    children,
  } = props
  const { table } = module

  // Query
  const queryClient = useQueryClient()

  // Delete Dialog
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const handleDeleteDialogOpen = () => setDeleteDialogOpen(true)
  const handleDeleteDialogClose = () => setDeleteDialogOpen(false)
  const handleDeleteClick = () => handleDeleteDialogOpen()
  const handleDeleteConfirmClick = async () => {
    try {
      await supabaseClient.from(table.name).delete().match({ id: data.id })
      queryClient.invalidateQueries(table.name)
      if (afterDelete) await afterDelete({ data })
      handleDeleteDialogClose()
      toast.success('Success')
    } catch (err) {
      toast.error('Error')
      console.error('Error caught:', err)
    }
  }

  // MoreItems
  const moreItems = [
    ...(renderMoreItems ? renderMoreItems({ data }) : []),
    !disableDelete && {
      key: 'delete',
      value: 'delete',
      label: 'Delete',
      icon: <DeleteOutlineOutlinedIcon fontSize="small" />,
      onClick: handleDeleteClick,
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
          href={getCrudItemHref({ module, item: data })}
          sx={{ '&:hover': { color: 'primary.main' } }}
          tooltip="Manage"
        >
          <ArrowCircleRightOutlinedIcon fontSize="small" />
        </IconButton>
      )}

      {/* Delete */}
      {!disableDelete && (
        <>
          {/* Delete Dialog */}
          <Dialog open={deleteDialogOpen} onClose={handleDeleteDialogClose}>
            <DialogTitle>Delete Confirmation</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Are you sure you want to delete this item?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleDeleteDialogClose}>Cancel</Button>
              <Button onClick={handleDeleteConfirmClick} autoFocus>
                Confirm
              </Button>
            </DialogActions>
          </Dialog>
        </>
      )}

      {children}

      {/* More */}
      <MoreIconButton size="small" items={moreItems} />
    </Stack>
  )
}

export default CrudTableActionsColumnCellRenderer
