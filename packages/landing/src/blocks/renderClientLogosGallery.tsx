import { ClientLogo } from '@gravis-os/types'

import { BlockProps } from '../web/Block/Block'
import renderClientLogoCardBlockItem from './renderClientLogoCardBlockItem'

export interface RenderClientLogosGalleryProps
  extends Omit<BlockProps, 'items' | 'title'> {
  items?: ClientLogo[]
  title?: React.ReactNode
}

const renderClientLogosGallery = (props: RenderClientLogosGalleryProps) => {
  const { title, items, ...rest } = props

  return {
    id: 'gallery',
    center: true,
    maxWidth: 'md',
    ...rest,
    items: [
      title && {
        title,
        titleProps: { sx: { mb: { xs: 5, md: 10 }, mx: 4 } },
        type: 'h4',
      },
      {
        gridItemProps: { xs: 6, md: 4 },
        gridItems: items.map((clientLogo) => {
          const { avatar_alt, avatar_height, avatar_src, avatar_width, sx } =
            clientLogo
          return renderClientLogoCardBlockItem({
            title: avatar_src,
            titleProps: {
              alt: avatar_alt,
              height: avatar_height,
              invertImageOnMode: 'light',
              sx,
              width: avatar_width,
            },
          })
        }),
        gridProps: { spacing: 1 },
        maxWidth: 'xl',
        type: 'grid',
      },
    ],
  }
}

export default renderClientLogosGallery
