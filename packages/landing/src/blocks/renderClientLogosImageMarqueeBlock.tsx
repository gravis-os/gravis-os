import React from 'react'
import { ImageMarquee } from '@gravis-os/ui'
import { ClientLogo } from '@gravis-os/types'
import { BlockProps } from 'src/web'

export interface RenderClientLogosImageMarqueeBlockProps
  extends Omit<BlockProps, 'items'> {
  items?: ClientLogo[]
  /**
   * Scale the image size based on a number between 0 - 1
   */
  imageSizeMultiplier?: number
  opacity?: number
}

const renderClientLogosImageMarqueeBlock = (
  props: RenderClientLogosImageMarqueeBlockProps
) => {
  const { items, opacity = 0.3, imageSizeMultiplier = 0.8, ...rest } = props

  return {
    py: 0,
    disableContainer: true,
    reveal: false,
    items: [
      {
        type: 'jsx',
        title: (
          <ImageMarquee
            gradient
            py={2}
            // Spacing and speed
            spacing={{ xs: 10, md: 15, lg: 20 }}
            speed={15}
            items={items?.map((item) => ({
              key: item.avatar_src,
              src: item.avatar_src,
              alt: item.avatar_alt,
              width: item.avatar_width * imageSizeMultiplier,
              height: item.avatar_height * imageSizeMultiplier,
              invertImageOnMode: 'light',
              sx: { opacity },
            }))}
          />
        ),
      },
    ],
    ...rest,
  }
}

export default renderClientLogosImageMarqueeBlock
