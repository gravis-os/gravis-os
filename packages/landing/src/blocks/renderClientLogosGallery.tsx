import { ClientLogo } from '@gravis-os/types'
import renderClientLogoCardBlockItem from './renderClientLogoCardBlockItem'
import { BlockProps } from '../web/Block/Block'

export interface RenderClientLogosGalleryProps
  extends Omit<BlockProps, 'title' | 'items'> {
  title?: React.ReactNode
  items?: ClientLogo[]
}

const renderClientLogosGallery = (props: RenderClientLogosGalleryProps) => {
  const { items, title, ...rest } = props

  return {
    id: 'gallery',
    center: true,
    maxWidth: 'md',
    ...rest,
    items: [
      title && {
        type: 'h4',
        title,
        titleProps: { sx: { mb: { xs: 5, md: 10 }, mx: 4 } },
      },
      {
        type: 'grid',
        maxWidth: 'xl',
        gridProps: { spacing: 1 },
        gridItemProps: { xs: 6, md: 4 },
        gridItems: items.map((clientLogo) => {
          const { avatar_src, avatar_alt, avatar_width, avatar_height, sx } =
            clientLogo
          return renderClientLogoCardBlockItem({
            title: avatar_src,
            titleProps: {
              alt: avatar_alt,
              width: avatar_width,
              height: avatar_height,
              sx,
              invertImageOnMode: 'light',
            },
          })
        }),
      },
    ],
  }
}

export default renderClientLogosGallery
