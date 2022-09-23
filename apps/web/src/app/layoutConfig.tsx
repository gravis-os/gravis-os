import React from 'react'
import Image from 'next/image'
import { Stack, Typography, Link, useSettings } from '@gravis-os/ui'
import EmblemSvg from '../../public/emblem.svg'

const logoJsx = (
  <Link href="/" sx={{ display: 'flex' }}>
    <Image src="/emblem_dark.svg" width={40} height={40} />
  </Link>
)

// TODO@Joel: Abstract this
const logoSvg = (
  <Link
    href="/"
    underline="none"
    sx={{
      display: 'flex',
      '& svg': {
        width: 20,
        fill: ({ palette }) => palette.text.primary,
      },
    }}
  >
    <Stack direction="row" alignItems="center" spacing={1.5}>
      <EmblemSvg />
      <Typography variant="overline">Gravis OS</Typography>
    </Stack>
  </Link>
)

const landingLayoutProps = {
  headerProps: {
    color: 'transparent',
    disableBoxShadow: true,
    navItems: {
      left: [
        {
          key: 'logo',
          title: 'Logo',
          children: logoSvg,
          sx: { mr: 1 },
          showOnMobileBar: true,
        },
      ],
      right: [
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
            const { toggleDarkModeIconButtonJsx } = useSettings()
            return toggleDarkModeIconButtonJsx
          },
        },
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
