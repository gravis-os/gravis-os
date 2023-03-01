import React from 'react'
import { getStorybookTitle } from '@gravis-os/landing'
import Footer from './Footer'
import { MOCK_FOOTER_PROPS } from '../../mocks'

export default {
  component: Footer,
  title: getStorybookTitle(Footer.name),
  parameters: { layout: 'fullscreen' },
}

export const Basic = (props) => <Footer {...MOCK_FOOTER_PROPS} {...props} />
