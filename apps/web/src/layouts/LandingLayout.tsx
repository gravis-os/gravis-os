import * as React from 'react'
import merge from 'lodash/merge'
import {
  Blocks,
  BlocksProps,
  LandingLayout as GvsLandingLayout,
  LandingLayoutProps as GvsLandingLayoutProps,
} from '@gravis-os/landing'
import { NextSeo } from 'next-seo'
import type { NextSeoProps } from 'next-seo'
import layoutConfig from '../app/layoutConfig'
import appConfig from '../app/appConfig'

export interface LandingLayoutProps extends GvsLandingLayoutProps {
  blocks?: BlocksProps['items']
  seo?: NextSeoProps
}

const LandingLayout: React.FC<LandingLayoutProps> = (props) => {
  const { seo, blocks, children, ...rest } = props
  return (
    <GvsLandingLayout {...merge({}, layoutConfig, rest)}>
      {seo && <NextSeo titleTemplate={`%s | ${appConfig.title}`} {...seo} />}
      {blocks && <Blocks items={blocks} />}
      {children}
    </GvsLandingLayout>
  )
}

export default LandingLayout
