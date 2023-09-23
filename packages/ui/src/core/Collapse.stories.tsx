import React, { useState } from 'react'

import { getCoreStorybookTitle } from '../utils/getStorybookTitle'
import Box from './Box'
import Button from './Button'
import Card from './Card'
import Collapse from './Collapse'

/* Constants */
export default {
  title: getCoreStorybookTitle(Collapse.name),
  args: { content: 'Content' },
  component: Collapse,
}

/* Template */
const Template = (args) => {
  const [open, setOpen] = useState(false)
  const { content } = args
  return (
    <Box>
      <Button onClick={() => setOpen(!open)} variant="contained">
        Expand
      </Button>
      <Collapse in={open}>
        <Card>{content}</Card>
      </Collapse>
    </Box>
  )
}

/* Variants */
export const Basic = Template.bind({})
Basic.args = {}
