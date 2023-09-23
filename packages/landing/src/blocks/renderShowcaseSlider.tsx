import React from 'react'

import { Showcase } from '@gravis-os/types'
import { Box, Slider } from '@gravis-os/ui'

import Block, { BlockProps } from '../web/Block/Block'
import renderShowcaseCardBlockItem from './renderShowcaseCardBlockItem'

export interface RenderShowcaseSliderProps
  extends Omit<BlockProps, 'items' | 'title'> {
  items: Showcase[]
  overline?: React.ReactNode
  subtitle?: React.ReactNode
  title?: React.ReactNode
}

const renderShowcaseSlider = (props: RenderShowcaseSliderProps) => {
  const { title, items, overline, subtitle, ...rest } = props

  return {
    id: 'showcase-slider',
    items: [
      overline && {
        title: overline,
        type: 'overline',
      },
      title && {
        title,
        titleProps: { gutterBottom: true, maxWidth: '60%' },
        type: 'h3',
      },
      subtitle && {
        title: subtitle,
        titleProps: {
          color: 'text.secondary',
          maxWidth: '45%',
        },
        type: 'body1',
      },
      {
        title: (
          <Slider
            arrows
            autoplay
            dotProps={{ color: 'secondary.main' }}
            height={{ md: 600 }}
            items={items.map((item) => {
              return (
                <Box key={item.id} sx={{ width: '100%' }}>
                  <Block
                    items={[
                      renderShowcaseCardBlockItem({
                        disableContainer: true,
                        item,
                        sx: { mt: 0 },
                      }),
                    ]}
                  />
                </Box>
              )
            })}
            loop
            options={{ slides: { perView: 1, spacing: 12 } }}
            sx={{ mt: { xs: 0, md: 4 } }}
          />
        ),
        type: 'jsx',
      },
    ],
    maxWidth: 'xl',
    ...rest,
  }
}

export default renderShowcaseSlider
