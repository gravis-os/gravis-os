import React, { useState } from 'react'
import { getCoreStorybookTitle } from '../utils/getStorybookTitle'
import Box from './Box'
import Button from './Button'
import Dialog from './Dialog'

/* Constants */
export default {
  title: getCoreStorybookTitle(Dialog.name),
  component: Dialog,
  args: {
    children: 'Label',
  },
}

/* Template */
const Template = (args) => {
  const [open, setOpen] = useState(false)
  const { children } = args
  return (
    <>
      <Button variant="contained" onClick={() => setOpen(true)}>
        Click
      </Button>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <Box p={3}>{children}</Box>
      </Dialog>
    </>
  )
}

/* Variants */
export const Basic = Template.bind({})
Basic.args = {}
