import React, { useState } from 'react'

import { TextField } from '@gravis-os/fields'
import { Button, Dialog, DialogTitle, Divider, Stack } from '@gravis-os/ui'
import { DialogActions, DialogContent, Slide } from '@mui/material'
import { TransitionProps } from '@mui/material/transitions'

import { usePos } from './PosProvider'

export interface PosAddNoteDialogProps {
  addNoteFields?: React.ReactNode
  onClose: VoidFunction
  open: boolean
}

const PosAddNoteDialog: React.FC<PosAddNoteDialogProps> = (props) => {
  const { addNoteFields: injectedAddNoteFields, onClose, open } = props || {}
  const { cart, setCart } = usePos()

  const [note, setNote] = useState<null | string>(cart?.note ?? null)

  const addNoteFieldsJsx = injectedAddNoteFields || (
    <TextField
      label="Note"
      minRows={8}
      multiline
      onChange={(e) => setNote(e.target.value)}
      value={note}
    />
  )

  const handleOnSaveNote = () => {
    setCart({
      ...cart,
      note,
    })
    onClose()
  }

  return (
    <Dialog
      TransitionComponent={Slide}
      TransitionProps={{ direction: 'left' } as TransitionProps}
      fullScreen
      onClose={onClose}
      open={open}
    >
      <DialogTitle>
        <Stack
          alignItems="center"
          direction="row"
          justifyContent="space-between"
        >
          Add Note
        </Stack>
      </DialogTitle>
      <Divider />
      <DialogContent sx={{ pt: 2 }}>
        <Stack spacing={3}>{addNoteFieldsJsx}</Stack>
      </DialogContent>
      <Divider />
      <DialogActions>
        <Button onClick={handleOnSaveNote} variant="contained">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default PosAddNoteDialog
