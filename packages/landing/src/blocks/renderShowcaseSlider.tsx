import { Box, Slider } from '@gravis-os/ui'
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
    id: 'showcase-slider',
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
            options={{ slides: { perView: 1, spacing: 12 } }}
            dotProps={{ color: 'secondary.main' }}
            height={{ md: 600 }}
            items={items.map((item) => {
              return (
                <Box key={item.id} sx={{ width: '100%' }}>
                  <Block
                    items={[
                      renderShowcaseCardBlockItem({
                        item,
                        disableContainer: true,
                        sx: { mt: 0 },
                      }),
                    ]}
                  />
                </Box>
              )
            })}
          />
        ),
      },
    ],
    ...rest,
  }
}

export default renderShowcaseSlider
