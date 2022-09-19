import React from 'react'
import Image from 'next/image'
import { Link } from '@gravis-os/ui'

const logoJsx = (
  <Link href="/" sx={{ display: 'flex' }}>
    <Image src="/logo.png" width={40} height={40} />
  </Link>
)

const landingLayoutProps = {
  headerProps: {
    navItems: {
      left: [
        {
          key: 'logo',
          title: 'Logo',
          children: logoJsx,
          sx: { mr: 1 },
          showOnMobileBar: true,
        },
        {
          key: 'docs',
          title: 'Docs',
          href: 'https://docs.gravis-os.com',
        },
        { key: 'pricing', title: 'Pricing', href: '/pricing' },
      ],
    },
  },
  footerProps: {
    logo: logoJsx,
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
        items: [{ title: 'Person', href: '#' }],
      },
    ],
  },
}

export default landingLayoutProps
