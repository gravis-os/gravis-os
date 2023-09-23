import React from 'react'

import MenuIcon from '@mui/icons-material/Menu'

import { getCoreStorybookTitle } from '../utils/getStorybookTitle'
import AppBar from './AppBar'
import Button from './Button'
import IconButton from './IconButton'
import Stack from './Stack'
import Typography from './Typography'

const Template = (args) => (
  <AppBar {...args}>
    <Stack alignItems="center" direction="row">
      <IconButton edge="start" size="large" sx={{ mx: 1 }}>
        <MenuIcon />
      </IconButton>
      <Typography sx={{ flexGrow: 1 }}>AppBar</Typography>
      <Button color="secondary" sx={{ mx: 1 }} variant="contained">
        Logout
      </Button>
    </Stack>
  </AppBar>
)

export default {
  title: getCoreStorybookTitle('AppBar'),
  args: {
    disableBorderBottom: false,
    disableBoxShadow: false,
    translucent: false,
    transparent: false,
  },
  component: AppBar,
}

export const Basic = Template.bind({})
Basic.args = {}

export const Transparent = Template.bind({})
Transparent.args = { transparent: true }

export const Translucent = Template.bind({})
Translucent.args = { translucent: true }
