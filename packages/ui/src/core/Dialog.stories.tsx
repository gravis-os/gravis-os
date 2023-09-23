import React, { useState } from 'react'

import { getCoreStorybookTitle } from '../utils/getStorybookTitle'
import Box from './Box'
import Button from './Button'
import Dialog from './Dialog'

/* Constants */
export default {
  title: getCoreStorybookTitle(Dialog.name),
  args: {
    children: 'Label',
  },
  component: Dialog,
}

/* Template */
const Template = (args) => {
  const [open, setOpen] = useState(false)
  const { children } = args
  return (
    <>
      <Button onClick={() => setOpen(true)} variant="contained">
        Click
      </Button>
      <Dialog onClose={() => setOpen(false)} open={open}>
        <Box p={3}>{children}</Box>
      </Dialog>
    </>
  )
}

/* Variants */
export const Basic = Template.bind({})
Basic.args = {}
