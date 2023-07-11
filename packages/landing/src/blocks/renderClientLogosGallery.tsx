import { ClientLogo } from '@gravis-os/types'
import renderClientLogoCardBlockItem from './renderClientLogoCardBlockItem'

export interface renderClientLogosGalleryProps {
  items?: ClientLogo[]
  title: React.ReactNode
}

const renderClientLogosGallery = (props: renderClientLogosGalleryProps) => {
  const { items, title } = props
  return {
    key: 'gallery',
    center: true,
    maxWidth: 'md',
    invertImageOnMode: 'light',
    items: [
      { type: 'h4', title },
      {
        type: 'grid',
        sx: { mt: { xs: 5, md: 10 } },
        maxWidth: 'xl',
        gridProps: { spacing: 1 },
        gridItemProps: { xs: 6, md: 4 },
        gridItems: items.map((clientLogo) => {
          const { avatar_src, avatar_alt, avatar_width, avatar_height } =
            clientLogo
          return renderClientLogoCardBlockItem({
            title: avatar_src,
            titleProps: {
              alt: avatar_alt,
              width: avatar_width,
              height: avatar_height,
            },
          })
        }),
      },
    ],
  }
}
//

export default renderClientLogosGallery
