import { ClientLogo } from '@gravis-os/types'

import { BlockProps } from '../web/Block/Block'

export interface RenderClientLogosGridBlockProps
  extends Omit<BlockProps, 'items'> {
  items?: ClientLogo[]
}

const renderClientLogosGridBlock = (props: RenderClientLogosGridBlockProps) => {
  const { items, ...rest } = props
  return {
    items: [
      {
        gridItemProps: {
          xs: 6,
          md: 4,
          lg: 2,
          sx: {
            alignItems: 'center',
            display: 'flex',
            justifyContent: 'center',
          },
        },
        gridItems: items.map((item) => {
          const { avatar_alt, avatar_height, avatar_src, avatar_width } = item
          return {
            items: [
              {
                title: avatar_src,
                titleProps: {
                  alt: avatar_alt,
                  height: avatar_height,
                  invertImageOnMode: 'light',
                  width: avatar_width,
                },
                type: 'image',
              },
            ],
          }
        }),
        type: 'grid',
      },
    ],
    py: 2,
    reveal: { variant: 'fade' },
    ...rest,
  }
}

export default renderClientLogosGridBlock
