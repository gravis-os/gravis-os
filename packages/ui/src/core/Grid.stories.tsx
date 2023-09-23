import React from 'react'

import kebabCase from 'lodash/kebabCase'
import map from 'lodash/map'

import { getCoreStorybookTitle } from '../utils/getStorybookTitle'
import Card from './Card'
import Grid from './Grid'

/* Constants */
export default {
  title: getCoreStorybookTitle('Grid'),
  args: {
    xs: 12,
    children: ['Item 1', 'Item 2', 'Item 3', 'Item 4'],
    reverse: false,
  },
  component: Grid,
}

/* Template */
const Template = (args) => {
  const { xs, children, reverse } = args
  return (
    <Grid container reverse={reverse}>
      {map(children, (child) => (
        <Grid item key={kebabCase(child)} xs={xs}>
          <Card>{child}</Card>
        </Grid>
      ))}
    </Grid>
  )
}

/* Variants */
export const Basic = Template.bind({})
Basic.args = {}
