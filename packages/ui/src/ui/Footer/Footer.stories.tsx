import React from 'react'
import Footer from './Footer'

const Logo = () => <div>Logo</div>

export default {
  component: Footer,
  title: 'Components/Footer',
}

const defaultFooterProps = {
  logo: Logo,
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

export const Primary = (props) => <Footer {...defaultFooterProps} {...props} />
