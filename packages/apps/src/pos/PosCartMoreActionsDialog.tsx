import React, { useState } from 'react'

import {
  Dialog,
  DialogTitle,
  Divider,
  IconButton,
  Stack,
  Typography,
} from '@gravis-os/ui'
import KeyboardArrowRightOutlinedIcon from '@mui/icons-material/KeyboardArrowRightOutlined'
import MessageOutlinedIcon from '@mui/icons-material/MessageOutlined'
import PeopleIcon from '@mui/icons-material/People'
import PercentOutlinedIcon from '@mui/icons-material/PercentOutlined'
import PersonIcon from '@mui/icons-material/Person'
import { DialogContent, Slide } from '@mui/material'
import { TransitionProps } from '@mui/material/transitions'

import PosAddCustomerDialog from './PosAddCustomerDialog'
import PosAddNoteDialog from './PosAddNoteDialog'

export interface PosCartMoreActionsDialogProps {
  addCustomerProps?: Record<string, any>
  onClose: VoidFunction
  open: boolean
}

const PosCartMoreActionsDialog: React.FC<PosCartMoreActionsDialogProps> = (
  props
) => {
  const { addCustomerProps, onClose, open } = props

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
      action: handleOnClickAddCustomer,
      icon: <PeopleIcon sx={{ color: 'gray' }} />,
      key: 'add-customer',
      label: 'Add Customer',
    },
    {
      icon: <PercentOutlinedIcon sx={{ color: 'gray' }} />,
      key: 'apply-discount',
      label: 'Apply Discount',
    },
    {
      action: handleOnClickAddNote,
      icon: <MessageOutlinedIcon sx={{ color: 'gray' }} />,
      key: 'add-note',
      label: 'Add Note',
    },
    {
      icon: <PersonIcon sx={{ color: 'gray' }} />,
      key: 'add-staff',
      label: 'Add Staff',
    },
  ]

  return (
    <Dialog
      TransitionComponent={Slide}
      TransitionProps={{ direction: 'up' } as TransitionProps}
      fullScreen
      onClose={handleClose}
      open={open}
    >
      <DialogTitle>
        <Stack
          alignItems="center"
          direction="row"
          justifyContent="space-between"
        >
          More Actions
        </Stack>
      </DialogTitle>
      <Divider />
      <DialogContent sx={{ pt: 4 }}>
        <Typography
          fontSize={16}
          sx={{ color: 'text.secondary' }}
          variant="overline"
        >
          Cart Modifiers
        </Typography>
        <Stack mt={2} spacing={1}>
          {cartModifierOptions.map((field) => (
            <React.Fragment key={field.key}>
              <Stack
                alignItems="center"
                direction="row"
                justifyContent="space-between"
              >
                <Stack alignItems="center" direction="row" spacing={2}>
                  {field.icon}
                  <Typography fontSize={18} variant="h1">
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
          onClose={() => setIsAddCustomerDialogOpen(false)}
          open={isAddCustomerDialogOpen}
          {...addCustomerProps}
        />
        <PosAddNoteDialog
          onClose={() => setIsAddNoteDialogOpen(false)}
          open={isAddNoteDialogOpen}
        />
      </DialogContent>
    </Dialog>
  )
}

export default PosCartMoreActionsDialog
