import React from 'react'

import { ClientLogo } from '@gravis-os/types'
import { ImageMarquee } from '@gravis-os/ui'

import { BlockProps } from '../web/Block/Block'

export interface RenderClientLogosImageMarqueeBlockProps
  extends Omit<BlockProps, 'items'> {
  /**
   * Scale the image size based on a number between 0 - 1
   */
  imageSizeMultiplier?: number
  items?: ClientLogo[]
  opacity?: number
}

const renderClientLogosImageMarqueeBlock = (
  props: RenderClientLogosImageMarqueeBlockProps
) => {
  const { imageSizeMultiplier = 0.8, items, opacity = 0.3, ...rest } = props

  return {
    disableContainer: true,
    items: [
      {
        title: (
          <ImageMarquee
            gradient
            imageProps={{ priority: true }}
            items={items?.map((item) => ({
              id: item.avatar_src,
              alt: item.avatar_alt,
              height: item.avatar_height * imageSizeMultiplier,
              invertImageOnMode: 'light',
              src: item.avatar_src,
              sx: { opacity, ...item?.sx },
              width: item.avatar_width * imageSizeMultiplier,
            }))}
            py={2}
            spacing={{ xs: 10, md: 15, lg: 20 }}
            speed={15}
          />
        ),
        type: 'jsx',
      },
    ],
    py: 0,
    reveal: false,
    ...rest,
  }
}

export default renderClientLogosImageMarqueeBlock
