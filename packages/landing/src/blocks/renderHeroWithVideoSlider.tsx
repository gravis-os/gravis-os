import React from 'react'
import { Box, Slider, Typography } from '@gravis-os/ui'
import renderGhostButtonBlockItem, {
  RenderGhostButtonBlockItemProps,
} from './renderGhostButtonBlockItem'
import Block, { BlockProps } from '../web/Block/Block'

export interface RenderHeroWithVideoSliderProps extends BlockProps {
  video_src?: string
  video_poster_src?: string
  headings?: string[]
  subheadings?: string[]
  buttonProps?: RenderGhostButtonBlockItemProps[]
}

const renderHeroWithVideoSlider = (props: RenderHeroWithVideoSliderProps) => {
  const { video_src, video_poster_src, headings, subheadings, buttonProps } =
    props
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
            tabs={headings}
            tabsProps={{ fullWidthOnDesktop: true }}
            tabProps={{ sx: { p: 3 } }}
            items={[
              ...headings.map((heading, i) => {
                return (
                  <Box sx={{ maxWidth: { md: '50%' } }}>
                    <Typography
                      variant="overline"
                      gutterBottom
                      color="text.secondary"
                    >
                      {heading}
                    </Typography>
                    <Typography variant="h2">{subheadings[i]}</Typography>
                    <Block
                      disableContainer
                      items={[
                        renderGhostButtonBlockItem({
                          ...buttonProps[i],
                          size: 'lg',
                          sx: { mt: { xs: 2, md: 4 } },
                        }),
                      ]}
                    />
                  </Box>
                )
              }),
            ]}
          />
        ),
      },
    ],
  }
}

export default renderHeroWithVideoSlider
