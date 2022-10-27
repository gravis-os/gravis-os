import { kebabCase, map } from 'lodash'
import React from 'react'
import { getCoreStorybookTitle } from '../utils/getStorybookTitle'
import Card from './Card'
import Grid from './Grid'

/* Constants */
export default {
  title: getCoreStorybookTitle('Grid'),
  component: Grid,
  args: {
    reverse: false,
    children: ['Item 1', 'Item 2', 'Item 3', 'Item 4'],
    xs: 12,
  },
}

/* Template */
const Template = (args) => {
  const { children, reverse, xs } = args
  return (
    <Grid container reverse={reverse}>
      {map(children, (child) => (
        <Grid item xs={xs} key={kebabCase(child)}>
          <Card>{child}</Card>
        </Grid>
      ))}
    </Grid>
  )
}

/* Variants */
export const Basic = Template.bind({})
Basic.args = {}
