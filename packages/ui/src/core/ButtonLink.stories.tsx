import React from 'react'

import { getCoreStorybookTitle } from '../utils/getStorybookTitle'
import ButtonLink from './ButtonLink'

/* Constants */
export default {
  title: getCoreStorybookTitle(ButtonLink.name),
  args: {
    children: 'Label',
    href: '/',
    openInNewTab: false,
    showLinkIcon: false,
  },
  component: ButtonLink,
}

/* Template */
const Template = (args) => <ButtonLink {...args} />

/* Variants */
export const Basic = Template.bind({})
Basic.args = {}

export const OpenInNewTab = Template.bind({})
OpenInNewTab.args = { openInNewTab: true }

export const ShowLinkIcon = Template.bind({})
ShowLinkIcon.args = { showLinkIcon: true }
