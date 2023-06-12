import { ClientLogo } from '@gravis-os/types'
import { BlockProps } from '../web'

export interface RenderClientLogosGridBlockProps
  extends Omit<BlockProps, 'items'> {
  items?: ClientLogo[]
}

const renderClientLogosGridBlock = (props: RenderClientLogosGridBlockProps) => {
  const { items, ...rest } = props
  return {
    py: 2,
    reveal: { variant: 'fade' },
    items: [
      {
        type: 'grid',
        gridItemProps: {
          xs: 6,
          md: 4,
          lg: 2,
          sx: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          },
        },
        gridItems: items.map((item) => {
          const { avatar_src, avatar_alt, avatar_width, avatar_height } = item
          return {
            items: [
              {
                type: 'image',
                title: avatar_src,
                titleProps: {
                  alt: avatar_alt,
                  width: avatar_width,
                  height: avatar_height,
                  invertImageOnMode: 'light',
                },
              },
            ],
          }
        }),
      },
    ],
    ...rest,
  }
}

export default renderClientLogosGridBlock
