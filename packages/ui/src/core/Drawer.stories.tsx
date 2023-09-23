import React, { useState } from 'react'

import { getCoreStorybookTitle } from '../utils/getStorybookTitle'
import Box from './Box'
import Button from './Button'
import Drawer from './Drawer'

/* Constants */
const anchors = ['left', 'right', 'top', 'bottom']
export default {
  title: getCoreStorybookTitle(Drawer.name),
  args: {
    anchor: 'left',
    children: 'Label',
  },
  argTypes: {
    anchor: {
      control: { type: 'select' },
      options: anchors,
    },
  },
  component: Drawer,
}

/* Template */
const Template = (args) => {
  const { anchor, children } = args
  const [open, setOpen] = useState(false)
  return (
    <>
      <Button onClick={() => setOpen(true)} variant="contained">
        Click
      </Button>
      <Drawer anchor={anchor} onClose={() => setOpen(false)} open={open}>
        <Box p={3}>{children}</Box>
      </Drawer>
    </>
  )
}

/* Variants */
export const Basic = Template.bind({})
Basic.args = {}
