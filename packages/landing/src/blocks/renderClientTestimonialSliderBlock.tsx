import { Slider } from '@gravis-os/ui'
import React from 'react'
import { useMediaQuery, useTheme } from '@mui/material'
import { ClientTestimonial } from '@gravis-os/types'
import Block, { BlockProps } from '../web/Block/Block'
import renderClientTestimonialSliderBlockItem from './renderClientTestimonialSliderBlockItem'

export interface RenderClientTestimonialSliderBlockProps
  extends Omit<BlockProps, 'items' | 'title'> {
  items: ClientTestimonial[]
  title?: React.ReactNode
  subtitle?: React.ReactNode
}

const renderClientTestimonialSliderBlock = (
  props: RenderClientTestimonialSliderBlockProps
) => {
  const { title = '', subtitle = '', items, ...rest } = props

  const theme = useTheme()
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'), { noSsr: true })

  return {
    id: 'client-testimonials',
    items: [
      { type: 'overline', title: 'Client Testimonials' },
      title && {
        type: 'h3',
        title,
        titleProps: { gutterBottom: true },
      },
      subtitle && {
        type: 'body1',
        title: subtitle,
        titleProps: {
          color: 'text.secondary',
          maxWidth: '50%',
        },
      },
      {
        type: 'jsx',
        title: (
          <Slider
            autoplay={!isDesktop}
            loop={!isDesktop}
            arrows={!isDesktop}
            sx={{ mt: { xs: 0, md: 4 } }}
            options={{ slides: { perView: isDesktop ? 3 : 1, spacing: 12 } }}
            dotProps={{ color: 'secondary.main' }}
            height={{ md: 450 }}
            items={items.map((item) => {
              return (
                <Block
                  sx={{ padding: 4, backgroundColor: 'background.paper' }}
                  items={renderClientTestimonialSliderBlockItem({ item })}
                />
              )
            })}
          />
        ),
      },
    ],
    ...rest,
  }
}

export default renderClientTestimonialSliderBlock
