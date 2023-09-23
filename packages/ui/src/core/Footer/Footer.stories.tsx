import React from 'react'

import { getStorybookTitle } from '@gravis-os/landing'

import { MOCK_FOOTER_PROPS } from '../../mocks'
import Footer from './Footer'

export default {
  title: getStorybookTitle(Footer.name),
  component: Footer,
  parameters: { layout: 'fullscreen' },
}

export const Basic = (props) => <Footer {...MOCK_FOOTER_PROPS} {...props} />
