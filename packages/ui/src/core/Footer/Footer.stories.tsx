import React from 'react'
import { MOCK_FOOTER_PROPS } from '@gravis-os/landing/src/mocks'
import getStorybookTitle from '@gravis-os/landing/src/utils/getStorybookTitle'
import Footer from './Footer'

export default {
  component: Footer,
  title: getStorybookTitle(Footer.name),
  parameters: { layout: 'fullscreen' },
}

export const Basic = (props) => <Footer {...MOCK_FOOTER_PROPS} {...props} />
