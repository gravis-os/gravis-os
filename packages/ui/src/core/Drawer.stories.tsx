import React, { useState } from 'react'
import { getCoreStorybookTitle } from '../utils/getStorybookTitle'
import Box from './Box'
import Button from './Button'
import Drawer from './Drawer'

/* Constants */
const anchors = ['left', 'right', 'top', 'bottom']
export default {
  title: getCoreStorybookTitle(Drawer.name),
  component: Drawer,
  args: {
    anchor: 'left',
    children: 'Label',
  },
  argTypes: {
    anchor: {
      options: anchors,
      control: { type: 'select' },
    },
  },
}

/* Template */
const Template = (args) => {
  const { anchor, children } = args
  const [open, setOpen] = useState(false)
  return (
    <>
      <Button variant="contained" onClick={() => setOpen(true)}>
        Click
      </Button>
      <Drawer open={open} anchor={anchor} onClose={() => setOpen(false)}>
        <Box p={3}>{children}</Box>
      </Drawer>
    </>
  )
}

/* Variants */
export const Basic = Template.bind({})
Basic.args = {}
