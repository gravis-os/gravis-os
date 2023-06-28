import { Slider } from '@gravis-os/ui'
import React from 'react'
import { Showcase } from '@gravis-os/types'
import Block, { BlockProps } from '../web/Block/Block'
import renderShowcaseCardBlockItem from './renderShowcaseCardBlockItem'

export interface RenderShowcaseSliderProps
  extends Omit<BlockProps, 'items' | 'title'> {
  items: Showcase[]
  title?: React.ReactNode
  subtitle?: React.ReactNode
  overline?: React.ReactNode
}

const renderShowcaseSlider = (props: RenderShowcaseSliderProps) => {
  const { overline, title, subtitle, items, ...rest } = props

  return {
    key: 'showcase-slider',
    maxWidth: 'xl',
    items: [
      overline && {
        type: 'overline',
        title: overline,
      },
      title && {
        type: 'h3',
        title,
        titleProps: { gutterBottom: true, maxWidth: '60%' },
      },
      subtitle && {
        type: 'body1',
        title: subtitle,
        titleProps: {
          color: 'text.secondary',
          maxWidth: '45%',
        },
      },
      {
        type: 'jsx',
        title: (
          <Slider
            autoplay
            loop
            arrows
            sx={{ mt: { xs: 0, md: 4 } }}
            options={{ slides: { perView: 1, spacing: 24 } }}
            dotProps={{ color: 'secondary.main' }}
            height={{ md: 500 }}
            items={items.map((item) => {
              return <Block items={[renderShowcaseCardBlockItem({ item })]} />
            })}
          />
        ),
      },
    ],
    ...rest,
  }
}

export default renderShowcaseSlider
