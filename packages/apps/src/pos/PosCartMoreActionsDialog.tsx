import React from 'react'
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

  const [isAddCustomerDialogOpen, setIsAddCustomerDialogOpen] =
    React.useState(false)
  const handleOnClickAddCustomer = () => setIsAddCustomerDialogOpen(true)

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
      action: () => console.log('apply-discount'),
    },
    {
      key: 'add-note',
      label: 'Add Note',
      icon: <MessageOutlinedIcon sx={{ color: 'gray' }} />,
      action: () => console.log('add-note'),
    },
    {
      key: 'add-staff',
      label: 'Add Staff',
      icon: <PersonIcon sx={{ color: 'gray' }} />,
      action: () => console.log('add-staff'),
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
                <IconButton onClick={field.action}>
                  <KeyboardArrowRightOutlinedIcon sx={{ fontSize: 36 }} />
                </IconButton>
              </Stack>
              <Divider />
            </React.Fragment>
          ))}
        </Stack>
        <PosAddCustomerDialog
          open={isAddCustomerDialogOpen}
          onClose={() => setIsAddCustomerDialogOpen(false)}
          {...addCustomerProps}
        />
      </DialogContent>
    </Dialog>
  )
}

export default PosCartMoreActionsDialog
