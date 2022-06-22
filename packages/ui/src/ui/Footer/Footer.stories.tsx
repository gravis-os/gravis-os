import React from 'react'
import Footer from './Footer'
import { MOCK_LOGO_JSX } from '../../mocks'

export default {
  component: Footer,
  title: 'Components/Footer',
}

const defaultFooterProps = {
  logo: MOCK_LOGO_JSX,
  companyName: 'Acme Inc.',
  navItems: [
    {
      title: 'What We Do',
      items: [
        { title: 'Product Design', href: '#' },
        { title: 'Pricing', href: '#' },
      ],
    },
    {
      title: 'Learn more',
      items: [
        { title: 'Work', href: '#' },
        { title: 'About', href: '#' },
      ],
    },
    {
      title: 'Support',
      items: [{ title: 'Contact', href: '#' }],
    },
  ],
}

export const Basic = (props) => <Footer {...defaultFooterProps} {...props} />
