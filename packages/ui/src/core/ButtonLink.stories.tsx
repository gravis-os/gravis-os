import React from 'react'
import { getCoreStorybookTitle } from '../utils/getStorybookTitle'
import ButtonLink from './ButtonLink'

/* Constants */
export default {
  title: getCoreStorybookTitle(ButtonLink.name),
  component: ButtonLink,
  args: {
    href: '/',
    children: 'Label',
    openInNewTab: false,
    showLinkIcon: false,
  },
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
