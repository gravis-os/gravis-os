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
        onClick={() => setOpen(true)}
        startIcon={<CollectionsOutlinedIcon />}
        sx={{
          bottom: 0,
          mb: 1,
          mr: 1,
          position: 'absolute',
          right: 0,
          zIndex: 1,
        }}
        variant="paper"
      >
        View All
      </Button>

      {/* View All Dialog */}
      <Dialog
        fullWidth
        maxWidth="lg"
        onClose={() => setOpen(false)}
        open={open}
      >
        <ImageList items={items} />
      </Dialog>
    </>
  )
}

export default ViewAllDialogButton
