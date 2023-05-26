import React, { useState } from 'react'
import {
  Dialog,
  DialogTitle,
  Divider,
  IconButton,
  Typography,
} from '@gravis-os/ui'
import KeyboardArrowRightOutlinedIcon from '@mui/icons-material/KeyboardArrowRightOutlined'
import MessageOutlinedIcon from '@mui/icons-material/MessageOutlined'
import PeopleIcon from '@mui/icons-material/People'
import PercentOutlinedIcon from '@mui/icons-material/PercentOutlined'
import PersonIcon from '@mui/icons-material/Person'
import { DialogContent, Slide } from '@mui/material'
import { TransitionProps } from '@mui/material/transitions'
import { Stack } from '@mui/system'
import PosAddCustomerDialog from './PosAddCustomerDialog'
import PosAddNoteDialog from './PosAddNoteDialog'

export interface PosCartMoreActionsDialogProps {
  open: boolean
  onClose: () => void
  addCustomerProps?: any
}

const PosCartMoreActionsDialog: React.FC<PosCartMoreActionsDialogProps> = (
  props
) => {
  const { open, onClose, addCustomerProps } = props

  const handleClose = () => {
    onClose()
  }

  // Add Customer States
  const [isAddCustomerDialogOpen, setIsAddCustomerDialogOpen] = useState(false)
  const handleOnClickAddCustomer = () => setIsAddCustomerDialogOpen(true)

  // Add Note States
  const [isAddNoteDialogOpen, setIsAddNoteDialogOpen] = useState(false)
  const handleOnClickAddNote = () => setIsAddNoteDialogOpen(true)

  const cartModifierOptions = [
    {
      key: 'add-customer',
      label: 'Add Customer',
      icon: <PeopleIcon sx={{ color: 'gray' }} />,
      action: handleOnClickAddCustomer,
    },
    {
      key: 'apply-discount',
      label: 'Apply Discount',
      icon: <PercentOutlinedIcon sx={{ color: 'gray' }} />,
    },
    {
      key: 'add-note',
      label: 'Add Note',
      icon: <MessageOutlinedIcon sx={{ color: 'gray' }} />,
      action: handleOnClickAddNote,
    },
    {
      key: 'add-staff',
      label: 'Add Staff',
      icon: <PersonIcon sx={{ color: 'gray' }} />,
    },
  ]

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullScreen
      TransitionComponent={Slide}
      TransitionProps={{ direction: 'up' } as TransitionProps}
    >
      <DialogTitle>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          More Actions
        </Stack>
      </DialogTitle>
      <Divider />
      <DialogContent sx={{ pt: 4 }}>
        <Typography
          variant="overline"
          fontSize={16}
          sx={{ color: 'text.secondary' }}
        >
          Cart Modifiers
        </Typography>
        <Stack spacing={1} mt={2}>
          {cartModifierOptions.map((field) => (
            <React.Fragment key={field.key}>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Stack direction="row" spacing={2} alignItems="center">
                  {field.icon}
                  <Typography variant="h1" fontSize={18}>
                    {field.label}
                  </Typography>
                </Stack>
                <IconButton onClick={field?.action}>
                  <KeyboardArrowRightOutlinedIcon sx={{ fontSize: 36 }} />
                </IconButton>
              </Stack>
              <Divider />
            </React.Fragment>
          ))}
        </Stack>

        {/* Action dialogs */}
        <PosAddCustomerDialog
          open={isAddCustomerDialogOpen}
          onClose={() => setIsAddCustomerDialogOpen(false)}
          {...addCustomerProps}
        />
        <PosAddNoteDialog
          open={isAddNoteDialogOpen}
          onClose={() => setIsAddNoteDialogOpen(false)}
        />
      </DialogContent>
    </Dialog>
  )
}

export default PosCartMoreActionsDialog
