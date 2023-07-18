import React from 'react'
import Image from 'next/image'
import { Link, Logo } from '@gravis-os/ui'
import { useUserPreferences } from '@gravis-os/theme'
import EmblemSvg from '../../public/emblem.svg'

const headerLogoJsx = (
  <Logo width={20} emblem={<EmblemSvg />} title="Gravis OS" />
)

const footerLogoJsx = (
  <Link href="/" sx={{ display: 'flex' }}>
    <Image src="/emblem_dark.svg" width={40} height={40} />
  </Link>
)

const landingLayoutProps = {
  headerProps: {
    translucent: true,
    disableBoxShadow: true,
    navItems: {
      left: [
        {
          key: 'logo',
          title: 'Logo',
          children: headerLogoJsx,
          sx: { mr: 1 },
          showOnMobileBar: true,
        },
      ],
      right: [
        {
          key: 'blog',
          title: 'Blog',
          href: 'https://docs.gravis-os.com/blog',
          linkProps: { target: '_blank' },
          disableNewTabIcon: true,
        },
        {
          key: 'docs',
          title: 'Docs',
          href: 'https://docs.gravis-os.com',
          linkProps: { target: '_blank' },
        },
        {
          key: 'dark-mode',
          title: 'Dark Mode',
          showOnMobileBar: true,
          render: () => {
            const { toggleDarkModeIconButtonJsx } = useUserPreferences()
            return toggleDarkModeIconButtonJsx
          },
        },
      ],
    },
  },
  footerProps: {
    logo: footerLogoJsx,
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
