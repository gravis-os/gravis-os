import * as React from 'react'
import merge from 'lodash/merge'
import {
  Blocks,
  BlocksProps,
  LandingLayout as GvsLandingLayout,
  LandingLayoutProps as GvsLandingLayoutProps,
} from '@gravis-os/web'

const logoJsx = <div>Logo</div>

const landingLayoutProps = {
  headerProps: {
    navItems: {
      left: [
        {
          key: 'logo',
          title: 'Logo',
          children: logoJsx,
          onClick: () => window.alert('You clicked on Foo'),
          sx: { mr: 1 },
          showOnMobileBar: true,
        },
        {
          key: 'foo',
          title: 'Foo',
          onClick: () => window.alert('You clicked on Foo'),
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

export interface LandingLayoutProps extends GvsLandingLayoutProps {
  blocksProps?: BlocksProps
}

const LandingLayout: React.FC<LandingLayoutProps> = (props) => {
  const { blocksProps, children, ...rest } = props
  return (
    <GvsLandingLayout {...merge({}, landingLayoutProps, rest)}>
      {blocksProps && <Blocks {...blocksProps} />}
      {children}
    </GvsLandingLayout>
  )
}

export default LandingLayout
