import React, { useState } from 'react'
import { TextField } from '@gravis-os/fields'
import { Button, Dialog, DialogTitle, Divider } from '@gravis-os/ui'
import { DialogActions, DialogContent, Slide } from '@mui/material'
import { TransitionProps } from '@mui/material/transitions'
import { Stack } from '@mui/system'
import { usePos } from './PosProvider'

export interface PosAddNoteDialogProps {
  open: boolean
  onClose: () => void
  addNoteFields?: React.ReactNode
}

const PosAddNoteDialog: React.FC<PosAddNoteDialogProps> = (props) => {
  const { open, onClose, addNoteFields: injectedAddNoteFields } = props || {}
  const { cart, setCart } = usePos()

  const [note, setNote] = useState<string | null>(cart?.note ?? null)

  const addNoteFieldsJsx = injectedAddNoteFields || (
    <TextField
      label="Note"
      value={note}
      onChange={(e) => setNote(e.target.value)}
      multiline
      minRows={8}
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
      open={open}
      onClose={onClose}
      fullScreen
      TransitionComponent={Slide}
      TransitionProps={{ direction: 'left' } as TransitionProps}
    >
      <DialogTitle>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
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
        <Button variant="contained" onClick={handleOnSaveNote}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default PosAddNoteDialog
