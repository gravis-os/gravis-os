import type { NextPage } from 'next'
import { NextSeo } from 'next-seo'
import * as React from 'react'
import { ButtonProps, StackProps } from '@gravis-os/ui'
import LandingLayout from '@web/layouts/LandingLayout'
import { BlockItemTypeEnum, BlocksProps } from '@gravis-os/web'

const blocksProps = {
  items: [
    {
      key: 'hero',
      maxWidth: 'md' as const,
      center: true,
      sx: { backgroundColor: 'background.paper' },
      items: [
        {
          type: BlockItemTypeEnum.OVERLINE,
          title: 'Gravis - operating system for modern enterprises',
          titleProps: { color: 'text.primary' },
        },
        {
          type: BlockItemTypeEnum.H1,
          title: `Gravis OS`,
          titleProps: { gutterBottom: true },
        },
        {
          type: BlockItemTypeEnum.SUBTITLE1,
          title:
            'Power next-generation business operations with all the modules you need in one place.',
          titleProps: {
            color: 'text.secondary',
            maxWidth: '60%',
          },
        },
        {
          type: BlockItemTypeEnum.STACK,
          sx: { mt: 3 },
          stackProps: {
            center: true,
            direction: 'row' as StackProps['direction'],
            reverseDirectionOnMobile: true,
          },
          stackItems: [
            {
              items: [
                {
                  type: BlockItemTypeEnum.BUTTON,
                  title: 'Request Support',
                  titleProps: {
                    variant: 'outlined',
                    size: 'large',
                    fullWidthOnMobile: true,
                  } as ButtonProps,
                },
              ],
            },
            {
              items: [
                {
                  type: BlockItemTypeEnum.BUTTON,
                  title: 'Get Started',
                  titleProps: {
                    variant: 'contained',
                    size: 'large',
                    fullWidthOnMobile: true,
                  } as ButtonProps,
                },
              ],
            },
          ],
        },
      ],
    },
  ],
} as BlocksProps

const Home: NextPage = () => (
  <LandingLayout blocksProps={blocksProps}>
    <NextSeo
      title="Simple Home Example"
      description="A short description goes here."
    />
  </LandingLayout>
)

export default Home
