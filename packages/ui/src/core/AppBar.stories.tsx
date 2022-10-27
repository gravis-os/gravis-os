import MenuIcon from '@mui/icons-material/Menu'
import React from 'react'
import { getCoreStorybookTitle } from '../utils/getStorybookTitle'
import AppBar from './AppBar'
import Button from './Button'
import IconButton from './IconButton'
import Stack from './Stack'
import Typography from './Typography'

const Template = (args) => (
  <AppBar {...args}>
    <Stack direction="row" alignItems="center">
      <IconButton size="large" edge="start" sx={{ mx: 1 }}>
        <MenuIcon />
      </IconButton>
      <Typography sx={{ flexGrow: 1 }}>AppBar</Typography>
      <Button variant="contained" sx={{ mx: 1 }} color="secondary">
        Logout
      </Button>
    </Stack>
  </AppBar>
)

export default {
  title: getCoreStorybookTitle('AppBar'),
  component: AppBar,
  args: {
    disableBoxShadow: false,
    disableBorderBottom: false,
    transparent: false,
    translucent: false,
  },
}

export const Basic = Template.bind({})
Basic.args = {}

export const Transparent = Template.bind({})
Transparent.args = { transparent: true }

export const Translucent = Template.bind({})
Translucent.args = { translucent: true }
