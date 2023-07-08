import React from 'react'
import { Box, Slider, Typography } from '@gravis-os/ui'
import renderGhostButtonBlockItem, {
  RenderGhostButtonBlockItemProps,
} from './renderGhostButtonBlockItem'
import BlockItem, { BlockItemProps } from '../web/Block/BlockItem'
import { BlockProps } from '../web/Block/Block'

export interface RenderHeroWithVideoSliderItem {
  title?: React.ReactNode
  subtitle?: React.ReactNode
  buttonProps?: RenderGhostButtonBlockItemProps
}

export interface RenderHeroWithVideoSliderProps extends BlockProps {
  video_src?: BlockItemProps['backgroundVideoProps']['poster']
  video_poster_src?: BlockItemProps['backgroundVideoProps']['poster']
  items?: RenderHeroWithVideoSliderItem[]
}

const renderHeroWithVideoSlider = (props: RenderHeroWithVideoSliderProps) => {
  const { video_src, video_poster_src, items } = props
  return {
    key: 'hero-with-video-slider',
    dark: true,
    py: 0,
    backgroundVideoProps: {
      src: video_src,
      poster: video_poster_src,
    },
    backgroundOverlayOpacity: 0.5,
    items: [
      {
        type: 'jsx',
        title: (
          <Slider
            autoplay
            progress
            disableCenter
            middle
            loop
            height={{ xs: 600, sm: 700, md: 800, xxl: 820 }}
            tabs={items.map(({ title }) => title)}
            tabsProps={{ fullWidthOnDesktop: true }}
            tabProps={{ sx: { p: 3 } }}
            items={items.map((item, i) => {
              const { title, subtitle, buttonProps } = item
              return (
                <Box key={`slide-item-${i}`} sx={{ maxWidth: { md: '50%' } }}>
                  <Typography
                    variant="overline"
                    gutterBottom
                    color="text.secondary"
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
          />
        ),
      },
    ],
  }
}

export default renderHeroWithVideoSlider
