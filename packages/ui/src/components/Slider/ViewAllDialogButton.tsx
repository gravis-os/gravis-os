import React, { useState } from 'react'
import CollectionsOutlinedIcon from '@mui/icons-material/CollectionsOutlined'
import Button from '../../core/Button'
import Dialog from '../../core/Dialog'
import ImageList, { ImageListProps } from '../ImageList'

export interface ViewAllDialogButtonProps {
  items?: ImageListProps['items']
  open?: boolean
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>
}

const ViewAllDialogButton: React.FC<ViewAllDialogButtonProps> = (props) => {
  const { items, open: injectedOpen = false, setOpen: injectedSetOpen } = props

  // View all
  const [isViewAllOpen, setIsViewAllOpen] = useState(false)
  const open = injectedOpen || isViewAllOpen
  const setOpen = injectedSetOpen || setIsViewAllOpen

  // Degenerate case
  if (!items?.length) return null

  return (
    <>
      <Button
        variant="paper"
        startIcon={<CollectionsOutlinedIcon />}
        onClick={() => setOpen(true)}
        sx={{
          position: 'absolute',
          zIndex: 1,
          right: 0,
          bottom: 0,
          mr: 1,
          mb: 1,
        }}
      >
        View All
      </Button>

      {/* View All Dialog */}
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        fullWidth
        maxWidth="lg"
      >
        <ImageList items={items} />
      </Dialog>
    </>
  )
}

export default ViewAllDialogButton
