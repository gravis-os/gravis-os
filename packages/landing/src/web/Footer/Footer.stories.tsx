import React from 'react'
import { MOCK_FOOTER_PROPS } from '../../mocks'
import getStorybookTitle from '../../utils/getStorybookTitle'
import Footer from './Footer'

export default {
  component: Footer,
  title: getStorybookTitle(Footer.displayName),
  parameters: { layout: 'fullscreen' },
}

export const Basic = (props) => <Footer {...MOCK_FOOTER_PROPS} {...props} />
