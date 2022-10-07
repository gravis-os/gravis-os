import React from 'react'
import Footer from './Footer'
import { MOCK_FOOTER_PROPS } from '../../mocks'

export default {
  component: Footer,
  parameters: { layout: 'fullscreen' },
}

export const Basic = (props) => <Footer {...MOCK_FOOTER_PROPS} {...props} />
