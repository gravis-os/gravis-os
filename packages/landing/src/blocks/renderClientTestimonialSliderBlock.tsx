import React from 'react'

import { ClientTestimonial } from '@gravis-os/types'
import { Slider } from '@gravis-os/ui'
import { useMediaQuery, useTheme } from '@mui/material'

import Block, { BlockProps } from '../web/Block/Block'
import renderClientTestimonialSliderBlockItem from './renderClientTestimonialSliderBlockItem'

export interface RenderClientTestimonialSliderBlockProps
  extends Omit<BlockProps, 'items' | 'title'> {
  items: ClientTestimonial[]
  subtitle?: React.ReactNode
  title?: React.ReactNode
}

const renderClientTestimonialSliderBlock = (
  props: RenderClientTestimonialSliderBlockProps
) => {
  const { title = '', items, subtitle = '', ...rest } = props

  const theme = useTheme()
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'), { noSsr: true })

  return {
    id: 'client-testimonials',
    items: [
      { title: 'Client Testimonials', type: 'overline' },
      title && {
        title,
        titleProps: { gutterBottom: true },
        type: 'h3',
      },
      subtitle && {
        title: subtitle,
        titleProps: {
          color: 'text.secondary',
          maxWidth: '50%',
        },
        type: 'body1',
      },
      {
        title: (
          <Slider
            arrows={!isDesktop}
            autoplay={!isDesktop}
            dotProps={{ color: 'secondary.main' }}
            height={{ md: 450 }}
            items={items.map((item) => {
              return (
                <Block
                  items={renderClientTestimonialSliderBlockItem({ item })}
                  sx={{ backgroundColor: 'background.paper', padding: 4 }}
                />
              )
            })}
            loop={!isDesktop}
            options={{ slides: { perView: isDesktop ? 3 : 1, spacing: 12 } }}
            sx={{ mt: { xs: 0, md: 4 } }}
          />
        ),
        type: 'jsx',
      },
    ],
    ...rest,
  }
}

export default renderClientTestimonialSliderBlock
