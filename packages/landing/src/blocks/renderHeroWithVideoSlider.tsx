import React from 'react'

import { Box, Slider, Typography } from '@gravis-os/ui'

import { BlockProps } from '../web/Block/Block'
import BlockItem, { BlockItemProps } from '../web/Block/BlockItem'
import renderGhostButtonBlockItem, {
  RenderGhostButtonBlockItemProps,
} from './renderGhostButtonBlockItem'

export interface RenderHeroWithVideoSliderItem {
  buttonProps?: RenderGhostButtonBlockItemProps
  subtitle?: React.ReactNode
  title?: React.ReactNode
}

export interface RenderHeroWithVideoSliderProps extends BlockProps {
  items?: RenderHeroWithVideoSliderItem[]
  video_poster_src?: BlockItemProps['backgroundVideoProps']['poster']
  video_src?: BlockItemProps['backgroundVideoProps']['poster']
}

const renderHeroWithVideoSlider = (props: RenderHeroWithVideoSliderProps) => {
  const { items, video_poster_src, video_src } = props
  return {
    id: 'hero-with-video-slider',
    backgroundOverlayOpacity: 0.5,
    backgroundVideoProps: {
      poster: video_poster_src,
      src: video_src,
    },
    dark: true,
    items: [
      {
        title: (
          <Slider
            autoplay
            disableCenter
            height={{ xs: 600, sm: 700, md: 800, xxl: 820 }}
            items={items.map((item, i) => {
              const { title, buttonProps, subtitle } = item
              return (
                <Box key={`slide-item-${i}`} sx={{ maxWidth: { md: '50%' } }}>
                  <Typography
                    color="text.secondary"
                    gutterBottom
                    variant="overline"
                  >
                    {title}
                  </Typography>
                  <Typography variant="h2">{subtitle}</Typography>
                  <BlockItem
                    disableContainer
                    {...renderGhostButtonBlockItem({
                      ...buttonProps,
                      size: 'lg',
                      sx: { mt: { xs: 2, md: 4 } },
                    })}
                  />
                </Box>
              )
            })}
            loop
            middle
            progress
            tabProps={{ sx: { p: 3 } }}
            tabs={items.map(({ title }) => title)}
            tabsProps={{ fullWidthOnDesktop: true }}
          />
        ),
        type: 'jsx',
      },
    ],
    py: 0,
  }
}

export default renderHeroWithVideoSlider
